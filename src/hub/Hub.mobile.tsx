import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Play, Folder, Cpu, Briefcase, Award } from 'lucide-react';
import { QuickAccessGrid } from './QuickAccessGrid';
import { TestimonialsSlider } from './TestimonialsSlider';
import { useTestimonials } from './useTestimonials';
import type { QuickAccessItem } from './hub.types';

interface HubMobileProps {
  content: any;
}

export const HubMobile: React.FC<HubMobileProps> = ({ content }) => {
  const navigate = useNavigate();
  const { testimonials } = useTestimonials();

  const quickAccessItems: QuickAccessItem[] = [
    {
      title: "PROJECTS",
      label: "WORKS",
      icon: <Folder className="w-5 h-5" />,
      route: "/hub/projects",
      onClick: () => navigate("/hub/projects")
    },
    {
      title: "SKILLS",
      label: "STACK",
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
      title: "CONNECT",
      label: "VERIFIED",
      icon: <Award className="w-5 h-5" />,
      route: "/hub/certifications",
      onClick: () => navigate("/hub/certifications")
    }
  ];

  return (
    <div className="relative min-h-screen bg-bg-base text-white overflow-y-auto overflow-x-hidden flex flex-col p-6 gap-16 pb-20">
      {/* Background Atmosphere */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] nebula-glow-gold opacity-10" />
        <div className="absolute bottom-1/4 right-0 w-[200px] h-[200px] nebula-glow-gold opacity-5" />
      </div>

      {/* ─── Hero Section ───────────────────────────────────── */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center gap-6 mt-4"
      >
        <div className="relative w-48 h-48 rounded-full border-2 border-accent-gold/20 p-2">
          <div className="w-full h-full rounded-full overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1597384708133-af8b03bb1287?q=80&w=512&h=512&auto=format&fit=crop" 
              alt={content?.ownerName || "Profile image"}
              className="w-full h-full object-cover grayscale contrast-125"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="space-y-1">
            <h1 className="text-5xl font-extrabold font-syne tracking-tight leading-[0.9] flex flex-col uppercase">
              {content?.ownerName ? (
                content.ownerName.split(' ').map((name: string, i: number) => (
                  <span key={i}>{name}</span>
                ))
              ) : (
                <>
                  <span>ADITYA</span>
                  <span>CHAVAN</span>
                </>
              )}
            </h1>
            <p className="text-[12px] font-bold text-text-muted tracking-[0.3em] font-mono mt-4 uppercase">
               {content?.ownerRole || "FULL STACK ARCHITECT"}
            </p>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          className="mt-4 flex items-center justify-center gap-3 w-full h-14 bg-accent-gold rounded-full shadow-lg shadow-accent-gold/10"
        >
          <Play size={18} fill="black" stroke="black" />
          <span className="text-bg-base text-xs font-bold tracking-[0.1em] uppercase font-syne">
            ENTER JOURNEY
          </span>
        </motion.button>
      </motion.section>

      {/* ─── Quick Access Grid ─────────────────────────────── */}
      <section className="relative z-10 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-accent-pink tracking-[0.2em] font-mono uppercase whitespace-nowrap">
            QUICK ACCESS
          </span>
          <div className="h-px bg-white/5 flex-1" />
        </div>
        <QuickAccessGrid items={quickAccessItems} />
      </section>

      {/* ─── Testimonials Slider ───────────────────────────── */}
      <section className="relative z-10 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-bold text-accent-pink tracking-[0.2em] font-mono uppercase whitespace-nowrap">
            TESTIMONIALS
          </span>
          <div className="h-px bg-white/5 flex-1" />
        </div>
        <TestimonialsSlider 
          testimonials={testimonials} 
          showArrows={false}
          className="w-full"
        />
      </section>

      {/* Footer Indicator */}
      <div className="relative z-10 flex flex-col items-center gap-2 mt-8 opacity-20">
        <div className="w-1.5 h-1.5 rounded-full bg-accent-gold animate-pulse" />
        <span className="font-mono text-[9px] tracking-[0.4em] text-center text-accent-gold uppercase">
          HUB / TERMINAL 01-MOB
        </span>
      </div>
    </div>
  );
};
