import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Folder, Zap } from 'lucide-react';
import { QuickAccessCard } from './QuickAccessCard';

interface HubDesktopProps {
  content: any;
}

export const HubDesktop: React.FC<HubDesktopProps> = ({ content }) => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full h-screen bg-bg-base overflow-hidden flex items-center justify-center p-8">
      {/* ─── Background Atmosphere ─────────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] nebula-glow opacity-30" />
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] nebula-glow opacity-10" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] nebula-glow opacity-10" />
      </div>

      {/* ─── Orbital System ───────────────────────────────────── */}
      <div className="relative w-[1000px] h-[1000px] flex items-center justify-center scale-90 xxl:scale-100">
        
        {/* Orbit Rings */}
        <div className="absolute w-[500px] h-[500px] border border-accent/10 rounded-full" />
        <div className="absolute w-[800px] h-[800px] border border-accent/5 rounded-full" />

        {/* ─── Central Identity Hub ───────────────────────────── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-20 w-80 h-80 rounded-full ethereal-glass flex flex-col items-center justify-center p-8 text-center"
        >
          <div className="mb-4 relative">
            <div className="w-32 h-32 rounded-full border-2 border-accent p-1">
              <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1597384708133-af8b03bb1287?q=80&w=256&h=256&auto=format&fit=crop" 
                  alt="Identity"
                  className="w-full h-full object-cover grayscale opacity-80"
                />
              </div>
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-2 border-t-2 border-accent rounded-full opacity-40"
            />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <span className="font-hud text-accent/80">System Operator</span>
            <div className="w-1 h-1 rounded-full bg-accent" />
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-500/10 border border-green-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] font-black text-green-500/60 tracking-widest uppercase">ONLINE</span>
            </div>
          </div>

          <h1 className="text-4xl font-black tracking-tighter text-white mb-2 text-bloom uppercase">
            {content?.hero?.name || "ADITYA CHAVAN"}
          </h1>
          <p className="font-hud text-accent/40 max-w-[200px] leading-relaxed uppercase">
            {content?.hero?.description || "Architecture of the Unexpected"}
          </p>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(56, 189, 248, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/welcome")}
            className="absolute -bottom-12 px-8 py-3 bg-accent rounded-full text-bg-base text-[10px] font-black tracking-[0.2em] shadow-xl shadow-accent/20 border border-white/20 whitespace-nowrap"
          >
            INITIATE IMMERSIVE JOURNEY
          </motion.button>
        </motion.div>

        {/* ─── Inner Orbit Cards (Projects & Skills) ────────── */}
        <OrbitingContent radius={250} angle={-30} delay={0.2}>
          <QuickAccessCard 
            title="Logic" 
            label="Capabilities" 
            icon={<Zap className="w-4 h-4" />} 
            onClick={() => navigate("/hub/stack")}
          />
        </OrbitingContent>

        <OrbitingContent radius={250} angle={150} delay={0.4}>
          <QuickAccessCard 
            title="Works" 
            label="Archived" 
            icon={<Folder className="w-4 h-4" />} 
            onClick={() => navigate("/hub/projects")}
          />
        </OrbitingContent>

        {/* ─── Outer Orbit (Experience & Feedbacks) ─────────── */}
        <OrbitingContent radius={400} angle={60} delay={0.6}>
          <div className="ethereal-glass-strong p-6 rounded-3xl w-80">
            <div className="text-[9px] font-black text-accent/40 tracking-[0.3em] mb-3">SATELLITE FEEDBACK</div>
            <p className="text-xs font-bold text-white/80 leading-relaxed mb-3 italic">
              "Aditya doesn't just design — he architects experiences. A rare mind: systems thinker and visual poet."
            </p>
            <div className="text-[10px] font-black text-accent tracking-widest uppercase">SARAH JENKINS</div>
          </div>
        </OrbitingContent>

        <OrbitingContent radius={400} angle={240} delay={0.8}>
           <div className="ethereal-glass-strong p-6 rounded-3xl w-80">
            <div className="text-[9px] font-black text-accent/40 tracking-[0.3em] mb-3">SATELLITE FEEDBACK</div>
            <p className="text-xs font-bold text-white/80 leading-relaxed mb-3 italic">
              "Working with Aditya redefined how our team thinks about interface design. Elevated our entire product language."
            </p>
            <div className="text-[10px] font-black text-accent tracking-widest uppercase">ROHAN MEHTA</div>
          </div>
        </OrbitingContent>
      </div>

      {/* ─── Global HUD Elements ───────────────────────────────── */}
      <div className="absolute bottom-8 left-8 flex items-center gap-4 text-[9px] font-bold text-accent/20 tracking-[0.4em]">
        <span>AZURE.CYBER.OS</span>
        <span>/</span>
        <span>BUILD.2604</span>
      </div>
    </div>
  );
};

const OrbitingContent: React.FC<{ radius: number; angle: number; children: React.ReactNode; delay: number }> = ({ 
  radius, angle, children, delay 
}) => {
  const x = Math.cos((angle * Math.PI) / 180) * radius;
  const y = Math.sin((angle * Math.PI) / 180) * radius;

  return (
    <motion.div
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{ opacity: 1, x, y }}
      transition={{ 
        delay, 
        duration: 0.8, 
        type: "spring", 
        stiffness: 50 
      }}
      className="absolute"
    >
      <motion.div
        animate={{ 
          y: [0, -10, 0],
          x: [0, 5, 0]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="pointer-events-auto"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
