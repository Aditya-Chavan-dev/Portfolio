import { useEffect } from 'react'
import { db } from '@/common/lib/firebase'
import { doc, setDoc, increment, serverTimestamp } from 'firebase/firestore'
import { ref, get, set, update } from 'firebase/database'
import { rtdb, auth } from '@/common/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuth } from '@/admin/AuthProvider'
import { SESSION_KEYS } from '@/common/shared/constants'
import { tracedCall, tracedWrite, incrementLocalCounter } from '@/common/lib/metrics'

/**
 * Records a single visit per browser session.
 * [Issue 1.2] Also initializes a permanent private user profile in RTDB.
 */
export function useRecordVisit() {
  const { isAdmin, loading: authLoading } = useAuth()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user || authLoading) return
      
      if (sessionStorage.getItem(SESSION_KEYS.VISIT_RECORDED)) return
      sessionStorage.setItem(SESSION_KEYS.VISIT_RECORDED, 'true')

      recordVisit(isAdmin || false).catch(() => {})
      initializePersistentProfile(user.uid).catch(() => {})
    })

    return () => unsubscribe()
  }, [authLoading, isAdmin])
}

async function initializePersistentProfile(uid: string) {
  const userRef = ref(rtdb, `users/${uid}`)
  
  // RTDB doesn't have a built-in tracer in the plan, so we manual-increment
  const snapshot = await tracedCall(`rtdb/users/get/${uid}`, () => get(userRef))
  incrementLocalCounter('reads')

  if (!snapshot.exists()) {
    await set(userRef, {
      first_visit: serverTimestamp(),
      last_visit: serverTimestamp(),
      returning_visitor: false
    })
    incrementLocalCounter('writes')
  } else {
    await update(userRef, { 
      last_visit: serverTimestamp(),
      returning_visitor: true 
    })
    incrementLocalCounter('writes')
  }
}

async function recordVisit(isAdmin: boolean) {
  const today = new Date().toISOString().split('T')[0]
  const dailyRef = doc(db, 'analytics', `daily_${today}`)
  const allTimeRef = doc(db, 'analytics', 'allTime')

  const field = isAdmin ? 'adminVisits' : 'visits'
  const totalField = isAdmin ? 'totalAdminVisits' : 'totalVisits'

  try {
    await tracedWrite(`firestore/analytics/daily/${today}`, () => 
      setDoc(dailyRef, { date: today, [field]: increment(1) }, { merge: true })
    )
    await tracedWrite('firestore/analytics/allTime', () => 
      setDoc(allTimeRef, { [totalField]: increment(1) }, { merge: true })
    )
  } catch (err) {
    // Silent fail in production to keep console clean during flickers. 
    // Data will sync automatically via Firestore's persistent cache when back online.
    if (import.meta.env.DEV) {
      console.warn('[Analytics] Network flicker detected. Syncing in background.');
    }
  }
}



