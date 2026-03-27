import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { incrementLocalCounter } from '@/lib/metrics'
import type { CertificationsContent } from './certifications.types'
import fallbackContent from './content.json'

export function useCertificationsContent() {
  const [content, setContent] = useState<CertificationsContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const docRef = doc(db, 'live', 'certifications')

    const timeoutTimer = setTimeout(() => {
      setContent(fallbackContent as unknown as CertificationsContent)
      setLoading(false)
    }, 2500)

    const unsubscribe = onSnapshot(
      docRef,
      (snap) => {
        clearTimeout(timeoutTimer)
        incrementLocalCounter('reads')
        if (snap.exists()) {
          setContent(snap.data() as CertificationsContent)
        } else {
          setContent(fallbackContent as unknown as CertificationsContent)
        }
        setLoading(false)
      },
      (error) => {
        clearTimeout(timeoutTimer)
        console.error('Certifications content subscription error:', error)
        setContent(fallbackContent as unknown as CertificationsContent)
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
