import { motion } from 'framer-motion';
import { Layout, Server, Terminal, Shield, Cpu, Activity, Zap } from 'lucide-react';
import { useTechStack } from '@/common/hooks/useTechStack';

import { LoadingSpinner } from '@/common/components/LoadingSpinner';

const ICON_MAP: Record<string, any> = {
  "Visual Architecture": Layout,
  "Core Engineering": Terminal,
  "System State": Server,
  "Ops & Scale": Shield
}

export function TechStack() {
  const { stack, loading } = useTechStack();

  if (loading && stack.length === 0) {
    return <LoadingSpinner label="INITIALIZING SIGNALS…" />;
  }

  return (
    <div className="flex flex-col gap-20">
      {/* ─── Header Section ───────────────────────────────────── */}
      <div className="flex flex-col gap-4 max-w-2xl">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 border border-amber-500/20">
               <Cpu size={16} />
            </div>
            <span className="text-[10px] font-mono tracking-[0.4em] text-white/30 uppercase">System_Arsenal</span>
         </div>
         <h2 className="text-5xl font-bold text-white tracking-tighter font-serif uppercase">Kernel Modules</h2>
         <p className="text-sm text-white/40 leading-relaxed italic">
           A technical breakdown of the architectural layers and specialized modules used in my high-fidelity deployments.
         </p>
      </div>

      {/* ─── Modernized Grid ─────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {stack.map((group, i) => {
          const Icon = ICON_MAP[group.category] || Terminal;
          return (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="bg-white/[0.015] border border-white/5 rounded-[2.5rem] p-10 flex flex-col gap-10 group hover:bg-white/[0.03] transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                   <div className="p-4 bg-amber-500/[0.05] rounded-2xl text-amber-500 border border-amber-500/10 shadow-[0_0_20px_rgba(245,158,11,0.1)] group-hover:shadow-[0_0_30px_rgba(245,158,11,0.2)] transition-all">
                      <Icon size={24} />
                   </div>
                   <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white tracking-tight uppercase font-serif">
                        {group.category}
                      </h3>
                      <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.2em]">Operational_Capacity: Optimized</p>
                   </div>
                </div>
                
                <div className="hidden sm:flex flex-col items-end gap-1.5 opacity-30 group-hover:opacity-100 transition-opacity">
                   <span className="text-[8px] font-mono tracking-widest text-white/40 uppercase">Load_Index</span>
                   <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(dot => (
                         <div key={dot} className={`w-3 h-1 rounded-full ${dot <= 4 ? 'bg-amber-500' : 'bg-white/10'}`} />
                      ))}
                   </div>
                </div>
              </div>

              {/* Tools Cluster */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {group.tools.map((tool, ti) => (
                  <motion.div 
                    key={tool}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2 + ti * 0.05 }}
                    className="relative px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl group/node hover:border-amber-500/30 transition-all cursor-default"
                  >
                    <div className="flex items-center justify-between gap-2 overflow-hidden">
                       <span className="text-[10px] font-bold text-white/60 group-hover/node:text-white transition-colors truncate">
                         {tool.toUpperCase()}
                       </span>
                       <Zap size={10} className="text-amber-500/20 group-hover/node:text-amber-500 transition-colors shrink-0" />
                    </div>
                    
                    {/* Tool Sub-Data (Hover) */}
                    <div className="absolute top-0 left-0 w-1 h-0 bg-amber-500 group-hover/node:h-full transition-all duration-300" />
                  </motion.div>
                ))}
              </div>

              {/* Statistics Footer */}
              <div className="mt-4 pt-4 border-t border-white/[0.03] flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <Activity size={10} className="text-emerald-500/40" />
                    <span className="text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">Cluster_Health: Stable</span>
                 </div>
                 <span className="text-[10px] font-black text-white/5 uppercase italic font-serif">A.CHAVAN_OS</span>
              </div>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
