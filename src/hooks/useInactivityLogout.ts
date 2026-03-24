import { useEffect, useRef, useCallback } from 'react'
import { useAuth } from '@/admin/AuthProvider'
import { useToastContext } from '@/shared/Toast'
import { useNavigate } from 'react-router-dom'

const INACTIVITY_TIMEOUT = 30 * 60 * 1000   // 30 minutes
const WARNING_BEFORE     =  2 * 60 * 1000   // warn 2 minutes before

const ACTIVITY_EVENTS = ['mousemove', 'keydown', 'click', 'touchstart', 'scroll'] as const

/**
 * Auto-logout after 30 minutes of inactivity.
 * Shows a warning toast at 28 minutes.
 * Any user interaction resets the timer.
 * Only active when admin is authenticated.
 */
export function useInactivityLogout() {
  const { logout, isAdmin } = useAuth()
  const { addToast } = useToastContext()
  const navigate = useNavigate()

  const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const warningShownRef = useRef(false)

  const resetTimers = useCallback(() => {
    // Clear existing timers
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current)
    if (warningTimerRef.current) clearTimeout(warningTimerRef.current)
    warningShownRef.current = false

    // Warning at 28 minutes
    warningTimerRef.current = setTimeout(() => {
      warningShownRef.current = true
      addToast('Session expires in 2 minutes. Move your mouse to stay logged in.', 'warning', 10000)
    }, INACTIVITY_TIMEOUT - WARNING_BEFORE)

    // Logout at 30 minutes
    logoutTimerRef.current = setTimeout(async () => {
      try {
        await logout('inactivity')
        addToast('Session expired due to inactivity', 'info')
        navigate('/amgl-3-10', { replace: true })
      } catch {
        // Logout failed — force navigate anyway
        navigate('/amgl-3-10', { replace: true })
      }
    }, INACTIVITY_TIMEOUT)
  }, [logout, addToast, navigate])

  useEffect(() => {
    if (!isAdmin) return

    // Start the timers
    resetTimers()

    // Reset on any activity
    const handleActivity = () => resetTimers()

    for (const event of ACTIVITY_EVENTS) {
      document.addEventListener(event, handleActivity, { passive: true })
    }

    return () => {
      if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current)
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current)
      for (const event of ACTIVITY_EVENTS) {
        document.removeEventListener(event, handleActivity)
      }
    }
  }, [isAdmin, resetTimers])
}
