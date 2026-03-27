import { useEffect, useState, useCallback, useRef } from 'react'
import { doc, onSnapshot, setDoc, deleteDoc, serverTimestamp, type Timestamp } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { tracedWrite, incrementLocalCounter } from '@/lib/metrics'

interface EditSessionLock {
  lockHeldByMe: boolean
  lockHeldByOther: boolean
  acquireLock: () => Promise<void>
  releaseLock: () => Promise<void>
}

const STALE_THRESHOLD = 2 * 60 * 60 * 1000 // 2 hours

function getDeviceId(): string {
  let id = sessionStorage.getItem('admin_device_id')
  if (!id) {
    id = crypto.randomUUID()
    sessionStorage.setItem('admin_device_id', id)
  }
  return id
}

export function useEditSessionLock(enabled: boolean = true): EditSessionLock {
  const [lockHeldByMe, setLockHeldByMe] = useState(false)
  const [lockHeldByOther, setLockHeldByOther] = useState(false)
  const deviceId = useRef(getDeviceId())

  useEffect(() => {
    if (!enabled) return

    const unsub = onSnapshot(doc(db, 'editSession', 'current'), (snap) => {
      incrementLocalCounter('reads')
      if (!snap.exists()) {
        setLockHeldByMe(false)
        setLockHeldByOther(false)
        return
      }

      const data = snap.data()
      const isMe = data.deviceId === deviceId.current

      // Stale lock detection
      if (!isMe && data.startedAt) {
        const startedAt = (data.startedAt as Timestamp).toMillis?.()
          ?? (typeof data.startedAt === 'number' ? data.startedAt : 0)
        if (Date.now() - startedAt > STALE_THRESHOLD) {
          setLockHeldByMe(false)
          setLockHeldByOther(false)
          return
        }
      }

      setLockHeldByMe(isMe)
      setLockHeldByOther(!isMe)
    })

    return () => unsub()
  }, [])

  const acquireLock = useCallback(async () => {
    await tracedWrite('firestore/editSession/acquire', () => 
      setDoc(doc(db, 'editSession', 'current'), {
        deviceId: deviceId.current,
        startedAt: serverTimestamp(),
      })
    )
  }, [])

  const releaseLock = useCallback(async () => {
    try {
      await tracedWrite('firestore/editSession/release', () => 
        deleteDoc(doc(db, 'editSession', 'current'))
      )
    } catch (err) {
      console.error('Failed to release edit lock:', err)
    }
  }, [])

  return { lockHeldByMe, lockHeldByOther, acquireLock, releaseLock }
}
