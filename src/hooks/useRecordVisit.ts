import { useEffect } from 'react'
import { doc, setDoc, increment } from 'firebase/firestore'
import { db } from '@/shared/firebase'
import { useAuth } from '@/admin/AuthProvider'
import { SESSION_KEYS } from '@/shared/constants'

/**
 * Records a single visit per browser session.
 * Increments analytics/daily (resets on new day) and analytics/allTime.
 * Uses sessionStorage to prevent double-counting on SPA navigation.
 */
export function useRecordVisit() {
  const { isAdmin, loading } = useAuth()

  useEffect(() => {
    if (loading) return // Wait for auth state to resolve
    
    // Only count once per session
    if (sessionStorage.getItem(SESSION_KEYS.VISIT_RECORDED)) return
    sessionStorage.setItem(SESSION_KEYS.VISIT_RECORDED, 'true')

    recordVisit(isAdmin || false).catch(console.error)
  }, [loading, isAdmin])
}

async function recordVisit(isAdmin: boolean) {
  const today = new Date().toISOString().split('T')[0] // "YYYY-MM-DD"
  const dailyDocId = `daily_${today}`
  
  const dailyRef = doc(db, 'analytics', dailyDocId)
  const allTimeRef = doc(db, 'analytics', 'allTime')

  const field = isAdmin ? 'adminVisits' : 'visits'
  const totalField = isAdmin ? 'totalAdminVisits' : 'totalVisits'

  try {
    // 1. Atomic Daily Increment (Date-sharded doc prevents logic resets)
    await setDoc(dailyRef, {
      date: today,
      [field]: increment(1)
    }, { merge: true })

    // 2. Atomic All-Time Increment
    await setDoc(allTimeRef, {
      [totalField]: increment(1)
    }, { merge: true })

  } catch (err) {
    // Silently fail to not interrupt user session, but log for admin
    console.error('[Analytics] Failed to record visit:', err)
  }
}
