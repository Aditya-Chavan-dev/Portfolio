import { useState, useEffect } from 'react'
import { getSkillsContent } from '@/shared/firestore.service'
import type { SkillsContent } from './skills.types'
import fallbackContent from './content.json'

export function useSkillsContent() {
  const [content, setContent] = useState<SkillsContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getSkillsContent()
      .then((data) => {
        if (!cancelled) setContent(data ?? (fallbackContent as unknown as SkillsContent))
      })
      .catch(() => {
        if (!cancelled) setContent(fallbackContent as unknown as SkillsContent)
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  return { content, loading } as const
}
