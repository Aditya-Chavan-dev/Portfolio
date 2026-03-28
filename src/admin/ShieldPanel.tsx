import { useState, useEffect } from 'react'
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { ShieldCheck, UserCheck, Monitor, Globe, Shield } from 'lucide-react'

export default function ShieldPanel() {
  const [sessions, setSessions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = query(
      collection(db, 'admin_sessions'),
      orderBy('lastSeen', 'desc'),
      limit(20)
    )

    const unsub = onSnapshot(q, (snap) => {
      setSessions(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
      setLoading(false)
    })
    return unsub
  }, [])

  if (loading) return (
    <div className="p-8 flex items-center justify-center min-h-[400px]">
      <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.05]">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-white tracking-tight font-serif">Security & Access</h2>
          <p className="text-xs text-theme-muted flex items-center gap-2">
            <Shield size={12} className="text-amber-500" />
            <span>Monitoring administrative session integrity and operator access logs</span>
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">Shield Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Active Guardians Card */}
        <div className="bg-[#0D0D11]/40 backdrop-blur-xl border border-white/[0.05] rounded-[2rem] p-8 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <ShieldCheck size={60} className="text-emerald-500" />
          </div>
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-emerald-500/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <h3 className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Active Guardians</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-bold text-white font-mono tracking-tighter transition-transform group-hover:scale-110 origin-left duration-500">{sessions.length}</span>
            <span className="text-xs text-white/20 font-medium uppercase font-sans">Active Sessions</span>
          </div>
        </div>
      </div>

      {/* Access Logs Table */}
      <div className="bg-[#0D0D11]/40 backdrop-blur-xl border border-white/[0.05] rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Administrative Access Logs</h3>
          </div>
          <ShieldCheck size={14} className="text-white/20" />
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-[11px] font-mono border-collapse">
            <thead className="bg-[#1A1A22]/30 text-white/30 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="p-4 font-bold border-b border-white/[0.05]">OPERATOR</th>
                <th className="p-4 font-bold border-b border-white/[0.05]">LAST SEEN</th>
                <th className="p-4 font-bold border-b border-white/[0.05]">SYSTEM</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(session => (
                <tr key={session.id} className="border-b border-white/[0.03] hover:bg-white/5 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-amber-500/30 transition-colors">
                        <UserCheck size={14} className="text-amber-500" />
                      </div>
                      <span className="text-gray-300 group-hover:text-white transition-colors">{session.email}</span>
                    </div>
                  </td>
                  <td className="p-4 text-white/20">
                    {session.lastSeen?.toDate().toLocaleString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-4 text-white/20 group-hover:text-white/40 transition-colors">
                      <Monitor size={14} />
                      <Globe size={14} />
                    </div>
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
