import { motion } from 'framer-motion';
import { useExperience } from '@/common/hooks/useExperience';
import { Briefcase, Calendar, ChevronRight, Activity, Terminal } from 'lucide-react';

import { LoadingSpinner } from '@/common/components/LoadingSpinner';

export function Experience() {
  const { experience, loading } = useExperience();

  if (loading && experience.length === 0) {
    return <LoadingSpinner label="SCANNING ARCHIVE…" />;
  }

  return (
    <div className="flex flex-col gap-20">
      {/* ─── Header Section ───────────────────────────────────── */}
      <div className="flex flex-col gap-4 max-w-2xl">
         <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 border border-amber-500/20">
               <Briefcase size={16} />
            </div>
            <span className="text-[10px] font-mono tracking-[0.4em] text-white/30 uppercase">Professional_History</span>
         </div>
         <h2 className="text-5xl font-bold text-white tracking-tighter font-serif uppercase">Experience Stream</h2>
         <p className="text-sm text-white/40 leading-relaxed italic">
           A chronological stream of senior engineering deployments and high-stake interface architecture.
         </p>
      </div>

      {/* ─── Modernized Timeline ──────────────────────────────── */}
      <div className="relative space-y-16 pl-12 border-l border-white/[0.05] ml-4">
        {experience.map((ex, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className="relative"
          >
            {/* Timeline Connector Dot */}
            <div className="absolute -left-[54px] top-4 w-2 h-2">
               <div className="absolute inset-0 bg-amber-500 rounded-full animate-ping opacity-20" />
               <div className="absolute inset-[3px] bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.8)]" />
            </div>

            {/* Event Module Card */}
            <div className="bg-white/[0.015] border border-white/5 rounded-[2.5rem] p-10 flex flex-col gap-8 group hover:bg-white/[0.03] transition-all hover:border-amber-500/10">
               
               {/* Metadata Header */}
               <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-1">
                     <div className="flex items-center gap-4">
                        <h3 className="text-3xl font-bold text-white tracking-tight uppercase font-serif group-hover:text-amber-500 transition-colors">
                          {ex.company}
                        </h3>
                        <div className="flex-1 w-20 h-px bg-white/5 group-hover:w-32 transition-all" />
                     </div>
                     <div className="flex items-center gap-3">
                        <Terminal size={12} className="text-white/20" />
                        <span className="text-xs font-bold text-white/60 tracking-wide">{ex.role}</span>
                     </div>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                     <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-xl border border-white/5 shadow-2xl">
                        <Calendar size={12} className="text-amber-500/50" />
                        <span className="text-[10px] font-mono font-bold text-white uppercase tracking-widest leading-none">
                          {ex.date}
                        </span>
                     </div>
                  </div>
               </div>

               {/* Achievement Stream */}
               <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 opacity-70 group-hover:opacity-100 transition-opacity">
                  {(ex.bullets || []).map((b, bi) => (
                    <motion.div 
                      key={bi}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: 0.3 + bi * 0.1 }}
                      className="flex gap-4 items-start"
                    >
                      <ChevronRight size={14} className="mt-1 text-amber-500 shrink-0" />
                      <p className="text-sm font-sans text-white/70 leading-relaxed italic">
                        "{b}"
                      </p>
                    </motion.div>
                  ))}
               </div>

               {/* Status Footnote */}
               <div className="flex items-center justify-between pt-4 border-t border-white/[0.03] mt-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 text-white/20">
                  <div className="flex items-center gap-4">
                     <span className="text-[8px] font-mono tracking-[0.4em] uppercase font-bold text-emerald-500/60">Deployment_Verified.OK</span>
                     <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                  </div>
                  <div className="flex items-center gap-2">
                     <Activity size={10} />
                     <span className="text-[8px] font-mono tracking-[0.3em] uppercase">Sector_0{i+1}_Analytic</span>
                  </div>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
