import { useState, useEffect } from 'react'
import { getGitHubData } from '@/shared/github.service'
import type { GitHubRepo } from '@/shared/github.types'

export function useGitHubRepos() {
  const [repos,   setRepos  ] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error,   setError  ] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    getGitHubData()
      .then((cache) => { if (!cancelled) setRepos(cache.repos) })
      .catch((err: unknown) => {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load GitHub data')
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { repos, loading, error } as const
}
