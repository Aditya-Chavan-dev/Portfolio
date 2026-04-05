import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Terminal, Folder, Zap, History, Plus } from 'lucide-react';
import { QuickAccessCard } from './QuickAccessCard';
import { TestimonialsMarquee } from './TestimonialsMarquee';

interface HubMobileProps {
  content: any;
}

export const HubMobile: React.FC<HubMobileProps> = ({ content }) => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-bg-base text-text-primary overflow-y-auto overflow-x-hidden flex flex-col p-5 gap-8">
      {/* Background Gradients */}
      <div className="fixed top-0 left-0 w-full h-screen pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[40%] bg-accent/5 blur-[100px] rounded-full opacity-20" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[80%] h-[40%] bg-accent/5 blur-[100px] rounded-full opacity-10" />
      </div>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center gap-5 rounded-2xl border border-white/5 bg-white/[0.01] backdrop-blur-md p-6 pt-8 overflow-hidden text-center mt-1">
        <span className="font-hud text-accent/80 uppercase opacity-80">
          System Operator
        </span>
        <h1 className="text-4xl font-black tracking-tighter leading-none font-syne text-bloom uppercase">
          {content?.hero?.name || "ADITYA CHAVAN"}
        </h1>

        {/* Portrait */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative w-40 h-40 rounded-full border border-accent/40 p-1 group"
        >
          <div className="absolute inset-0 bg-accent/5 blur-2xl rounded-full opacity-40" />
          <div className="relative w-full h-full rounded-full overflow-hidden border border-accent/20 flex items-center justify-center bg-slate-900 shadow-xl">
            <img 
              src="https://images.unsplash.com/photo-1597384708133-af8b03bb1287?q=80&w=512&h=512&auto=format&fit=crop" 
              alt="Portrait"
              className="w-full h-full object-cover grayscale brightness-110 contrast-125"
            />
          </div>
        </motion.div>

        <p className="font-hud text-accent/60 max-w-xs mt-1 uppercase px-4 leading-relaxed italic">
          {content?.hero?.description || "Architecture of the Unexpected"}
        </p>

        <motion.button
          whileHover={{ scale: 1.02, y: -1 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/welcome")}
          className="relative w-full h-12 bg-accent rounded-lg flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(56,189,248,0.3)] mb-1"
        >
          <Terminal className="w-4 h-4 text-bg-base" />
          <span className="text-bg-base text-xs font-black tracking-[0.2em]">
            INITIATE COMMAND
          </span>
        </motion.button>
      </section>

      {/* Quick Access (2x2 Grid) */}
      <section className="relative flex flex-col gap-6">
        <div className="flex items-center gap-4 px-1">
          <span className="font-hud text-accent/40 flex-none uppercase">
            System Access
          </span>
          <div className="h-px bg-accent/10 flex-1" />
        </div>
        
        <div className="grid grid-cols-2 gap-3 h-[280px]">
          <QuickAccessCard
            title="Projects"
            label="ARCHIVED WORKS"
            icon={<Folder className="w-5 h-5" />}
            onClick={() => navigate("/hub/projects")}
            className="flex-1"
          />
          <QuickAccessCard
            title="Skills"
            label="SYSTEM STACK"
            icon={<Zap className="w-5 h-5" />}
            onClick={() => navigate("/hub/stack")}
            className="flex-1"
          />
          <QuickAccessCard
            title="Experience"
            label="HISTORY"
            icon={<History className="w-5 h-5" />}
            onClick={() => navigate("/hub/experience")}
            className="flex-1"
          />
          <QuickAccessCard
            title="Connect"
            label="VERIFIED"
            icon={<Plus className="w-5 h-5" />}
            onClick={() => navigate("/hub/certifications")}
            className="flex-1"
          />
        </div>
      </section>

      {/* Testimonials (Horizontal Scroll) */}
      <section className="relative flex flex-col gap-6 mb-12">
        <div className="flex items-center gap-4 px-1">
          <span className="font-hud text-accent/40 flex-none uppercase">
            Commendations
          </span>
          <div className="h-px bg-accent/10 flex-1" />
        </div>
        
        <TestimonialsMarquee 
          direction="horizontal"
          className="h-[220px]"
        />
      </section>

      {/* Footer Indicator */}
      <div className="flex flex-col items-center gap-2 pb-12 opacity-40">
        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
        <span className="font-hud text-accent text-center uppercase">
          HUB / TERMINAL 01-MOB
        </span>
      </div>
    </div>
  );
};
