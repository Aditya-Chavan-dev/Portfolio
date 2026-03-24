import { useEditMode } from './EditModeContext'
import { useAuth } from './AuthProvider'
import { useLocation } from 'react-router-dom'
import { useEditSessionLock } from '@/hooks/useEditSessionLock'
import { useEffect, useState } from 'react'
import DeployModal from './components/DeployModal'

const ADMIN_ROUTES = ['/amgl-3-10', '/amgl-panel']

/**
 * BottomDock Component — Fixed floating dock at the bottom of the screen.
 * Visible on public routes when admin has an active edit session.
 */
export default function BottomDock() {
  const { mode, setMode, hasUnsavedChanges, exitEditSession } = useEditMode()
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false)
  const { isAdmin } = useAuth()
  const location = useLocation()
  const isAdminRoute = ADMIN_ROUTES.some(r => location.pathname.startsWith(r))
  const hasEditSession = typeof window !== 'undefined' && sessionStorage.getItem('admin_edit_session') === 'true'

  const { lockHeldByMe, lockHeldByOther, acquireLock, releaseLock } = useEditSessionLock(isAdmin && hasEditSession)

  // Acquire lock when entering edit mode
  useEffect(() => {
    if (mode === 'edit' && !lockHeldByMe && !lockHeldByOther) {
      acquireLock().catch(console.error)
    }
    return () => {
      // Release lock if component unmounts or leaves edit mode
      if (mode === 'edit') releaseLock().catch(console.error)
    }
  }, [mode, lockHeldByMe, lockHeldByOther, acquireLock, releaseLock])

  if (!isAdmin || isAdminRoute || !hasEditSession) return null

  function handleDeploy() {
    setIsDeployModalOpen(true)
  }

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] w-[90%] max-w-lg">
        <div className="bg-black/80 dark:bg-[#151518]/90 backdrop-blur-md border border-white/[0.08] rounded-full px-6 py-2.5 shadow-2xl flex items-center justify-between gap-4">
          
          {/* Left: Indicator */}
          <div className="flex items-center gap-2">
            {mode === 'edit' && <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />}
            {mode === 'preview' && <span className="h-2 w-2 rounded-full bg-green-500" />}
            {mode === 'idle' && <span className="h-2 w-2 rounded-full bg-gray-400" />}
            <span className="text-xs font-semibold text-white uppercase tracking-wider">
              {mode === 'edit' ? 'Editing' : mode === 'preview' ? 'Preview' : 'God Mode'}
            </span>
          </div>

          <div className="h-4 w-px bg-white/[0.15]" />

          {/* Center: Actions */}
          <div className="flex items-center gap-2">
            {mode === 'idle' && (
              <button
                onClick={() => setMode('edit')}
                disabled={lockHeldByOther}
                title={lockHeldByOther ? 'Lock held by other device' : 'Edit this page'}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-600 text-white shadow hover:bg-amber-500 transition-colors cursor-pointer flex items-center gap-1"
              >
                ✏️ Edit
              </button>
            )}

            {mode === 'edit' && (
              <button
                onClick={() => setMode('preview')}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-green-600 text-white shadow hover:bg-green-500 transition-colors cursor-pointer flex items-center gap-1"
              >
                👁️ Save & Preview
              </button>
            )}

            {mode === 'preview' && (
              <button
                onClick={() => setMode('edit')}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/10 text-white border border-white/20 hover:bg-white/20 transition-colors cursor-pointer"
              >
                ✏️ Back to Edit
              </button>
            )}

            {/* Deploy is visible in both edit/preview, but most sensible in preview or with changes */}
            {(mode === 'preview' || hasUnsavedChanges) && (
              <button
                onClick={handleDeploy}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1"
              >
                🚀 Deploy
              </button>
            )}
          </div>

          <div className="h-4 w-px bg-white/[0.15]" />

          {/* Right: Exit / Dashboard */}
          <button
            onClick={exitEditSession}
            className="text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Exit
          </button>
        </div>
      </div>

      <DeployModal 
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        onSuccess={() => setMode('idle')}
      />
    </>
  )
}
