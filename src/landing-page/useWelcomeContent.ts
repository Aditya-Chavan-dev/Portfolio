import { useState, useEffect } from 'react'
import { getWelcomeContent } from '@/shared/firestore.service'
import type { WelcomeContent } from './landing.types'
import fallbackContent from './content.json'

export function useWelcomeContent() {
  const [content, setContent] = useState<WelcomeContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getWelcomeContent()
      .then((data) => {
        if (!cancelled) setContent(data ?? (fallbackContent as WelcomeContent))
      })
      .catch(() => {
        if (!cancelled) setContent(fallbackContent as WelcomeContent)
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { content, loading } as const
}
