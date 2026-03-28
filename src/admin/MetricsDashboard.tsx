import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { Activity, Clock, Zap, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MetricsDashboard() {
  const [metrics, setMetrics] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Single Source of Truth: Firebase Telemetry
    const realUnsub = onSnapshot(doc(db, 'admin_metrics', 'performance'), (snap) => {
      if (snap.exists()) {
        setMetrics(snap.data().calls || [])
      }
      setLoading(false)
    })
    return realUnsub
  }, [])

  if (loading) return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[1,2,3,4].map(i => (
        <div key={i} className="h-32 bg-white/5 rounded-[2rem] animate-pulse" />
      ))}
    </div>
  )

  const okCalls = metrics.filter(m => m.status === 'ok')
  const avgLatency = okCalls.length > 0 
    ? Math.round(okCalls.reduce((acc, m) => acc + m.latency, 0) / okCalls.length)
    : 0
  
  const errorCount = metrics.filter(m => m.status === 'error').length

  const stats = [
    { label: 'Latency', value: `${avgLatency}ms`, icon: Zap, color: 'text-amber-500', glow: 'shadow-[0_0_15px_rgba(245,158,11,0.2)]' },
    { label: 'Errors', value: errorCount, icon: AlertCircle, color: 'text-red-500', glow: 'shadow-[0_0_15px_rgba(239,68,68,0.2)]' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: 'text-emerald-500', glow: 'shadow-[0_0_15px_rgba(16,185,129,0.2)]' },
    { label: 'Active Ops', value: metrics.length, icon: Clock, color: 'text-blue-500', glow: 'shadow-[0_0_15px_rgba(59,130,246,0.2)]' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="bg-[#0D0D11]/40 backdrop-blur-xl border border-white/[0.05] p-8 rounded-[2rem] group hover:bg-white/[0.02] transition-all duration-500 relative overflow-hidden shadow-2xl"
          >
            <div className={`absolute -top-12 -right-12 w-24 h-24 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${stat.color} bg-current opacity-10`} />
            
            <div className="flex items-center gap-3 mb-6">
              <div className={`p-2.5 rounded-xl bg-white/5 ${stat.color} group-hover:scale-110 transition-transform duration-500`}>
                <Icon size={18} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/30">{stat.label}</span>
            </div>
            <p className="text-3xl font-bold text-white font-mono tracking-tighter">{stat.value}</p>
          </motion.div>
        )
      })}
    </div>
  )
}
