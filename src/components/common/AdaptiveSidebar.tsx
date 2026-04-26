import { motion } from 'framer-motion';
import { NavLink, useNavigate } from 'react-router-dom';
import { Terminal, Layers, Briefcase, Cpu, Award, User, ChevronRight, Activity } from 'lucide-react';

const navItems = [
  { label: 'PROJECTS', path: '/hub/projects', icon: Layers, note: 'Archived_Signals' },
  { label: 'EXPERIENCE', path: '/hub/experience', icon: Briefcase, note: 'Time_Series' },
  { label: 'STACK', path: '/hub/stack', icon: Cpu, note: 'Kernel_Modules' },
  { label: 'CERTS', path: '/hub/certifications', icon: Award, note: 'Verified_Keys' },
  { label: 'ABOUT', path: '/hub/about', icon: User, note: 'Identity_Blob' },
];

export function AdaptiveSidebar() {
  const navigate = useNavigate();

  return (
    <aside className="w-[320px] h-full bg-[#08080A] border-r border-white/[0.05] flex flex-col relative z-20">
      {/* 1. Header Metadata */}
      <div className="p-8 pb-4">
        <button 
          onClick={() => navigate('/hub')}
          className="flex items-center gap-3 text-white/40 hover:text-amber-500 transition-all duration-500 group"
        >
          <div className="p-1.5 bg-white/5 rounded-md border border-white/5 group-hover:border-amber-500/50">
            <Terminal size={14} className="group-hover:rotate-12 transition-transform" />
          </div>
          <span className="font-mono font-bold text-[10px] tracking-[0.4em] uppercase">Return_Root</span>
        </button>
      </div>

      <div className="flex-1 px-4 py-6 overflow-y-auto no-scrollbar space-y-8">
        {/* Navigation Category */}
        <div className="space-y-1">
          <h2 className="px-4 text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
             <div className="w-1 h-1 bg-white/20 rounded-full" />
             Navigation_Vectors
          </h2>
          
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  group relative flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-500
                  ${isActive 
                    ? 'bg-amber-500/5 text-white' 
                    : 'text-white/40 hover:text-white/80 hover:bg-white/[0.02]'}
                `}
              >
                {({ isActive }) => (
                  <>
                    <item.icon 
                      size={18} 
                      className={`transition-colors duration-500 ${isActive ? 'text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.5)]' : 'text-current'}`} 
                    />
                    
                    <div className="flex flex-col items-start translate-x-0 group-hover:translate-x-1 transition-transform">
                      <span className="text-[11px] font-bold tracking-wider">{item.label}</span>
                      <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">{item.note}</span>
                    </div>

                    {isActive && (
                      <motion.div 
                        layoutId="active-nav-border"
                        className="absolute left-0 top-1/4 bottom-1/4 w-[1px] bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)]"
                      />
                    )}

                    <ChevronRight 
                      size={12} 
                      className={`ml-auto opacity-0 group-hover:opacity-40 transition-all ${isActive ? 'opacity-20 text-amber-500' : ''}`} 
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* Footer Snapshot */}
      <div className="p-8 border-t border-white/[0.03] space-y-4 bg-white/[0.01]">
         <div className="space-y-1">
            <div className="flex justify-between items-center">
               <span className="text-[8px] font-mono text-white/40 uppercase tracking-widest">Network_Stability</span>
               <Activity size={10} className="text-emerald-500 animate-pulse" />
            </div>
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: "98%" }}
                 className="h-full bg-emerald-500/40"
               />
            </div>
         </div>
         
         <div className="flex items-center gap-2 text-[8px] font-mono text-white/20 uppercase tracking-[0.2em]">
            <div className="w-1 h-1 bg-amber-500/50 rounded-full" />
            Encryption_Active.256
         </div>
      </div>
    </aside>
  );
}
