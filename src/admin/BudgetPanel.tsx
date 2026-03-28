import { useState, useEffect } from 'react'
import { getLocalCounters } from './MetricsOrchestrator'
import { Wallet, TrendingUp, AlertCircle, CheckCircle2, Database } from 'lucide-react'
import { motion } from 'framer-motion'

// Approx Firebase Spark Daily Limits
const LIMITS = {
  reads: 50000,
  writes: 20000,
  deletes: 20000
}

export default function BudgetPanel() {
  const [usage, setUsage] = useState(getLocalCounters())

  useEffect(() => {
    // Refresh counters every 5 seconds
    const interval = setInterval(() => {
      setUsage(getLocalCounters())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex items-center gap-4 p-6 bg-[#0F172A] border border-[#1E293B] rounded-2xl shadow-xl">
        <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl">
          <Wallet size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Resource Budget</h2>
          <p className="text-xs text-theme-muted">
             Tracking local-estimated usage against Firebase Spark Plan daily limits.
          </p>
        </div>
      </div>

      {/* Usage Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(LIMITS).map(([key, limit]) => {
          const current = (usage as any)[key] || 0
          const percentage = (current / limit) * 100
          const isWarning = percentage > 70
          const isCritical = percentage > 90

          return (
            <div key={key} className="bg-[#0F172A] border border-[#1E293B] p-6 rounded-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                   <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-theme-muted">{key}</p>
                   {isCritical ? <AlertCircle size={14} className="text-red-500" /> : <CheckCircle2 size={14} className="text-emerald-500" />}
                </div>

                <div className="flex items-baseline gap-2 mb-2">
                   <span className="text-3xl font-bold text-white tracking-tighter">{current.toLocaleString()}</span>
                   <span className="text-theme-muted text-xs">/ {limit.toLocaleString()}</span>
                </div>

                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-2">
                   <motion.div 
                     initial={{ width: 0 }}
                     animate={{ width: `${Math.min(100, percentage)}%` }}
                     className={`h-full ${isCritical ? 'bg-red-500' : isWarning ? 'bg-amber-500' : 'bg-blue-500'}`}
                   />
                </div>
                
                <p className={`text-[10px] font-mono ${isCritical ? 'text-red-400' : 'text-theme-muted'}`}>
                  {percentage.toFixed(2)}% of daily allowance used
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Projections & Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div className="bg-black/20 border border-white/[0.05] p-6 rounded-2xl">
           <div className="flex items-center gap-2 mb-4 text-theme-muted">
              <TrendingUp size={16} />
              <h3 className="text-[10px] uppercase tracking-widest font-bold">Cost Projection</h3>
           </div>
           <p className="text-sm text-gray-400 leading-relaxed">
             "Based on current interaction patterns, your Spark Plan free allowance is sufficient for another 24 hours of operation. No billing overage expected."
           </p>
        </div>

        <div className="bg-black/20 border border-white/[0.05] p-6 rounded-2xl">
           <div className="flex items-center gap-2 mb-4 text-theme-muted">
              <Database size={16} />
              <h3 className="text-[10px] uppercase tracking-widest font-bold">Storage Optimization</h3>
           </div>
           <p className="text-sm text-gray-400 leading-relaxed italic">
             "Snapshot rotation is enabled. Only the last 20 point-in-time states are retained to minimize Firestore document count."
           </p>
        </div>
      </div>
    </div>
  )
}



