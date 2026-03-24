import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/admin/AuthProvider'
import { useEditSessionLock } from '@/hooks/useEditSessionLock'

const ADMIN_ROUTES = ['/amgl-3-10', '/amgl-panel']

/**
 * Admin Control Bar — fixed top bar visible on public portfolio routes
 * when admin is authenticated AND navigated from /amgl-panel.
 *
 * Conditions for rendering:
 * 1. isAdmin === true
 * 2. sessionStorage has 'admin_edit_session' === 'true'
 * 3. Current route is NOT an admin route
 */
export default function AdminControlBar() {
  const { isAdmin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const { lockHeldByOther } = useEditSessionLock()

  const isAdminRoute = ADMIN_ROUTES.some(r => location.pathname.startsWith(r))
  const hasEditSession = typeof window !== 'undefined' && sessionStorage.getItem('admin_edit_session') === 'true'

  // Don't render if conditions aren't met
  if (!isAdmin || isAdminRoute || !hasEditSession) return null

  function handleBackToDashboard() {
    sessionStorage.removeItem('admin_edit_session')
    navigate('/amgl-panel')
  }

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] bg-[#1a1a1d] border-b border-white/[0.06] shadow-lg"
      style={{ height: 48 }}
    >
      <div className="h-full max-w-screen-2xl mx-auto px-4 flex items-center gap-3">
        {/* Back to Dashboard */}
        <button
          onClick={handleBackToDashboard}
          className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-300 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer whitespace-nowrap"
        >
          ← Dashboard
        </button>

        <div className="w-px h-5 bg-white/[0.1]" />

        {/* Edit This Page */}
        <button
          disabled={lockHeldByOther}
          title={lockHeldByOther ? 'Edit session active on another device' : 'Enter edit mode for this page'}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
            lockHeldByOther
              ? 'text-gray-500 cursor-not-allowed'
              : 'text-amber-400 hover:bg-amber-500/10'
          }`}
        >
          ✏️ Edit This Page
        </button>

        <div className="w-px h-5 bg-white/[0.1]" />

        {/* View Drafts — placeholder count */}
        <button
          disabled
          className="px-3 py-1.5 rounded-md text-xs font-medium text-gray-500 cursor-not-allowed whitespace-nowrap"
        >
          View Drafts (0)
        </button>

        <div className="flex-1" />

        {/* Deploy button */}
        <button
          disabled
          className="px-4 py-1.5 rounded-md text-xs font-semibold text-gray-500 cursor-not-allowed bg-white/[0.04] whitespace-nowrap"
        >
          🚀 Deploy
        </button>
      </div>
    </div>
  )
}
