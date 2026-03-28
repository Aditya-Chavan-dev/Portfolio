import { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { rtdb, db } from '@/common/lib/firebase'
import { Users, MousePointer2, Zap, Map as MapIcon, Unplug } from 'lucide-react'
import { motion } from 'framer-motion'

export default function HivePanel() {
  const [presence, setPresence] = useState<any>({})
  const [clicks, setClicks] = useState<any[]>([])

  useEffect(() => {
    const presenceRef = ref(rtdb, 'presence')
    const unsubPresence = onValue(presenceRef, (snap) => {
      setPresence(snap.val() || {})
    })

    const q = query(
      collection(db, 'admin_metrics/interactions/logs'),
      orderBy('ts', 'desc'),
      limit(50)
    )
    const unsubClicks = onSnapshot(q, (snap) => {
      setClicks(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }, (e) => console.error(e))

    return () => {
      unsubPresence()
      unsubClicks()
    }
  }, [])

  const activeCount = Object.keys(presence).length

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.05]">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-white tracking-tight font-serif">Active Users</h2>
          <p className="text-xs text-theme-muted flex items-center gap-2">
            <Users size={12} className="text-amber-500" />
            <span>Real-time presence tracking and human interaction mapping</span>
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">Quantum Sync</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Users Card */}
        <div className="bg-[#0D0D11]/40 backdrop-blur-xl border border-white/[0.05] rounded-[2rem] p-8 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Users size={60} className="text-amber-500" />
          </div>
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-500/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <h3 className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Active Users</h3>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-5xl font-bold text-white font-mono tracking-tighter transition-transform group-hover:scale-110 origin-left duration-500">{activeCount}</span>
            <span className="text-xs text-white/20 font-medium uppercase font-sans">Current Nodes</span>
          </div>
          <p className="text-[10px] text-emerald-500/80 font-bold uppercase tracking-widest flex items-center gap-2">
            <Zap size={10} fill="currentColor" /> Live Transmission Verified
          </p>
        </div>

        {/* Swarm Distribution */}
        <div className="bg-[#0D0D11]/40 backdrop-blur-xl border border-white/[0.05] rounded-[2rem] p-8 relative overflow-hidden group shadow-2xl">
          <h3 className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-6">User Distribution</h3>
          <div className="space-y-5">
             {Object.values(presence).length > 0 ? (
               Object.values(presence).slice(0, 3).map((p: any, i) => (
                 <div key={i} className="flex flex-col gap-2">
                   <div className="flex justify-between items-center text-[10px] font-mono">
                     <span className="text-white/40 truncate max-w-[150px]">{p.page || '/'}</span>
                     <span className="text-amber-500/60 font-bold uppercase">Active</span>
                   </div>
                   <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${60 + (i * 10)}%` }}
                       className="h-full bg-gradient-to-r from-amber-600 to-amber-400" 
                     />
                   </div>
                 </div>
               ))
             ) : (
               <div className="py-2 flex items-center gap-3 text-white/20 italic text-[11px]">
                 <Unplug size={14} />
                 <span>Quiet on the network...</span>
               </div>
             )}
          </div>
        </div>
      </div>

      {/* Interaction Table */}
      <div className="bg-[#0D0D11]/40 backdrop-blur-xl border border-white/[0.05] rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Interaction Trace Logs</h3>
          </div>
          <MapIcon size={14} className="text-white/20" />
        </div>
        <div className="max-h-[350px] overflow-y-auto no-scrollbar">
          <table className="w-full text-left text-[11px] font-mono border-collapse">
            <thead className="bg-[#1A1A22]/30 text-white/30 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="p-4 font-bold border-b border-white/[0.05]">ACTION</th>
                <th className="p-4 font-bold border-b border-white/[0.05]">TARGET AREA</th>
                <th className="p-4 font-bold border-b border-white/[0.05] text-right">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody>
              {clicks.map(click => (
                <tr key={click.id} className="border-b border-white/[0.03] hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-amber-500/30 transition-colors">
                        <MousePointer2 size={12} className="text-amber-500" />
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors uppercase">{click.type}</span>
                    </div>
                  </td>
                  <td className="p-4 text-white/40">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">
                      {click.target || click.route || 'Unknown'}
                    </span>
                  </td>
                  <td className="p-4 text-white/20 text-right">
                    {new Date(click.ts || 0).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
