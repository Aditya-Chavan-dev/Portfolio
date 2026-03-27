import { useState, useEffect } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '@/shared/firebase'
import { Activity, Zap, AlertCircle, Clock } from 'lucide-react'
import { tracedCall } from '../../services/MetricsOrchestrator'

export default function PulsePanel() {
  const [metrics, setMetrics] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

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

  // Calculate averages
  const okCalls = metrics.filter(m => m.status === 'ok')
  const avgLatency = okCalls.length > 0 
    ? Math.round(okCalls.reduce((acc, m) => acc + m.latency, 0) / okCalls.length)
    : 0
  
  const errorCount = metrics.filter(m => m.status === 'error').length
  const errorRate = metrics.length > 0 
    ? Math.round((errorCount / metrics.length) * 100)
    : 0

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Latency Card */}
        <div className="bg-[#13111C] border border-[#2D2B3D] rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <Zap size={40} className="text-amber-400" />
          </div>
          <h3 className="text-theme-muted text-[10px] uppercase tracking-widest font-bold mb-4">Avg Latency</h3>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white font-mono">{avgLatency}</span>
            <span className="text-xs text-theme-muted">ms</span>
          </div>
          <div className="mt-4 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-500 transition-all duration-1000" 
              style={{ width: `${Math.min(100, (avgLatency / 1000) * 100)}%` }}
            />
          </div>
        </div>

        {/* Error Rate Card */}
        <div className="bg-[#13111C] border border-[#2D2B3D] rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
            <AlertCircle size={40} className={errorRate > 5 ? 'text-red-500' : 'text-emerald-500'} />
          </div>
          <h3 className="text-theme-muted text-[10px] uppercase tracking-widest font-bold mb-4">Error Rate</h3>
          <div className="flex items-baseline gap-2">
            <span className={`text-4xl font-bold font-mono ${errorRate > 5 ? 'text-red-500' : 'text-emerald-500'}`}>{errorRate}%</span>
            <span className="text-xs text-theme-muted">({errorCount} errors)</span>
          </div>
          <div className="mt-4 h-1 w-full bg-gray-800 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${errorRate > 5 ? 'bg-red-500' : 'bg-emerald-500'}`} 
              style={{ width: `${errorRate}%` }}
            />
          </div>
        </div>

        {/* Neural Pulse (Status) */}
        <div className="bg-[#13111C] border border-[#2D2B3D] rounded-2xl p-6 flex flex-col justify-between">
          <h3 className="text-theme-muted text-[10px] uppercase tracking-widest font-bold mb-4">Neural Pulse</h3>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className={`w-3 h-3 rounded-full ${errorRate > 10 ? 'bg-red-500' : 'bg-emerald-500'}`} />
              <div className={`absolute inset-0 w-3 h-3 rounded-full animate-ping opacity-75 ${errorRate > 10 ? 'bg-red-500' : 'bg-emerald-500'}`} />
            </div>
            <span className={`text-sm font-semibold ${errorRate > 10 ? 'text-red-400' : 'text-emerald-400'}`}>
              {errorRate > 10 ? 'Degraded Performance' : 'System Nominal'}
            </span>
          </div>
          <div className="mt-6 flex justify-between text-[10px] text-theme-muted font-mono">
            <span>{metrics.length} events logged</span>
            <Activity size={14} className={metrics.length > 0 ? 'animate-pulse text-amber-500' : ''} />
          </div>
        </div>
      </div>

      {/* Latency Log Table */}
      <div className="bg-[#0D0D11] border border-[#2D2B3D] rounded-2xl overflow-hidden shadow-2xl">
        <div className="p-4 border-b border-[#2D2B3D] flex justify-between items-center bg-black/40">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <h3 className="text-[10px] uppercase tracking-widest font-bold text-theme-muted">Real-time Performance Log</h3>
          </div>
          <Clock size={14} className="text-theme-muted" />
        </div>
        <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
          <table className="w-full text-left text-[11px] font-mono border-collapse">
            <thead className="bg-[#1A1A22] text-theme-muted sticky top-0 z-10">
              <tr>
                <th className="p-4 font-bold border-b border-[#2D2B3D]">EVENT</th>
                <th className="p-4 font-bold border-b border-[#2D2B3D]">LATENCY</th>
                <th className="p-4 font-bold border-b border-[#2D2B3D]">STATUS</th>
                <th className="p-4 font-bold border-b border-[#2D2B3D] text-right">TIMESTAMP</th>
              </tr>
            </thead>
            <tbody>
              {metrics.slice().reverse().map((m, i) => (
                <tr key={i} className="border-b border-[#2D2B3D]/50 hover:bg-white/5 transition-colors group">
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
                  <td className="p-4 text-theme-muted text-right opacity-60">
                    {new Date(m.ts).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </td>
                </tr>
              ))}
              {metrics.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-theme-muted italic opacity-50">
                    No tracing data available. Start navigating the application to generate telemetry.
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
