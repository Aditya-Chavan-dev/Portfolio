import { useState, useEffect } from 'react'
import { getHubContent } from '@/shared/firestore.service'
import type { HubContent } from './hub.types'
import fallbackContent from './content.json'

export function useHubContent() {
  const [content, setContent] = useState<HubContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getHubContent()
      .then((data) => {
        if (!cancelled) setContent(data ?? (fallbackContent as unknown as HubContent))
      })
      .catch(() => {
        if (!cancelled) setContent(fallbackContent as unknown as HubContent)
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { content, loading } as const
}
