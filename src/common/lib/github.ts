/**
 * GitHub configuration — client-side constants only.
 * The GitHub PAT has been removed from the frontend.
 * All authenticated GitHub API calls now run server-side
 * via scripts/github-sync.ts (triggered by GitHub Actions every 6 hours).
 */

export const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME as string
export const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com'

/**
 * Fetch a project's portfolio.json metadata from raw GitHub content.
 * This endpoint is public and does NOT require authentication.
 */
export async function fetchProjectMeta(repoName: string): Promise<Record<string, unknown> | null> {
  try {
    const res = await fetch(
      `${GITHUB_RAW_BASE}/${GITHUB_USERNAME}/${repoName}/main/portfolio.json`
    )
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}
