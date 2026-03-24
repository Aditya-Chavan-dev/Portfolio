import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/shared/firebase'
import type { SkillsContent } from './skills.types'
import fallbackContent from './content.json'

export function useSkillsContent() {
  const [content, setContent] = useState<SkillsContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const docRef = doc(db, 'live', 'skills')

    const timeoutTimer = setTimeout(() => {
      setContent(fallbackContent as unknown as SkillsContent)
      setLoading(false)
    }, 2500)

    const unsubscribe = onSnapshot(
      docRef,
      (snap) => {
        clearTimeout(timeoutTimer)
        if (snap.exists()) {
          setContent(snap.data() as SkillsContent)
        } else {
          setContent(fallbackContent as unknown as SkillsContent)
        }
        setLoading(false)
      },
      (error) => {
        clearTimeout(timeoutTimer)
        console.error('Skills content subscription error:', error)
        setContent(fallbackContent as unknown as SkillsContent)
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
