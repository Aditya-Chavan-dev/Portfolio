import { useEffect, useState } from 'react'
import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../shared/firebase'
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
    // Step 1 — listen to Firestore featured list in real time
    const unsub = onSnapshot(
      collection(db, 'projects'),
      async snapshot => {
        try {
          const featured = snapshot.docs
            .map(d => d.data())
            .filter(d => d.featured)
            .sort((a, b) => a.order - b.order)

          if (featured.length === 0) {
            setProjects([])
            setLoading(false)
            return
          }

          // Step 2 — fetch all repos once (cached after first call)
          const allRepos = await fetchAllRepos()

          // Step 3 — match featured list against GitHub repos
          const matched = featured
            .map(f => allRepos.find(r => r.name === f.repoName))
            .filter(Boolean) as any[]

          // Step 4 — enrich each matched repo in parallel
          const enriched: EnrichedProject[] = await Promise.all(
            matched.map(async (repo, i) => {
              const [commitCount, languages, meta] = await Promise.all([
                fetchCommitCount(repo.name),
                fetchLanguages(repo.name),
                fetchProjectMeta(repo.name),
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
          setError(err.message)
        } finally {
          setLoading(false)
        }
      },
      err => {
        setError(err.message)
        setLoading(false)
      }
    )
    return () => unsub()
  }, [])

  return { projects, loading, error }
}
