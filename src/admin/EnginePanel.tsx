import { useState, useEffect } from 'react'
import { getEngineHealth } from './EngineService'
import type { EngineHealth } from './EngineService'
import { HardDrive, Activity, Star, AlertCircle, Cpu, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

export default function EnginePanel() {
  const [health, setHealth] = useState<EngineHealth | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEngineHealth().then(h => {
      setHealth(h)
      setLoading(false)
    })
  }, [])

  if (loading || !health) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.05]">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold text-white tracking-tight font-serif">System Health</h2>
          <p className="text-xs text-theme-muted flex items-center gap-2">
            <Cpu size={12} className="text-amber-500" />
            <span>Professional code integrity score based on GitHub repository metrics</span>
          </p>
        </div>
        <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">Kernel Stable</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0D0D11]/40 backdrop-blur-xl border border-white/[0.05] rounded-[2rem] p-8 col-span-2 relative overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
            <Activity size={80} className="text-amber-500" />
          </div>
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10">
            <h3 className="text-white/30 text-[10px] uppercase tracking-[0.2em] font-bold mb-8">Professional Integrity Score</h3>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-baseline gap-3">
                <span className="text-7xl font-bold text-white font-mono tracking-tighter transition-transform group-hover:scale-105 origin-left duration-700">{health.score}</span>
                <span className="text-xl text-white/20 font-bold">%</span>
              </div>
              <div className={`px-6 py-3 rounded-2xl border ${health.status === 'optimal' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 'bg-amber-500/10 border-amber-500/20 text-amber-500'} flex items-center gap-3`}>
                <Activity size={24} className={health.status === 'optimal' ? 'animate-pulse' : ''} />
                <span className="text-xs font-bold uppercase tracking-widest">{health.status}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-mono text-white/30 uppercase tracking-widest">
                <span>Refactoring Velocity</span>
                <span className="text-white/60">{health.metrics.velocity}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${health.metrics.velocity}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.3)]" 
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0D0D11]/40 backdrop-blur-xl border border-white/[0.05] rounded-[2rem] p-8 flex flex-col items-center justify-center text-center group shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <HardDrive size={64} className="text-amber-500/20 mb-6 group-hover:text-amber-500/40 transition-colors group-hover:scale-110 duration-500" />
          <h4 className="text-[10px] font-bold text-white/40 mb-2 uppercase tracking-[0.2em]">Resource Load</h4>
          <p className="text-white/60 text-xs font-mono uppercase tracking-widest">Optimized</p>
          <div className="mt-4 flex gap-1">
            {[1,2,3,4,5].map(i => (
              <div key={i} className={`w-1 h-3 rounded-full ${i <= 4 ? 'bg-emerald-500' : 'bg-white/10'}`} />
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         <div className="bg-[#0D0D11]/40 backdrop-blur-xl border border-white/[0.05] rounded-[1.5rem] p-6 flex items-center gap-4 group hover:bg-white/[0.02] transition-colors shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center group-hover:border-amber-500 transition-colors">
              <Star size={18} className="text-amber-500" />
            </div>
            <div>
              <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">Stargazers</p>
              <p className="text-xl font-bold text-white font-mono">{health.metrics.popularity}</p>
            </div>
         </div>
         <div className="bg-[#0D0D11]/40 backdrop-blur-xl border border-white/[0.05] rounded-[1.5rem] p-6 flex items-center gap-4 group hover:bg-white/[0.02] transition-colors shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:border-red-500 transition-colors">
              <AlertCircle size={18} className="text-red-500" />
            </div>
            <div>
              <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">Open Debt</p>
              <p className="text-xl font-bold text-white font-mono">{health.metrics.debt}</p>
            </div>
         </div>
         <div className="bg-[#0D0D11]/40 backdrop-blur-xl border border-white/[0.05] rounded-[1.5rem] p-6 flex items-center gap-4 group hover:bg-white/[0.02] transition-colors shadow-xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Zap size={18} className="text-emerald-500" />
            </div>
            <div>
              <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mb-1">Uptime</p>
              <p className="text-xl font-bold text-white font-mono">99.9%</p>
            </div>
         </div>
      </div>
    </div>
  )
}
