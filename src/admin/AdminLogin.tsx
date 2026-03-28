import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import { useToastContext } from '@/common/shared/Toast'

export default function AdminLogin() {
  const navigate = useNavigate()
  const { login, isAdmin, loading } = useAuth()
  const { addToast } = useToastContext()


  // If already authenticated as admin, redirect immediately
  useEffect(() => {
    if (!loading && isAdmin) {
      navigate('/amgl-panel', { replace: true })
    }
  }, [loading, isAdmin, navigate])

  if (loading || isAdmin) {
    return null
  }

  async function handleGoogleLogin() {
    try {
      await login()
      addToast('Authenticated successfully', 'success')
      navigate('/amgl-panel', { replace: true })
    } catch (err: any) {
      const code = err?.code ?? ''

      if (code === 'auth/popup-closed-by-user') {
        // User closed the popup — not an error worth showing
        return
      }

      let message = 'Authentication failed'
      if (code === 'auth/unauthorized-domain') {
        message = 'This domain is not authorized for Google Sign-In'
      } else if (code === 'auth/network-request-failed') {
        message = 'Network error — check your connection'
      } else if (code === 'auth/too-many-requests') {
        message = 'Too many attempts — try again later'
      }

      addToast(message, 'error')
    }
  }

  return (
    <div className="min-h-screen bg-theme-primary flex items-center justify-center p-6">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
            <span className="text-white text-xl font-bold">A</span>
          </div>
          <h1 className="text-xl font-bold text-theme-primary font-serif tracking-tight">
            Admin Access
          </h1>
          <p className="text-xs text-theme-muted mt-1 font-mono tracking-wide">
            Authorized personnel only
          </p>
        </div>

        {/* Google Sign-In Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2.5 px-4 rounded-lg bg-white dark:bg-[#1a1a1d] border border-black/[0.08] dark:border-white/[0.08] text-theme-primary text-sm font-semibold shadow-sm hover:shadow-md hover:border-black/[0.15] dark:hover:border-white/[0.15] transition-all duration-200 cursor-pointer flex items-center justify-center gap-3"
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
            <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
            <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
            <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          </svg>
          Sign in with Google
        </button>

        <p className="text-[10px] text-theme-muted text-center mt-4 leading-relaxed">
          Only the authorized admin Google account can access the panel.
          <br />
          Unauthorized accounts will be rejected.
        </p>

        {/* Back link */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => navigate('/hub')}
            className="text-xs text-theme-muted hover:text-theme-secondary transition-colors duration-150 cursor-pointer"
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  )
}
