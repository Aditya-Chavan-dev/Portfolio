import { useEffect, useRef } from 'react'
import { ref, push, set, remove, onDisconnect } from 'firebase/database'
import { rtdb } from '@/shared/firebase'
import { useAuth } from '@/admin/AuthProvider'

/**
 * RTDB presence hook — writes a session node to /presence/{sessionId}
 * that auto-removes on disconnect (tab close / network drop).
 * Only runs once per app mount — not per page.
 */
export function usePresence() {
  const { isAdmin, loading } = useAuth()
  const presenceRef = useRef<ReturnType<typeof ref> | null>(null)

  useEffect(() => {
    if (loading || isAdmin) return // Skip counting Admins in general live counts

    const sessionRef = push(ref(rtdb, 'presence'))
    presenceRef.current = sessionRef

    set(sessionRef, { connectedAt: Date.now() }).catch(() => {})
    onDisconnect(sessionRef).remove()

    return () => {
      if (presenceRef.current) {
        remove(presenceRef.current).catch(() => {})
      }
    }
  }, [loading, isAdmin])
}
