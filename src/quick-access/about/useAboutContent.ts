import { useState, useEffect } from 'react'
import { getAboutContent } from '@/shared/firestore.service'
import type { AboutContent } from './about.types'
import fallbackContent from './content.json'

export function useAboutContent() {
  const [content, setContent] = useState<AboutContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getAboutContent()
      .then((data) => {
        if (!cancelled) setContent(data ?? (fallbackContent as unknown as AboutContent))
      })
      .catch(() => {
        if (!cancelled) setContent(fallbackContent as unknown as AboutContent)
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { content, loading } as const
}
