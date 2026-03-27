import { useEffect } from 'react'
import { ref, set, onDisconnect, serverTimestamp } from 'firebase/database'
import { rtdb, auth } from '@/shared/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useLocation } from 'react-router-dom'

export function usePresence() {
  const { pathname } = useLocation()
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) return

      const presenceRef = ref(rtdb, `presence/${user.uid}`)

      set(presenceRef, { 
        status: 'online',
        page: pathname,
        last_seen: serverTimestamp() 
      }).catch(() => {})

      onDisconnect(presenceRef).remove()
    })

    return () => unsubscribe()
  }, [pathname])
}
