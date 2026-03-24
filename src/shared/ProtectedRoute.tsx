import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '@/admin/AuthProvider'
import { useInactivityLogout } from '@/hooks/useInactivityLogout'

interface Props {
  readonly children: ReactNode
}

/**
 * Route guard for admin pages.
 * Checks Firebase Auth state via AuthProvider context.
 * Runs 30-minute inactivity auto-logout when admin is authenticated.
 */
export function ProtectedRoute({ children }: Props) {
  const { isAdmin, loading } = useAuth()
  useInactivityLogout()

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-theme-muted font-mono">Verifying session…</p>
        </div>
      </div>
    )
  }

  return isAdmin ? <>{children}</> : <Navigate to="/amgl-3-10" replace />
}
