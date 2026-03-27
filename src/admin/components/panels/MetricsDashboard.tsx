import { useState, useEffect } from 'react'
import { getLocalCounters } from '../../services/MetricsOrchestrator'
import { Activity, Clock, Zap, AlertCircle } from 'lucide-react'

export default function MetricsDashboard() {
  const [counters, setCounters] = useState<any>(null)

  useEffect(() => {
    getLocalCounters().then(setCounters)
    const interval = setInterval(() => getLocalCounters().then(setCounters), 10000)
    return () => clearInterval(interval)
  }, [])

  if (!counters) return null

  const stats = [
    { label: 'Latency', value: `${counters.latency}ms`, icon: Zap, color: 'text-amber-500' },
    { label: 'Errors', value: counters.errors, icon: AlertCircle, color: 'text-red-500' },
    { label: 'Uptime', value: '99.9%', icon: Activity, color: 'text-emerald-500' },
    { label: 'Active', value: counters.calls, icon: Clock, color: 'text-blue-500' },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <div key={i} className="bg-[#13111C] border border-[#2D2B3D] p-5 rounded-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <Icon size={16} />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-bold text-theme-muted">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-white font-mono">{stat.value}</p>
          </div>
        )
      })}
    </div>
  )
}
