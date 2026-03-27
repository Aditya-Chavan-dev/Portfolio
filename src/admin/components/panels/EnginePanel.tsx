import { useState, useEffect } from 'react'
import { getEngineHealth } from '../../services/EngineService'
import type { EngineHealth } from '../../services/EngineService'
import { HardDrive, Activity, Star, AlertCircle } from 'lucide-react'

export default function EnginePanel() {
  const [health, setHealth] = useState<EngineHealth | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getEngineHealth().then(h => {
      setHealth(h)
      setLoading(false)
    })
  }, [])

  if (loading || !health) return null

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#13111C] border border-[#2D2B3D] rounded-2xl p-8 col-span-2">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-theme-muted text-[10px] uppercase tracking-widest font-bold mb-2">Engine Integrity</h3>
                <p className="text-5xl font-bold text-white font-mono">{health.score}%</p>
              </div>
              <div className={`p-4 rounded-2xl ${health.status === 'optimal' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                <Activity size={32} />
              </div>
            </div>
            
            <div className="space-y-6">
               <div className="space-y-2">
                 <div className="flex justify-between text-[10px] font-mono text-theme-muted uppercase">
                   <span>Velocity</span>
                   <span>{health.metrics.velocity}%</span>
                 </div>
                 <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                   <div className="h-full bg-amber-500" style={{ width: `${health.metrics.velocity}%` }} />
                 </div>
               </div>
            </div>
        </div>

        <div className="bg-[#13111C] border border-[#2D2B3D] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <HardDrive size={48} className="text-amber-500/20 mb-4" />
          <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-widest">Resource Load</h4>
          <p className="text-theme-muted text-[10px] font-mono uppercase">Optimized via Global Edge</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
         <div className="bg-[#0D0D11] border border-[#2D2B3D] p-4 rounded-xl flex items-center gap-3">
            <Star size={16} className="text-amber-500" />
            <div>
              <p className="text-[10px] text-theme-muted uppercase font-bold">Stargazers</p>
              <p className="text-lg font-bold text-white font-mono">{health.metrics.popularity}</p>
            </div>
         </div>
         <div className="bg-[#0D0D11] border border-[#2D2B3D] p-4 rounded-xl flex items-center gap-3">
            <AlertCircle size={16} className="text-amber-500" />
            <div>
              <p className="text-[10px] text-theme-muted uppercase font-bold">Open Debt</p>
              <p className="text-lg font-bold text-white font-mono">{health.metrics.debt}</p>
            </div>
         </div>
      </div>
    </div>
  )
}
