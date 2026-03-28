import { useState, useEffect } from 'react'
import { ref, onValue } from 'firebase/database'
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore'
import { rtdb, db } from '@/common/lib/firebase'
import { Users, MousePointer2, Clock, Zap, Map as MapIcon } from 'lucide-react'

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
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#13111C] border border-[#2D2B3D] rounded-2xl p-8 flex items-center justify-between">
          <div>
            <h3 className="text-theme-muted text-[10px] uppercase tracking-widest font-bold mb-2">Live Swarm</h3>
            <p className="text-5xl font-bold text-white font-mono">{activeCount}</p>
            <p className="text-xs text-emerald-500 mt-2 flex items-center gap-1.5 font-bold">
              <Zap size={12} fill="currentColor" /> Active Nodes
            </p>
          </div>
          <Users size={64} className="text-amber-500/20" />
        </div>

        <div className="bg-[#13111C] border border-[#2D2B3D] rounded-2xl p-8">
          <h3 className="text-theme-muted text-[10px] uppercase tracking-widest font-bold mb-6">Swarm Distribution</h3>
          <div className="space-y-4">
             {Object.values(presence).slice(0, 3).map((p: any, i) => (
               <div key={i} className="flex items-center justify-between text-xs font-mono">
                 <span className="text-theme-muted truncate max-w-[150px]">{p.page || '/'}</span>
                 <div className="flex items-center gap-2">
                   <div className="h-1.5 w-24 bg-gray-800 rounded-full overflow-hidden">
                     <div className="h-full bg-amber-500" style={{ width: '60%' }} />
                   </div>
                   <span className="text-white">Active</span>
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="bg-[#0D0D11] border border-[#2D2B3D] rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-[#2D2B3D] flex justify-between items-center bg-black/20">
          <div className="flex items-center gap-2">
            <MapIcon size={16} className="text-amber-500" />
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-theme-muted">Trace Interactions</h3>
          </div>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full text-left text-[11px] font-mono">
            <thead className="bg-[#1A1A22] text-theme-muted">
              <tr>
                <th className="p-4">ACTION</th>
                <th className="p-4">TARGET</th>
                <th className="p-4">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody>
              {clicks.map(click => (
                <tr key={click.id} className="border-b border-white/[0.03] hover:bg-white/[0.02]">
                  <td className="p-4 flex items-center gap-2">
                    <MousePointer2 size={12} className="text-amber-500" />
                    <span>{click.type?.toUpperCase()}</span>
                  </td>
                  <td className="p-4 text-theme-muted">{click.target || click.route || 'Unknown'}</td>
                  <td className="p-4 text-theme-muted text-right italic opacity-50">
                    <Clock size={10} className="inline mr-1" />
                    {new Date(click.ts || 0).toLocaleTimeString()}
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



