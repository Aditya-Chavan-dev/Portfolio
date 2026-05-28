import { motion } from 'framer-motion';
import { Github, ExternalLink, Shield, Activity } from 'lucide-react';
import { useProjects } from '@/common/hooks/useProjects';

import { LoadingSpinner } from '@/common/components/LoadingSpinner';

export function Projects() {
  const { featuredProjects, archivedProjects, loading } = useProjects();

  if (loading && featuredProjects.length === 0) {
    return <LoadingSpinner label="INITIALIZING DATABASE…" />;
  }

  return (
    <div className="flex flex-col gap-20">
      {/* ─── Header Section ───────────────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4 max-w-xl">
           <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 border border-amber-500/20">
                 <Shield size={16} />
              </div>
              <span className="text-[10px] font-mono tracking-[0.4em] text-white/30 uppercase">Primary_Deployments</span>
           </div>
           <h2 className="text-5xl font-bold text-white tracking-tighter font-serif uppercase">Featured Works</h2>
           <p className="text-sm text-white/40 leading-relaxed max-w-md">
             A surgical collection of high-performance architectural deployments and interactive system designs.
           </p>
        </div>
        
        <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] opacity-40">
           <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live_Nodes: 0{featuredProjects.length}
           </div>
        </div>
      </div>

      {/* ─── Projects Grid ────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {featuredProjects.map((p, i) => (
          <motion.article
            key={p.id || i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
            className="group relative flex flex-col gap-6"
          >
            {/* High-Ref Card Frame */}
            <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-white/5 bg-white/[0.02] shadow-2xl transition-all duration-700 group-hover:border-amber-500/20">
              
              {/* Corner Metadata Notch */}
              <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-20">
                 <div className="bg-amber-500 text-[#050507] px-3 py-1.5 rounded-xl text-[8px] font-black uppercase tracking-widest flex items-center gap-2">
                    <Activity size={10} />
                    Active_Thread
                 </div>
              </div>

              {/* Technical Overlay Graphics */}
              <div className="absolute inset-0 z-10 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-700">
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,white_0%,transparent_70%)]" />
                 <div className="absolute inset-0 border-[20px] border-white/10" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 20%, 95% 25%, 95% 100%, 0 100%)' }} />
              </div>

              {/* Image with CRT Effect */}
              <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0">
                <img 
                  src={p.image} 
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050507]/80 via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Content Module */}
            <div className="px-2 space-y-4">
               <div className="flex items-center gap-4">
                  <div className="w-8 h-px bg-amber-500/20" />
                  <h3 className="text-2xl font-bold text-white tracking-tight font-serif uppercase group-hover:text-amber-500 transition-colors">
                    {p.title}
                  </h3>
               </div>
               
               <p className="text-sm text-white/50 leading-relaxed font-sans max-w-lg italic">
                 "{p.description}"
               </p>

               <div className="flex flex-wrap gap-2 pt-2">
                 {(p.tags || []).map(tag => (
                   <span key={tag} className="px-3 py-1.5 bg-white/[0.03] text-white/40 text-[9px] font-mono font-bold uppercase tracking-[0.2em] rounded-lg border border-white/5 group-hover:border-white/10 transition-colors">
                     {tag}
                   </span>
                 ))}
               </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* ─── Archive Section ──────────────────────────────────── */}
      {(archivedProjects || []).length > 0 && (
        <div className="mt-20 pt-20 border-t border-white/[0.05] relative overflow-hidden">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
              <div className="flex flex-col gap-1">
                 <h3 className="text-lg font-bold text-white tracking-widest font-serif uppercase">Legacy Archive</h3>
                 <p className="text-[10px] text-white/20 font-mono tracking-[0.3em] uppercase">Historical_Deployments // Prototypes</p>
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(archivedProjects || []).map((p, i) => (
                <motion.div
                  key={p.id || i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="p-6 bg-white/[0.015] border border-white/5 rounded-2xl flex flex-col gap-4 group hover:bg-white/[0.03] transition-all"
                >
                  <div className="flex justify-between items-start">
                     <span className="text-[9px] font-mono text-amber-500/40 uppercase tracking-widest">OBJ_0{i+1}</span>
                     <div className="flex gap-3">
                        {p.repoUrl && <a href={p.repoUrl} target="_blank" className="text-white/20 hover:text-white transition-colors"><Github size={14} /></a>}
                        {p.liveUrl && <a href={p.liveUrl} target="_blank" className="text-white/20 hover:text-white transition-colors"><ExternalLink size={14} /></a>}
                     </div>
                  </div>
                  
                  <h4 className="text-md font-bold text-white/80 group-hover:text-white transition-colors font-serif">{p.title}</h4>
                  <p className="text-[11px] text-white/30 leading-relaxed line-clamp-2 italic font-mono uppercase tracking-tighter">
                    {p.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
