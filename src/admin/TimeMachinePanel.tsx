import { useState, useEffect } from 'react'
import { createSnapshot, getRecentSnapshots, restoreSnapshot } from './SnapshotService'
import type { Snapshot } from './SnapshotService'
import { History, Save, RotateCcw, Clock, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TimeMachinePanel() {
  const [history, setHistory] = useState<Snapshot[]>([])
  const [loading, setLoading] = useState(true)
  const [label, setLabel] = useState('')
  const [processing, setProcessing] = useState(false)

  const fetchHistory = async () => {
    try {
      const data = await getRecentSnapshots()
      setHistory(data)
    } catch (e) {
      console.error('Failed to fetch snapshots:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [])

  const handleCreate = async () => {
    if (!label.trim()) return
    setProcessing(true)
    try {
      await createSnapshot(label)
      setLabel('')
      await fetchHistory()
    } catch (e: any) {
      alert(`Snapshot failed: ${e.message}`)
    } finally {
      setProcessing(false)
    }
  }

  const handleRestore = async (id: string) => {
    if (!window.confirm('WARNING: This will overwrite ALL current landing page configurations. Proceed?')) return
    setProcessing(true)
    try {
      await restoreSnapshot(id)
      alert('System configuration restored successfully. Page refresh recommended.')
    } catch (e: any) {
      alert(`Restoration failed: ${e.message}`)
    } finally {
      setProcessing(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
          <p className="text-theme-muted font-mono text-xs animate-pulse uppercase tracking-widest">Opening Chrono-Vortex...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Control Header */}
      <div className="bg-[#13111C] border border-[#2D2B3D] p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-5">
           <History size={160} className="text-purple-500" />
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-500/10 text-purple-400 rounded-lg">
              <History size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight font-serif">Time Machine</h2>
          </div>
          <p className="text-sm text-theme-muted max-w-xl mb-8 leading-relaxed">
            Record point-in-time snapshots of your entire portfolio configuration. 
            Rollback to any previous state if a deployment causes visual or functional issues.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 max-w-md">
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Snapshot Label (e.g. Pre-v2 Deploy)"
              className="flex-1 bg-black/40 border border-[#2D2B3D] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button
              onClick={handleCreate}
              disabled={processing || !label.trim()}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-bold transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-purple-600/20 whitespace-nowrap"
            >
              <Save size={16} />
              {processing ? 'Processing...' : 'Take Snapshot'}
            </button>
          </div>
        </div>
      </div>

      {/* Snapshot List */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-2 px-2">
           <Clock size={16} className="text-theme-muted" />
           <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-theme-muted">Historical Snapshots</h3>
        </div>
        
        <div className="flex flex-col gap-4">
          <AnimatePresence>
            {history.map((snap, i) => {
              const dateObj = snap.timestamp?.toDate ? snap.timestamp.toDate() : (snap.timestamp ? new Date(snap.timestamp) : new Date())
              
              return (
                <motion.div
                  key={snap.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-[#0D0D11] border border-[#2D2B3D] p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between group hover:border-[#3D3A5D] transition-all gap-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-theme-muted group-hover:text-purple-400 transition-colors shrink-0">
                      <Clock size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-gray-200">{snap.label}</h4>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <span className="text-[10px] text-theme-muted font-mono bg-white/5 px-2 py-0.5 rounded uppercase">{snap.id}</span>
                        <span className="text-[10px] text-theme-muted">{dateObj.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                     <button
                       onClick={() => handleRestore(snap.id)}
                       disabled={processing}
                       className="p-2.5 rounded-xl text-theme-muted hover:text-amber-500 hover:bg-amber-500/10 transition-all cursor-pointer group/btn flex items-center gap-2"
                       title="Restore this version"
                     >
                       <RotateCcw size={18} className="group-hover/btn:-rotate-45 transition-transform" />
                       <span className="text-[10px] font-bold uppercase tracking-wider">Restore</span>
                     </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {history.length === 0 && (
          <div className="py-20 text-center border-2 border-dashed border-[#2D2B3D] rounded-3xl opacity-50 flex flex-col items-center">
            <AlertTriangle size={32} className="text-amber-500 mb-4 opacity-40" />
            <p className="text-theme-muted font-serif italic text-sm">No snapshots exist in the chronosphere yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}



