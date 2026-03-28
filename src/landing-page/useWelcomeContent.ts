import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { incrementLocalCounter } from '@/common/lib/metrics'
import type { WelcomeConfig } from './landing.types'
import fallbackContent from './content.json'

export function useWelcomeContent() {
  const [content, setContent] = useState<WelcomeConfig | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const docRef = doc(db, 'live', 'welcome')
    
    // Safety timer to force fallback if onSnapshot hangs/crashes (e.g., due to Adblocker)
    const timeoutTimer = setTimeout(() => {
      setContent(fallbackContent as unknown as WelcomeConfig)
      setLoading(false)
    }, 2500)

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      clearTimeout(timeoutTimer)
      incrementLocalCounter('reads')
      if (docSnap.exists()) {
         setContent(docSnap.data() as WelcomeConfig)
      } else if (loading) {
         // Only set fallback if we've never loaded anything yet
         setContent(fallbackContent as unknown as WelcomeConfig)
      }
      setLoading(false)
    }, (error) => {
      clearTimeout(timeoutTimer)
      console.error('Welcome screen content subscription error:', error)
      if (loading) {
        setContent(fallbackContent as unknown as WelcomeConfig)
      }
      setLoading(false)
    })

    return () => {
      clearTimeout(timeoutTimer)
      unsubscribe()
    }
  }, [])

  return { content, loading } as const
}
