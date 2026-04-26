import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Folder, Cpu, Briefcase, Award, Terminal, Shield, Activity, User, ChevronRight } from 'lucide-react';
import { CinematicOverlay } from '@/landing-page/CinematicOverlay';

// ─── Minimal Inlined Components ───────────────────────────────

const InlineGrid = ({ items, navigate }: { items: any[], navigate: any }) => (
  <div className="grid grid-cols-2 gap-6 w-full">
    {items.map((item, index) => (
      <motion.div
        key={index}
        whileHover={{ scale: 1.02 }}
        onClick={() => item.onClick()}
        className="group relative p-6 bg-white/[0.02] border border-white/5 rounded-3xl cursor-pointer hover:bg-white/[0.05] hover:border-amber-500/20 transition-all duration-500"
      >
        <div className="flex justify-between items-start mb-4">
           <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 border border-amber-500/20">
              {item.icon}
           </div>
           <ChevronRight size={14} className="text-white/20 group-hover:text-amber-500 transition-colors" />
        </div>
        <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-1">{item.title}</h3>
        <p className="text-[10px] text-white/30 font-mono tracking-widest uppercase">{item.label}</p>
      </motion.div>
    ))}
  </div>
);

// ─── Main Hub Desktop ─────────────────────────────────────────

export const HubDesktop = ({ content }: { content: any }) => {
  const navigate = useNavigate();

  const quickAccessItems = [
    { title: "PROJECTS", label: "ARCHIVED", icon: <Folder size={20} />, onClick: () => navigate("/hub/projects") },
    { title: "SKILLS", label: "STACK", icon: <Cpu size={20} />, onClick: () => navigate("/hub/stack") },
    { title: "EXPERIENCE", label: "HISTORY", icon: <Briefcase size={20} />, onClick: () => navigate("/hub/experience") },
    { title: "CERTIFICATIONS", label: "VERIFIED", icon: <Award size={20} />, onClick: () => navigate("/hub/certifications") }
  ];

  return (
    <div className="relative w-full h-screen bg-[#050507] overflow-hidden flex items-stretch p-8 gap-8">
      <CinematicOverlay />
      
      {/* Sidebar Interface */}
      <motion.aside 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-[450px] flex flex-col gap-6 relative z-10"
      >
        <div className="flex-1 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 flex flex-col items-center justify-between overflow-hidden relative">
          <div className="w-full flex justify-between items-center opacity-30">
             <div className="flex items-center gap-2">
                <Shield size={10} className="text-amber-500" />
                <span className="text-[8px] font-mono tracking-widest uppercase text-white">SECURE_LINK</span>
             </div>
             <Activity size={10} className="text-amber-500 animate-pulse" />
          </div>

          <div className="relative group">
            <div className="w-56 h-72 rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl grayscale brightness-110">
              <img src="https://images.unsplash.com/photo-1597384708133-af8b03bb1287?q=80&w=1080&h=960&auto=format&fit=crop" className="w-full h-full object-cover" alt="Profile" />
            </div>
            <div className="absolute bottom-4 -right-4 bg-amber-500 text-[#050507] px-4 py-2 rounded-xl text-[10px] font-black uppercase italic shadow-2xl">
              Verified_Identity
            </div>
          </div>

          <div className="text-center w-full space-y-4">
            <div className="space-y-1">
              <h1 className="text-4xl font-bold tracking-tighter text-white uppercase font-serif">
                {content?.ownerName || "Aditya Chavan"}
              </h1>
              <p className="text-[10px] font-mono tracking-[0.4em] text-amber-500/60 uppercase">
                {content?.ownerRole || "Full Stack Architect"}
              </p>
            </div>
            <button
               onClick={() => navigate("/journey")}
               className="w-full py-4 bg-amber-500 text-[#050507] rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2 hover:bg-white transition-all"
            >
              <Play size={14} fill="currentColor" /> Initialize_Journey
            </button>
          </div>
          <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest opacity-40">(C) 2026 Admin_OS</p>
        </div>
      </motion.aside>

      {/* Main Terminal Interface */}
      <motion.main 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex flex-col gap-6 relative z-10"
      >
        <div className="flex-1 bg-white/[0.015] border border-white/5 rounded-[2rem] p-10 flex flex-col gap-8">
          <div className="flex items-center gap-4 opacity-50">
            <Terminal size={16} className="text-amber-500" />
            <h2 className="text-xs font-black uppercase tracking-[0.4em] text-white">System_Modules</h2>
            <div className="flex-1 h-px bg-white/5" />
          </div>
          <InlineGrid items={quickAccessItems} navigate={navigate} />
        </div>

        <div className="h-64 bg-white/[0.015] border border-white/5 rounded-[2rem] p-10 flex flex-col items-center justify-center text-center opacity-40">
           <Activity size={24} className="text-amber-500/20 mb-4" />
           <p className="text-[10px] font-mono tracking-[0.3em] uppercase">Telemetry_Standby // Signal_Archive_Inactive</p>
        </div>
      </motion.main>
    </div>
  );
};
