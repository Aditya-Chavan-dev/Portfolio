import { type ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  readonly children: ReactNode
}

/**
 * Route guard for admin pages.
 * Prototype: always redirects — auth is a post-prototype phase.
 */
export function ProtectedRoute({ children }: Props) {
  const isAuthenticated = false

  return isAuthenticated ? <>{children}</> : <Navigate to="/amgl-3-10" replace />
}
