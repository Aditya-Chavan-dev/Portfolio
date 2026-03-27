import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { tracedCall } from '../lib/metrics'
import {
  fetchAllRepos,
  fetchCommitCount,
  fetchLanguages,
  fetchProjectMeta
} from '../lib/github'
import type { EnrichedProject } from '../types/project'

export function useFeaturedProjects() {
  const [projects, setProjects] = useState<EnrichedProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadFallback = async () => {
      try {
        const allRepos = await tracedCall('github/fetchAllRepos/fallback', () => fetchAllRepos())
        const fallbackData = allRepos.map((repo, i) => ({
          ...repo,
          commitCount: 0,
          languages: {},
          meta: null,
          featured: true,
          order: i,
        })) as EnrichedProject[]
        setProjects(fallbackData)
      } catch (e) {
        setError('Failed to load any project data.')
      } finally {
        setLoading(false)
      }
    }

    const fetchFirestore = async () => {
      try {
        const snapshot = await tracedCall('firestore/projects/featured', () => 
          getDocs(collection(db, 'projects'))
        )
        const featured = snapshot.docs
          .map(d => d.data())
          .filter((d: any) => d.featured)
          .sort((a: any, b: any) => a.order - b.order)

        if (featured.length === 0) {
          await loadFallback()
          return
        }

        const allRepos = await tracedCall('github/fetchAllRepos', () => fetchAllRepos())

        const matched = featured
          .map((f: any) => allRepos.find(r => r.name === f.repoName))
          .filter(Boolean) as any[]

        const enriched: EnrichedProject[] = await Promise.all(
          matched.map(async (repo, i) => {
            const [commitCount, languages, meta] = await Promise.all([
              tracedCall(`github/commitCount/${repo.name}`, () => fetchCommitCount(repo.name)),
              tracedCall(`github/languages/${repo.name}`, () => fetchLanguages(repo.name)),
              tracedCall(`github/projectMeta/${repo.name}`, () => fetchProjectMeta(repo.name)),
            ])
            return {
              ...repo,
              commitCount,
              languages,
              meta,
              featured: true,
              order: featured[i].order,
            }
          })
        )

        setProjects(enriched)
      } catch (err: any) {
        await loadFallback()
      }
    }

    fetchFirestore()
  }, [])

  return { projects, loading, error }
}
