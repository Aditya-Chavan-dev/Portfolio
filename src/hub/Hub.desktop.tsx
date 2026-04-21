import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Folder, Cpu, Briefcase, Award } from 'lucide-react';
import { QuickAccessGrid } from './QuickAccessGrid';
import { TestimonialsSlider } from './TestimonialsSlider';
import { useTestimonials } from './useTestimonials';
import type { QuickAccessItem } from './hub.types';

interface HubDesktopProps {
  content: any;
}

export const HubDesktop: React.FC<HubDesktopProps> = ({ content }) => {
  const navigate = useNavigate();
  const { testimonials } = useTestimonials();

  const quickAccessItems: QuickAccessItem[] = [
    {
      title: "PROJECTS",
      label: "ARCHIVED WORKS",
      icon: <Folder className="w-5 h-5" />,
      route: "/hub/projects",
      onClick: () => navigate("/hub/projects")
    },
    {
      title: "SKILLS",
      label: "SYSTEM STACK",
      icon: <Cpu className="w-5 h-5" />,
      route: "/hub/stack",
      onClick: () => navigate("/hub/stack")
    },
    {
      title: "EXPERIENCE",
      label: "HISTORY",
      icon: <Briefcase className="w-5 h-5" />,
      route: "/hub/experience",
      onClick: () => navigate("/hub/experience")
    },
    {
      title: "CERTIFICATIONS",
      label: "VERIFIED",
      icon: <Award className="w-5 h-5" />,
      route: "/hub/certifications",
      onClick: () => navigate("/hub/certifications")
    }
  ];

  return (
    <div className="relative w-full h-screen bg-bg-base overflow-hidden flex items-start justify-center pt-10 pb-12 px-12 gap-32">
      {/* Background Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] nebula-glow-gold opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] nebula-glow-gold opacity-10" />
      </div>

      {/* ─── Left Column (Identity) ────────────────────────────── */}
      <motion.div 
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center justify-start pt-2 gap-6 w-[500px] h-full"
      >
        {/* Profile Image Wrapper */}
        <div className="relative w-[500px] h-[400px] rounded-[24px] overflow-hidden border border-white/5 shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1597384708133-af8b03bb1287?q=80&w=1080&h=960&auto=format&fit=crop" 
            alt="Aditya Chavan"
            className="w-full h-full object-cover grayscale brightness-90 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-base/60 to-transparent" />
        </div>

        {/* Identity Text */}
        <div className="flex flex-col items-center text-center gap-4">
          <div className="space-y-1">
             <h1 className="text-[54px] font-extrabold leading-none tracking-tight font-syne text-white uppercase">
              {content?.ownerName || "ADITYA CHAVAN"}
            </h1>
            <p className="text-lg font-medium tracking-[0.25em] text-text-muted font-mono uppercase">
              {content?.ownerRole || "FULL STACK ARCHITECT & DESIGNER"}
            </p>
          </div>

          {/* Journey CTA */}
          <div className="relative mt-4">
            {/* Pulsing Aura */}
            <motion.div
              animate={{ 
                scale: [1, 1.25, 1],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-accent-gold blur-[40px] rounded-full"
            />

            <motion.button
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "#F0C850", 
                boxShadow: "0 0 60px rgba(212, 175, 55, 0.8)" 
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/journey")}
              className="relative flex items-center justify-center gap-3 w-[280px] h-16 bg-accent-gold rounded-full shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all group overflow-hidden"
            >
              {/* Shimmer Effect */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] pointer-events-none"
              />

              <motion.div 
                className="flex items-center gap-3"
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Play className="w-5 h-5 text-bg-base fill-bg-base group-hover:scale-125 transition-transform" />
                <span className="text-bg-base text-sm font-bold tracking-[0.1em] group-hover:tracking-[0.2em] transition-all uppercase font-syne whitespace-nowrap">
                  ENTER THE JOURNEY
                </span>
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* ─── Right Column (Content) ────────────────────────────── */}
      <motion.div 
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="flex-1 flex flex-col items-center justify-start gap-6 max-w-[700px] mt-6"
      >
        {/* Quick Access Grid */}
        <div className="w-full space-y-4">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-[12px] font-bold tracking-[0.3em] text-accent-gold-header uppercase font-mono">
              QUICK ACCESS
            </span>
            <div className="w-12 h-px bg-accent-gold/20" />
          </div>
          <QuickAccessGrid items={quickAccessItems} />
        </div>

        {/* Testimonials Slider */}
        <div className="w-full space-y-4">
          <div className="flex flex-col items-center text-center gap-2">
            <span className="text-[12px] font-bold tracking-[0.3em] text-accent-gold-header uppercase font-mono">
              TESTIMONIALS
            </span>
            <div className="w-12 h-px bg-accent-gold/20" />
          </div>
          <TestimonialsSlider 
            testimonials={testimonials} 
            showArrows={true}
            className="w-full"
          />
        </div>
      </motion.div>

    </div>
  );
};
