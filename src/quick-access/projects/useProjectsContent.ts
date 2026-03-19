import { useState, useEffect } from 'react'
import { getProjectsContent } from '@/shared/firestore.service'
import type { ProjectsContent } from './projects.types'
import fallbackContent from './content.json'

export function useProjectsContent() {
  const [content, setContent] = useState<ProjectsContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getProjectsContent()
      .then((data) => {
        if (!cancelled) setContent(data ?? (fallbackContent as unknown as ProjectsContent))
      })
      .catch(() => {
        if (!cancelled) setContent(fallbackContent as unknown as ProjectsContent)
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { content, loading } as const
}
