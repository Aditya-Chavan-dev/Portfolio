import { useEffect } from 'react'
import { doc, getDoc, setDoc, updateDoc, increment } from 'firebase/firestore'
import { db } from '@/shared/firebase'
import { useAuth } from '@/admin/AuthProvider'

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
    if (sessionStorage.getItem('visit_recorded')) return
    sessionStorage.setItem('visit_recorded', 'true')

    recordVisit(isAdmin || false).catch(console.error)
  }, [loading, isAdmin])
}

async function recordVisit(isAdmin: boolean) {
  const today = new Date().toISOString().split('T')[0] // "YYYY-MM-DD"

  try {
    // --- Daily counter ---
    const dailyRef = doc(db, 'analytics', 'daily')
    const dailySnap = await getDoc(dailyRef)
    const fieldName = isAdmin ? 'adminVisits' : 'visits'

    if (!dailySnap.exists()) {
      // First ever visit — create the doc
      await setDoc(dailyRef, { 
        date: today, 
        visits: isAdmin ? 0 : 1, 
        adminVisits: isAdmin ? 1 : 0 
      })
    } else if (dailySnap.data().date !== today) {
      // New day — reset
      await setDoc(dailyRef, { 
        date: today, 
        visits: isAdmin ? 0 : 1, 
        adminVisits: isAdmin ? 1 : 0 
      })
    } else {
      // Same day — increment
      await updateDoc(dailyRef, { [fieldName]: increment(1) })
    }

    // --- All-time counter ---
    const allTimeRef = doc(db, 'analytics', 'allTime')
    const allTimeSnap = await getDoc(allTimeRef)

    if (!allTimeSnap.exists()) {
      await setDoc(allTimeRef, { 
        totalVisits: isAdmin ? 0 : 1, 
        totalAdminVisits: isAdmin ? 1 : 0 
      })
    } else {
      await updateDoc(allTimeRef, { 
        [isAdmin ? 'totalAdminVisits' : 'totalVisits']: increment(1) 
      })
    }
  } catch (err) {
    console.error('Failed to record visit:', err)
  }
}
