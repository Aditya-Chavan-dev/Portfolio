/**
 * GitHub Data Service — CLIENT SIDE (Read-Only)
 *
 * This service does NOT call the GitHub API directly.
 * All GitHub data is pre-fetched server-side via GitHub Actions (scripts/github-sync.ts)
 * and written to Firestore at `cache/github` every 6 hours.
 *
 * This ensures the GitHub Personal Access Token is NEVER exposed in the browser.
 */



// ─── Public API ───────────────────────────────────────────────────────────────

import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'

/**
 * Returns the latest GitHub data from Firestore cache.
 * The cache is refreshed every 6 hours by the GitHub Actions workflow.
 * Falls back to an empty state if the cache hasn't been seeded yet.
 */
export async function getGitHubData(): Promise<any> {
  try {
    const docRef = doc(db, 'cache', 'github')
    const snapshot = await getDoc(docRef)
    
    if (snapshot.exists()) {
      return snapshot.data()
    }

    return {
      repos: [],
      activity: null,
      lastUpdated: null,
    }
  } catch (err) {
    console.error('Failed to get cached GitHub data:', err)
    return {
      repos: [],
      activity: null,
      lastUpdated: null,
    }
  }
}
