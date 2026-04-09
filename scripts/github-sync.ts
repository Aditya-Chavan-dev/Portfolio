/**
 * GitHub → Firestore Sync Script
 * Fetches GitHub stats (repos + contribution graph) using a secure server-side token
 * and writes the result to Firestore cache/github document.
 *
 * Run by: GitHub Actions every 6 hours (never in the browser)
 */

import admin from 'firebase-admin'

// ─── Init Firebase Admin ──────────────────────────────────────────────────────

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT!)

if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

const db = admin.firestore()

// ─── Config ───────────────────────────────────────────────────────────────────

const GITHUB_USERNAME = 'Aditya-Chavan-dev'
const GITHUB_TOKEN    = process.env.SYNC_GITHUB_TOKEN!
const GITHUB_API_BASE = 'https://api.github.com'

const headers = {
  Authorization:  `Bearer ${GITHUB_TOKEN}`,
  'Content-Type': 'application/json',
  Accept:         'application/vnd.github+json',
}

// ─── Fetch repos ──────────────────────────────────────────────────────────────

async function fetchRepos() {
  const url = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`
  const res  = await fetch(url, { headers })
  if (!res.ok) throw new Error(`GitHub repos fetch failed — status ${res.status}`)
  const all = (await res.json()) as any[]
  return all.filter((r: any) => !r.fork && !r.private).map((r: any) => ({
    id:               r.id,
    name:             r.name,
    full_name:        r.full_name,
    description:      r.description ?? null,
    html_url:         r.html_url,
    homepage:         r.homepage ?? null,
    language:         r.language ?? null,
    stargazers_count: r.stargazers_count,
    forks_count:      r.forks_count,
    topics:           r.topics ?? [],
    updated_at:       r.updated_at,
    fork:             r.fork,
    private:          r.private,
  }))
}

// ─── Fetch contribution activity ──────────────────────────────────────────────

async function fetchActivity() {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
              }
            }
          }
        }
      }
    }
  `

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
    })

    if (!res.ok) return null
    const { data } = await res.json()
    const calendar = data?.user?.contributionsCollection?.contributionCalendar
    if (!calendar) return null

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks,
    }
  } catch (err) {
    console.error('[sync] fetchActivity failed:', err)
    return null
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  console.log('[sync] Starting GitHub → Firestore sync...')

  const [repos, activity] = await Promise.all([fetchRepos(), fetchActivity()])

  const payload = {
    repos,
    activity,
    cachedAt: Date.now(),
    syncedBy: 'github-actions',
  }

  await db.collection('cache').doc('github').set(payload)

  console.log(`[sync] ✅ Done — ${repos.length} repos written to Firestore.`)
  process.exit(0)
}

run().catch((err) => {
  console.error('[sync] ❌ Fatal error:', err)
  process.exit(1)
})
