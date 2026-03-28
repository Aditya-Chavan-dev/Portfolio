import { useEditMode } from './EditModeContext'
import { useAuth } from './AuthProvider'
import { useLocation } from 'react-router-dom'
import { useEditSessionLock } from '@/common/hooks/useEditSessionLock'
import { useEffect, useState } from 'react'
import DeployModal from './DeployModal'
import { ADMIN_ROUTES, SESSION_KEYS } from '@/common/shared/constants'
import { Edit2, Eye, Rocket, X } from 'lucide-react'

/**
 * BottomDock Component — Fixed floating dock at the bottom of the screen.
 * Visible on public routes when admin has an active edit session.
 */
export default function BottomDock() {
  const { mode, setMode, hasUnsavedChanges, exitEditSession } = useEditMode()
  const [isDeployModalOpen, setIsDeployModalOpen] = useState(false)
  const { isAdmin } = useAuth()
  const location = useLocation()
  const isAdminRoute = Object.values(ADMIN_ROUTES).some(r => location.pathname.startsWith(r))
  const hasEditSession = typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEYS.ADMIN_EDIT_SESSION) === 'true'

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
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[9999] w-[95%] max-w-lg pointer-events-none">
        <div className="bg-[#0D0D11]/90 backdrop-blur-xl border border-white/[0.08] rounded-2xl px-5 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-between gap-6 pointer-events-auto">
          
          {/* Left: Indicator */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="relative">
              <div className={`h-2 w-2 rounded-full ${
                mode === 'edit' ? 'bg-amber-500' : mode === 'preview' ? 'bg-emerald-500' : 'bg-white/20'
              }`} />
              {mode === 'edit' && (
                <div className="absolute inset-0 h-2 w-2 rounded-full bg-amber-500 animate-ping opacity-75" />
              )}
            </div>
            <div className="flex flex-col -space-y-0.5">
              <span className="text-[10px] font-bold text-white uppercase tracking-[0.15em] font-serif">
                {mode === 'edit' ? 'Editing' : mode === 'preview' ? 'Ready' : 'God Mode'}
              </span>
              <span className="text-[8px] text-white/30 uppercase tracking-widest font-mono">
                {mode === 'idle' ? 'Live Track' : 'Session Active'}
              </span>
            </div>
          </div>

          <div className="h-6 w-px bg-white/[0.08]" />

          {/* Center: Actions */}
          <div className="flex items-center gap-2 flex-1 justify-center">
            {mode === 'idle' && (
              <button
                onClick={() => setMode('edit')}
                disabled={lockHeldByOther}
                title={lockHeldByOther ? 'Lock held by other device' : 'Edit this page'}
                className="group px-4 py-2 rounded-xl text-[11px] font-bold bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] hover:bg-amber-400 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <Edit2 size={12} className="group-hover:rotate-12 transition-transform" />
                <span>Edit Workspace</span>
              </button>
            )}

            {mode === 'edit' && (
              <button
                onClick={() => setMode('preview')}
                className="group px-4 py-2 rounded-xl text-[11px] font-bold bg-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.2)] hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] hover:bg-indigo-400 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <Eye size={12} className="group-hover:scale-110 transition-transform" />
                <span>Save & Preview</span>
              </button>
            )}

            {mode === 'preview' && (
              <button
                onClick={() => setMode('edit')}
                className="px-4 py-2 rounded-xl text-[11px] font-bold bg-white/5 text-white/80 border border-white/10 hover:bg-white/10 hover:text-white active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <Edit2 size={12} />
                <span>Back to Edit</span>
              </button>
            )}

            {/* Deploy is visible in both edit/preview, but most sensible in preview or with changes */}
            {(mode === 'preview' || hasUnsavedChanges) && (
              <button
                onClick={handleDeploy}
                className="group px-4 py-2 rounded-xl text-[11px] font-bold bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:bg-emerald-400 active:scale-95 transition-all cursor-pointer flex items-center gap-2"
              >
                <Rocket size={12} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                <span>Ship Changes</span>
              </button>
            )}
          </div>

          <div className="h-6 w-px bg-white/[0.08]" />

          {/* Right: Exit / Dashboard */}
          <button
            onClick={exitEditSession}
            className="p-2 text-white/40 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all cursor-pointer group"
            title="Exit God Mode"
          >
            <X size={16} className="group-hover:rotate-90 transition-transform" />
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
