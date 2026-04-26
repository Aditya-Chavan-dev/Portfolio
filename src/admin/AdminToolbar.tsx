import { useState } from 'react'
import { useEditMode } from './EditModeContext'
import { Sparkles, Eye, Save, X, Terminal, ChevronRight } from 'lucide-react'
import DeployModal from './DeployModal'
import { motion, AnimatePresence } from 'framer-motion'

export default function AdminToolbar() {
  const { mode, setMode, hasUnsavedChanges, exitEditSession, draftData } = useEditMode()
  const [isDeployOpen, setIsDeployOpen] = useState(false)

  if (mode === 'idle') return null

  const editCount = Object.keys(draftData).length

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center">
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-2 flex items-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          {/* Status Branding */}
          <div className="flex items-center gap-3 border-r border-white/10 pr-4">
             <div className="relative">
                <Terminal size={14} className="text-amber-500" />
                <motion.div 
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-amber-500 rounded-full" 
                />
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50">
               God Mode
             </span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode('edit')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                mode === 'edit' ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'text-white/40 hover:text-white'
              }`}
            >
              <Sparkles size={12} />
              Editor
            </button>
            <button
              onClick={() => setMode('preview')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${
                mode === 'preview' ? 'bg-indigo-500 text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]' : 'text-white/40 hover:text-white'
              }`}
            >
              <Eye size={12} />
              Preview
            </button>
            
            <div className="w-px h-4 bg-white/10 mx-2" />

            <button
              onClick={() => setIsDeployOpen(true)}
              disabled={!hasUnsavedChanges}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                hasUnsavedChanges 
                  ? 'bg-emerald-500 text-white hover:bg-emerald-400 cursor-pointer animate-pulse' 
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
              }`}
            >
              <Save size={12} />
              Deploy {editCount > 0 && `(${editCount})`}
            </button>
          </div>

          {/* Exit */}
          <div className="border-l border-white/10 pl-4">
            <button
              onClick={exitEditSession}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-[10px] font-bold text-red-400 hover:bg-red-400/10 transition-all cursor-pointer"
            >
              <X size={12} />
              Discard
            </button>
          </div>
        </motion.div>

        {/* Change Indicator Toast */}
        <AnimatePresence>
          {hasUnsavedChanges && (
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 20, opacity: 0 }}
              className="absolute left-[calc(100%+12px)] whitespace-nowrap bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-2"
            >
              <p className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
                Memory Buffered <ChevronRight size={10} />
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <DeployModal 
        isOpen={isDeployOpen} 
        onClose={() => setIsDeployOpen(false)} 
        onSuccess={() => setMode('idle')}
      />
    </>
  )
}
