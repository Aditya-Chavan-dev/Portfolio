/**
 * GitHub Data Service — CLIENT SIDE (Read-Only)
 *
 * This service does NOT call the GitHub API directly.
 * All GitHub data is pre-fetched server-side via GitHub Actions (scripts/github-sync.ts)
 * and written to Firestore at `cache/github` every 6 hours.
 *
 * This ensures the GitHub Personal Access Token is NEVER exposed in the browser.
 */

import { getGitHubCache } from '@/common/shared/firestore.service'
import type { GitHubCache } from '@/common/types/github.types'

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns the latest GitHub data from Firestore cache.
 * The cache is refreshed every 6 hours by the GitHub Actions workflow.
 * Falls back to an empty state if the cache hasn't been seeded yet.
 */
export async function getGitHubData(): Promise<GitHubCache> {
  const cached = await getGitHubCache()

  if (cached) {
    return cached
  }

  // Cache miss — return safe empty state (first-run before Action has seeded data)
  console.warn('[github] Cache empty. Run the GitHub sync Action to seed data.')
  return {
    repos:    [],
    activity: null,
    cachedAt: 0,
  }
}
