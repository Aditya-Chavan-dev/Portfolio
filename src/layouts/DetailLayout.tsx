import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Terminal, Shield } from 'lucide-react';
import { AdaptiveSidebar } from '@/components/common/AdaptiveSidebar';
import { MobileTabBar } from '@/components/common/MobileTabBar';
import { CinematicOverlay } from '@/landing-page/CinematicOverlay';
import { motion } from 'framer-motion';

interface DetailLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function DetailLayout({ children, title }: DetailLayoutProps) {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-full bg-[#050507] overflow-hidden text-white relative">
      {/* Cinematic Identity Background */}
      <CinematicOverlay />
      <div className="absolute inset-0 pointer-events-none nebula-glow-gold opacity-5" />

      {/* Desktop Sidebar (Administrative Wing) */}
      <div className="hidden lg:block h-full relative z-20">
        <AdaptiveSidebar />
      </div>

      {/* Main Command Area */}
      <div className="flex-1 flex flex-col h-full relative transition-all duration-700">
        {/* Top Intelligence Bar */}
        <header className="flex items-center justify-between h-20 px-8 bg-transparent border-b border-white/[0.05] relative z-20">
          <div className="flex items-center gap-6">
            <button 
              onClick={() => navigate('/hub')}
              className="lg:hidden p-2 text-white/40 hover:text-white transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl font-bold tracking-tight font-serif uppercase">
                {title}
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                 <div className="w-1.5 h-1.5 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <div className="w-0.5 h-0.5 bg-amber-500 rounded-full" />
                 </div>
                 <span className="text-[9px] font-mono tracking-[0.4em] text-white/30 uppercase italic">
                    Vector_Location: {title.toLowerCase()}
                 </span>
              </div>
            </div>
          </div>

          {/* Right Data Telemetry */}
          <div className="hidden md:flex items-center gap-8 opacity-40">
             <div className="flex flex-col items-end">
                <span className="text-[8px] font-mono tracking-widest text-white/50 uppercase">Session_Token</span>
                <span className="text-[10px] font-black text-white uppercase tracking-wider">A-CHAVAN-0110</span>
             </div>
             <div className="p-3 bg-white/5 rounded-2xl border border-white/5">
                <Shield size={16} className="text-amber-500" />
             </div>
          </div>
        </header>

        {/* Primary Content Region */}
        <main className="flex-1 overflow-y-auto no-scrollbar relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto p-12 pb-32"
          >
            {/* Context Breadcrumb Overlay */}
            <div className="mb-12 flex items-center gap-4 opacity-20">
               <Terminal size={14} />
               <div className="h-px flex-1 bg-gradient-to-r from-white to-transparent" />
            </div>

            {children}
          </motion.div>
        </main>

        {/* Mobile Navigation Guard */}
        <div className="lg:hidden relative z-20">
          <MobileTabBar />
        </div>
      </div>
    </div>
  );
}
