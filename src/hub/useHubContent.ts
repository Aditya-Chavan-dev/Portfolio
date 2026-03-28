import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { incrementLocalCounter } from '@/common/lib/metrics'
import type { HubContent } from './hub.types'
import fallbackContent from './content.json'

export function useHubContent() {
  const [content, setContent] = useState<HubContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const docRef = doc(db, 'live', 'hub')

    // Safety timer to force fallback if onSnapshot hangs (e.g., due to Adblocker)
    const timeoutTimer = setTimeout(() => {
      setContent(fallbackContent as unknown as HubContent)
      setLoading(false)
    }, 2500)

    const unsubscribe = onSnapshot(
      docRef,
      (snap) => {
        clearTimeout(timeoutTimer)
        incrementLocalCounter('reads')
        if (snap.exists()) {
          setContent(snap.data() as HubContent)
        } else if (loading) {
          setContent(fallbackContent as unknown as HubContent)
        }
        setLoading(false)
      },
      (error) => {
        clearTimeout(timeoutTimer)
        console.error('Hub content subscription error:', error)
        if (loading) {
          setContent(fallbackContent as unknown as HubContent)
        }
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
