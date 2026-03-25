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
      setLiveNow(val ? Object.keys(val).length : 0)
      setLoadCount(c => c + 1)
    })
    return () => unsub()
  }, [])

  // Firestore daily visits
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const dailyDocId = `daily_${today}`
    
    const unsub = onSnapshot(doc(db, 'analytics', dailyDocId), (snap) => {
      if (snap.exists()) {
        const data = snap.data()
        // No need to check date inside, as the docId is the date
        setTodayVisits(data.visits ?? 0)
      } else {
        setTodayVisits(0)
      }
      setLoadCount(c => c + 1)
    })
    return () => unsub()
  }, [])

  // Firestore all-time visits
  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'analytics', 'allTime'), (snap) => {
      if (snap.exists()) {
        setAllTimeVisits(snap.data().totalVisits ?? 0)
      } else {
        setAllTimeVisits(0)
      }
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
