import { useEffect, useState } from 'react'
import { fetchGithubRepos } from '../lib/github'
import { tracedCall } from '../lib/metrics'
import type { Project } from '../types/project'

export function useGithubProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    tracedCall('github/fetchRepos', () => fetchGithubRepos())
      .then(setProjects)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return { projects, loading, error }
}



