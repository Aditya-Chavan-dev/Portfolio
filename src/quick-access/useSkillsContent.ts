import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { incrementLocalCounter } from '@/common/lib/metrics'
import type { SkillsContent } from './skills.types'
import fallbackContent from './content.json'

export function useSkillsContent() {
  const [content, setContent] = useState<SkillsContent | null>(fallbackContent as unknown as SkillsContent)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const docRef = doc(db, 'live', 'skills')

    const unsubscribe = onSnapshot(
      docRef,
      (snap) => {
        incrementLocalCounter('reads')
        if (snap.exists()) {
          setContent(snap.data() as SkillsContent)
        } else {
          setContent(fallbackContent as unknown as SkillsContent)
        }
        setLoading(false)
      },
      (error) => {
        console.warn('Skills content subscription error (likely blocked by client):', error)
        // Keep fallback content as is
        setLoading(false)
      }
    )

    return () => unsubscribe()
  }, [])

  return { content, loading } as const
}


