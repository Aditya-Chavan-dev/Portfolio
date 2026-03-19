import { useState, useEffect } from 'react'
import { getExperienceContent } from '@/shared/firestore.service'
import type { ExperienceContent } from './experience.types'
import fallbackContent from './content.json'

export function useExperienceContent() {
  const [content, setContent] = useState<ExperienceContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getExperienceContent()
      .then((data) => {
        if (!cancelled) setContent(data ?? (fallbackContent as unknown as ExperienceContent))
      })
      .catch(() => {
        if (!cancelled) setContent(fallbackContent as unknown as ExperienceContent)
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { content, loading } as const
}
