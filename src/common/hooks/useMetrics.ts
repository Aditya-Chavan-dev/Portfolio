import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
import { doc, onSnapshot } from 'firebase/firestore'
import { rtdb, db } from '@/common/lib/firebase'
import { incrementLocalCounter } from '@/common/lib/metrics'

interface Metrics {
  liveNow: number
  todayVisits: number
  allTimeVisits: number
  loading: boolean
}

function validateCount(val: any, cacheKey: string): number {
  if (typeof val === 'number' && val >= 0) {
    localStorage.setItem(cacheKey, val.toString());
    return val;
  }
  
  const cachedValue = localStorage.getItem(cacheKey);
  return cachedValue ? parseInt(cachedValue, 10) : 0;
}

export function useMetrics(): Metrics {
  const [liveNow, setLiveNow] = useState(0)
  const [todayVisits, setTodayVisits] = useState(0)
  const [allTimeVisits, setAllTimeVisits] = useState(0)
  const [loadCount, setLoadCount] = useState(0)

  useEffect(() => {
    const presenceRef = ref(rtdb, 'presence')
    const unsub = onValue(presenceRef, (snapshot) => {
      incrementLocalCounter('reads')
      const val = snapshot.val()
      if (!val) {
        setLiveNow(0)
        return
      }

      const now = Date.now()
      const THRESHOLD = 120000 
      
      const activeUsers = Object.values(val).filter((user: any) => 
        user.last_seen && (now - user.last_seen < THRESHOLD)
      )

      setLiveNow(validateCount(activeUsers.length, 'cache_live_now'))
      setLoadCount(c => c + 1)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const dailyDocId = `daily_${today}`
    
    const unsub = onSnapshot(doc(db, 'analytics', dailyDocId), (snap) => {
      incrementLocalCounter('reads')
      const data = snap.data()
      setTodayVisits(validateCount(data?.visits, `cache_visits_${today}`))
      setLoadCount(c => c + 1)
    })
    return () => unsub()
  }, [])

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'analytics', 'allTime'), (snap) => {
      incrementLocalCounter('reads')
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
    loading: loadCount < 3,
  }
}



