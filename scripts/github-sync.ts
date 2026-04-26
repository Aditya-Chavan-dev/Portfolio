import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

/**
 * GitHub Sync Script
 * 
 * Runs in GitHub Actions to fetch data and cache it in Firestore.
 * Requires:
 * - GITHUB_TOKEN
 * - GITHUB_USERNAME
 * - FIREBASE_SERVICE_ACCOUNT (JSON string)
 */

async function syncGithub() {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;
  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!username || !token || !serviceAccountJson) {
    console.error('Missing required environment variables: GITHUB_USERNAME, GITHUB_TOKEN, FIREBASE_SERVICE_ACCOUNT');
    process.exit(1);
  }

  // Initialize Firebase Admin
  const serviceAccount = JSON.parse(serviceAccountJson);
  if (getApps().length === 0) {
    initializeApp({
      credential: cert(serviceAccount)
    });
  }

  const db = getFirestore();

  console.log(`📡 Starting GitHub sync for ${username}...`);

  try {
    // 1. Fetch Repositories
    const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (!reposRes.ok) throw new Error(`GitHub API Error (Repos): ${reposRes.statusText}`);
    const repos = await reposRes.json();

    // 2. Fetch Recent Activity (Events)
    const eventsRes = await fetch(`https://api.github.com/users/${username}/events/public?per_page=10`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/vnd.github.v3+json'
      }
    });

    if (!eventsRes.ok) throw new Error(`GitHub API Error (Events): ${eventsRes.statusText}`);
    const events = await eventsRes.json();

    // 3. Process Data
    const githubData = {
      repos: repos.map((r: any) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        url: r.html_url,
        stars: r.stargazers_count,
        forks: r.forks_count,
        language: r.language,
        updatedAt: r.updated_at,
        topics: r.topics || []
      })),
      activity: events.map((e: any) => ({
        id: e.id,
        type: e.type,
        repo: e.repo.name,
        createdAt: e.created_at,
        payload: {
          action: e.payload.action,
          ref: e.payload.ref,
          commits: e.payload.commits?.length || 0
        }
      })),
      lastUpdated: new Date().toISOString()
    };

    // 4. Write to Firestore Cache
    await db.collection('cache').doc('github').set(githubData);

    console.log('✅ GitHub data successfully synchronized to Firestore cache.');
  } catch (err) {
    console.error('❌ Sync failed:', err);
    process.exit(1);
  }
}

syncGithub();
