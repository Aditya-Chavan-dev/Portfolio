import { GITHUB_USERNAME, GITHUB_API_BASE, GITHUB_CACHE_TTL_HOURS, GITHUB_TOKEN } from '@/shared/github'
import { getGitHubCache, setGitHubCache } from '@/shared/firestore.service'
import type { GitHubRepo, GitHubActivity, GitHubCache } from '@/shared/github.types'

// ─── Cache freshness check ────────────────────────────────────────────────

function isCacheFresh(cachedAt: number): boolean {
  const ttlMs = GITHUB_CACHE_TTL_HOURS * 60 * 60 * 1000
  return Date.now() - cachedAt < ttlMs
}

// ─── GitHub API fetchers ──────────────────────────────────────────────────

async function fetchRepos(): Promise<GitHubRepo[]> {
  const url = `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100&type=owner`
  const res = await fetch(url)
  if (!res.ok) throw new Error(`GitHub repos fetch failed — status ${res.status}`)
  const all = (await res.json()) as GitHubRepo[]
  return all.filter((r) => !r.fork && !r.private)
}

/**
 * Full contribution graph requires GitHub GraphQL API + a personal access token.
 */
async function fetchActivity(): Promise<GitHubActivity | null> {
  if (!GITHUB_TOKEN) return null

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
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables: { username: GITHUB_USERNAME } }),
    })

    if (!res.ok) return null
    
    const { data } = await res.json()
    const calendar = data?.user?.contributionsCollection?.contributionCalendar
    
    if (!calendar) return null

    return {
      totalContributions: calendar.totalContributions,
      weeks: calendar.weeks
    }
  } catch (err) {
    console.error('[github] fetchActivity failed:', err)
    return null
  }
}

// ─── Public API ───────────────────────────────────────────────────────────

export async function getGitHubData(): Promise<GitHubCache> {
  const cached = await getGitHubCache()
  if (cached && isCacheFresh(cached.cachedAt)) {
    return cached
  }

  const [repos, activity] = await Promise.all([fetchRepos(), fetchActivity()])
  const fresh: GitHubCache = { repos, activity, cachedAt: Date.now() }

  // Fire-and-forget — cache write failure does not break the user experience
  setGitHubCache(fresh).catch((err) =>
    console.error('GitHub cache write failed:', err)
  )

  return fresh
}
