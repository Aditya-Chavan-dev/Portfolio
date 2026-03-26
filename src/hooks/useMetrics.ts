import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { doc, onSnapshot } from 'firebase/firestore'
import { rtdb, db } from '@/shared/firebase'

interface Metrics {
  liveNow: number
  todayVisits: number
  allTimeVisits: number
  loading: boolean
}

/**
 * Admin-only hook that subscribes to:
 * - RTDB /presence (live visitor count)
 * - Firestore analytics/daily (today's visits)
 * - Firestore analytics/allTime (total visits)
 */
/**
 * Schema-Guard: Validates numeric data from Firestore
 * Falls back to LocalStorage cache if data is missing or corrupted (Vandalism protection)
 */
function validateCount(val: any, cacheKey: string): number {
  if (typeof val === 'number' && val >= 0) {
    localStorage.setItem(cacheKey, val.toString());
    return val;
  }
  
  // Fallback to Last Known Good State from Cache
  const cachedValue = localStorage.getItem(cacheKey);
  return cachedValue ? parseInt(cachedValue, 10) : 0;
}

export function useMetrics(): Metrics {
  const [liveNow, setLiveNow] = useState(0)
  const [todayVisits, setTodayVisits] = useState(0)
  const [allTimeVisits, setAllTimeVisits] = useState(0)
  const [loadCount, setLoadCount] = useState(0)

  // RTDB presence count
  useEffect(() => {
    const presenceRef = ref(rtdb, 'presence')
    const unsub = onValue(presenceRef, (snapshot) => {
      const val = snapshot.val()
      // Presence is a map of userIDs
      const count = val ? Object.keys(val).length : 0
      setLiveNow(validateCount(count, 'cache_live_now'))
      setLoadCount(c => c + 1)
    })
    return () => unsub()
  }, [])

  // Firestore daily visits
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const dailyDocId = `daily_${today}`
    
    const unsub = onSnapshot(doc(db, 'analytics', dailyDocId), (snap) => {
      const data = snap.data()
      // Ensure we hit the cache if the document was deleted or sabotaged
      setTodayVisits(validateCount(data?.visits, `cache_visits_${today}`))
      setLoadCount(c => c + 1)
    })
    return () => unsub()
  }, [])

  // Firestore all-time visits
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'analytics', 'allTime'), (snap) => {
      const data = snap.data()
      setAllTimeVisits(validateCount(data?.totalVisits, 'cache_all_time_visits'))
      setLoadCount(c => c + 1)
    })
    return () => unsub()
  }, [])

  return {
    liveNow,
    todayVisits,
    allTimeVisits,
    loading: loadCount < 3, // all 3 listeners need to fire at least once
  }
}
