import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { incrementLocalCounter } from '@/common/lib/metrics'
import type { ExperienceContent } from './experience.types'
import fallbackContent from './content.json'

export function useExperienceContent() {
  const [content, setContent] = useState<ExperienceContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const docRef = doc(db, 'live', 'experience')

    const timeoutTimer = setTimeout(() => {
      setContent(fallbackContent as unknown as ExperienceContent)
      setLoading(false)
    }, 2500)

    const unsubscribe = onSnapshot(
      docRef,
      (snap) => {
        clearTimeout(timeoutTimer)
        incrementLocalCounter('reads')
        if (snap.exists()) {
          setContent(snap.data() as ExperienceContent)
        } else {
          setContent(fallbackContent as unknown as ExperienceContent)
        }
        setLoading(false)
      },
      (error) => {
        clearTimeout(timeoutTimer)
        console.error('Experience content subscription error:', error)
        setContent(fallbackContent as unknown as ExperienceContent)
        setLoading(false)
      }
    )

    return () => {
      clearTimeout(timeoutTimer)
      unsubscribe()
    }
  }, [])

  return { content, loading } as const
}


