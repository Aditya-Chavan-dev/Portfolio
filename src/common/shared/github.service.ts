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

/**
 * Returns the latest GitHub data from Firestore cache.
 * The cache is refreshed every 6 hours by the GitHub Actions workflow.
 * Falls back to an empty state if the cache hasn't been seeded yet.
 */
export async function getGitHubData(): Promise<any> {
  // Synchronized GitHub data has been disabled/removed.
  return {
    repos:    [],
    activity: null,
    cachedAt: 0,
  }
}
