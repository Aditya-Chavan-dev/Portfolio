import { useState, useEffect } from 'react'
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { ShieldCheck, UserCheck, Monitor, Globe } from 'lucide-react'

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

  if (loading) return null

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#13111C] border border-[#2D2B3D] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-emerald-500" size={20} />
            <h3 className="text-xs font-bold text-white uppercase tracking-widest">Active Guardians</h3>
          </div>
          <p className="text-3xl font-bold text-white font-mono">{sessions.length}</p>
        </div>
      </div>

      <div className="bg-[#0D0D11] border border-[#2D2B3D] rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-[#2D2B3D] bg-black/40">
          <h3 className="text-[10px] uppercase tracking-widest font-bold text-theme-muted">Administrative Access Logs</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px] font-mono">
            <thead className="bg-[#1A1A22] text-theme-muted">
              <tr>
                <th className="p-4 border-b border-[#2D2B3D]">OPERATOR</th>
                <th className="p-4 border-b border-[#2D2B3D]">LAST SEEN</th>
                <th className="p-4 border-b border-[#2D2B3D]">SYSTEM</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map(session => (
                <tr key={session.id} className="border-b border-[#2D2B3D]/50 hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <UserCheck size={14} className="text-amber-500" />
                      <span>{session.email}</span>
                    </div>
                  </td>
                  <td className="p-4 text-theme-muted">
                    {session.lastSeen?.toDate().toLocaleString()}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-4 text-theme-muted">
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



