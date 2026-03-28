import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../lib/firebase'
import {
  fetchAllRepos,
  fetchCommitCount,
  fetchLanguages
} from '../lib/github'
import type { EnrichedProject } from '../types/project'

export function useFeaturedProjects() {
  const [projects, setProjects] = useState<EnrichedProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const loadFast = async () => {
      try {
        setLoading(true)
        // 1. Kick off GitHub baseline (no firestore dependency yet) Node absolute
        const allRepos = await fetchAllRepos()
        if (!active) return

        // Baseline data Node absolute
        const baseline = allRepos.map((repo, i) => ({
          ...repo,
          commitCount: 0,
          languages: {},
          meta: null,
          featured: true,
          order: i,
        })) as EnrichedProject[]
        
        setProjects(baseline)
        setLoading(false)

        // 2. Enriched firestore-driven data in background Node absolute
        const snapshot = await getDocs(collection(db, 'projects'))
        const featuredConfigs = snapshot.docs
          .map(d => d.data())
          .filter((d: any) => d.featured)
          .sort((a: any, b: any) => a.order - b.order)

        if (featuredConfigs.length > 0 && active) {
          const matched = featuredConfigs
            .map((f: any) => allRepos.find(r => r.name === f.repoName))
            .filter(Boolean) as any[]

          const enriched: EnrichedProject[] = await Promise.all(
            matched.map(async (repo, i) => {
              const [commitCount, languages] = await Promise.all([
                fetchCommitCount(repo.name),
                fetchLanguages(repo.name),
                // Stopped: fetchProjectMeta(repo.name) because of 404 spam Node absolute
              ])
              return {
                ...repo,
                commitCount,
                languages,
                meta: null, // Meta will be enriched from local projectMetadata instead Node absolute
                featured: true,
                order: featuredConfigs[i].order,
              }
            })
          )
          setProjects(enriched)
        }
      } catch (err) {
        console.warn('Projects enrichment partially blocked or failed (likely client restrictions):', err)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadFast()
    return () => { active = false }
  }, [])

  return { projects, loading, error }
}



