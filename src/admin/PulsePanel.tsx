import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { Activity, Zap, AlertCircle, Clock, Copy } from 'lucide-react'
import { useToastContext } from '@/common/shared/Toast'
import { motion } from 'framer-motion'

export default function PulsePanel() {
  const [metrics, setMetrics] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const { addToast } = useToastContext()

  const handleCopy = (log: any) => {
    const text = `[${new Date(log.ts).toLocaleString()}] ${log.label} | ${log.status.toUpperCase()} | ${log.latency}ms`
    navigator.clipboard.writeText(text)
    addToast('Copied to clipboard', 'info')
  }

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'admin_metrics', 'performance'), (snap) => {
      if (snap.exists()) {
        setMetrics(snap.data().calls || [])
      }
      setLoading(false)
    })
    return unsub
  }, [])

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
          <p className="text-theme-muted font-mono text-xs animate-pulse uppercase tracking-widest">Awaiting Neural Link...</p>
        </div>
      </div>
    )
  }

  const okCalls = metrics.filter(m => m.status === 'ok')
  const avgLatency = okCalls.length > 0 
    ? Math.round(okCalls.reduce((acc, m) => acc + m.latency, 0) / okCalls.length)
    : 0
  
  const errorCount = metrics.filter(m => m.status === 'error').length
  const errorRate = metrics.length > 0 
    ? Math.round((errorCount / metrics.length) * 100)
    : 0

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.05]">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-white tracking-tight font-serif">Performance Monitoring</h2>
          <p className="text-xs text-theme-muted flex items-center gap-2">
            <Activity size={12} className="text-amber-500" />
            <span>Real-time telemetry from Firestore & Network Layer</span>
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">Live Sync</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0D0D11]/40 backdrop-blur-xl border border-white/[0.05] rounded-[2rem] p-8 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap size={60} className="text-amber-500" />
          </div>
          <div className="absolute -top-12 -right-12 w-24 h-24 bg-amber-500/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Avg Latency</h3>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="text-5xl font-bold text-white font-mono tracking-tighter transition-transform group-hover:scale-110 origin-left duration-500">{avgLatency}</span>
            <span className="text-xs text-white/20 font-medium uppercase">ms</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (avgLatency / 1000) * 100)}%` }}
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400" 
            />
          </div>
        </div>

        <div className="bg-[#0D0D11]/40 backdrop-blur-xl border border-white/[0.05] rounded-[2rem] p-8 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <AlertCircle size={60} className={errorRate > 5 ? 'text-red-500' : 'text-emerald-500'} />
          </div>
          <div className={`absolute -top-12 -right-12 w-24 h-24 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity ${errorRate > 5 ? 'bg-red-500/10' : 'bg-emerald-500/10'}`} />
          <h3 className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Error Rate</h3>
          <div className="flex items-baseline gap-2 mb-6">
            <span className={`text-5xl font-bold font-mono tracking-tighter transition-transform group-hover:scale-110 origin-left duration-500 ${errorRate > 5 ? 'text-red-500' : 'text-emerald-500'}`}>{errorRate}%</span>
            <span className="text-xs text-white/20 font-medium uppercase">({errorCount} Fail)</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${errorRate}%` }}
              className={`h-full bg-gradient-to-r ${errorRate > 5 ? 'from-red-600 to-red-400' : 'from-emerald-600 to-emerald-400'}`} 
            />
          </div>
        </div>

        <div className="bg-[#0D0D11]/40 backdrop-blur-xl border border-white/[0.05] rounded-[2rem] p-8 flex flex-col justify-between shadow-2xl relative group overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
            <Activity size={60} className="text-blue-500" />
          </div>
          <div>
            <h3 className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-6">Neural Pulse</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className={`w-3 h-3 rounded-full ${errorRate > 10 ? 'bg-red-500' : 'bg-emerald-500'}`} />
                <div className={`absolute inset-0 w-3 h-3 rounded-full animate-ping opacity-75 ${errorRate > 10 ? 'bg-red-500' : 'bg-emerald-500'}`} />
              </div>
              <span className={`text-sm font-semibold tracking-wide ${errorRate > 10 ? 'text-red-400' : 'text-emerald-400'}`}>
                {errorRate > 10 ? 'Degraded Performance' : 'System Nominal'}
              </span>
            </div>
          </div>
          <div className="mt-6 flex justify-between text-[10px] text-white/30 font-mono">
            <span>{metrics.length} events logged</span>
            <Activity size={14} className={metrics.length > 0 ? 'animate-pulse text-amber-500' : ''} />
          </div>
        </div>
      </div>

      <div className="bg-[#0D0D11]/40 backdrop-blur-xl border border-white/[0.05] rounded-[2rem] overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-white/[0.05] flex justify-between items-center bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40">Real-time Telemetry</h3>
          </div>
          <Clock size={14} className="text-white/20" />
        </div>
        <div className="max-h-[350px] overflow-y-auto no-scrollbar">
          <table className="w-full text-left text-[11px] font-mono border-collapse">
            <thead className="bg-[#1A1A22]/30 text-white/30 sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="p-4 font-bold border-b border-white/[0.05]">EVENT</th>
                <th className="p-4 font-bold border-b border-white/[0.05]">LATENCY</th>
                <th className="p-4 font-bold border-b border-white/[0.05]">STATUS</th>
                <th className="p-4 font-bold border-b border-white/[0.05]">TIMESTAMP</th>
                <th className="p-4 font-bold border-b border-white/[0.05] text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {metrics.slice().reverse().map((m, i) => (
                <tr key={i} className="border-b border-white/[0.03] hover:bg-white/5 transition-colors group">
                  <td className="p-4 text-gray-300 group-hover:text-amber-400 transition-colors">{m.label}</td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded ${
                      m.latency > 1000 ? 'bg-red-500/10 text-red-400' : 
                      m.latency > 400 ? 'bg-amber-500/10 text-amber-400' : 
                      'bg-emerald-500/10 text-emerald-400'
                    }`}>
                      {m.latency}ms
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`flex items-center gap-1.5 ${m.status === 'error' ? 'text-red-500' : 'text-emerald-500'}`}>
                      <div className={`w-1 h-1 rounded-full ${m.status === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`} />
                      {m.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="p-4 text-white/20">
                    {new Date(m.ts).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleCopy(m)}
                      className="p-1.5 rounded-lg text-white/20 hover:text-amber-500 hover:bg-amber-500/10 transition-all cursor-pointer"
                    >
                      <Copy size={12} />
                    </button>
                  </td>
                </tr>
              ))}
              {metrics.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-12 text-center text-white/20 italic">
                    No tracing data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
