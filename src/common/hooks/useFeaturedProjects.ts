import { useEffect, useState } from 'react'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../lib/firebase'
import type { EnrichedProject } from '../types/project'
import { projectMetadata } from '../lib/projectMetadata'

export function useFeaturedProjects() {
  const [projects, setProjects] = useState<EnrichedProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    const loadProjects = async () => {
      try {
        setLoading(true)
        
        // 1. Fetch configurations from Firestore
        const q = query(collection(db, 'projects'), orderBy('order', 'asc'))
        const snapshot = await getDocs(q)
        
        if (!active) return

        const featuredConfigs = snapshot.docs
          .map(d => ({ id: d.id, ...d.data() } as any))
          .filter(d => d.featured)

        // 2. Map to EnrichedProject format
        const enriched: EnrichedProject[] = featuredConfigs.map((config: any) => {
          const meta = projectMetadata[config.repoName] || {}
          
          const baseline: EnrichedProject = {
            id: Number(config.id) || 0,
            name: config.repoName,
            description: config.description || meta.shortDescription || '',
            topics: [],
            language: null,
            githubUrl: config.githubUrl || `https://github.com/Aditya-Chavan-dev/${config.repoName}`,
            liveUrl: null,
            stars: 0,
            forksCount: 0,
            openIssuesCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            isFork: false,
            commitCount: 0,
            languages: {},
            featured: true,
            order: config.order || 0,
            meta: meta
          }
          
          return baseline
        })

        setProjects(enriched)
      } catch (err: any) {
        console.error('[useFeaturedProjects] Failed to load projects:', err)
        setError(err.message)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProjects()
    return () => { active = false }
  }, [])

  return { projects, loading, error }
}
