import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Zap, Target, Activity } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/common/lib/firebase';

interface AboutContent {
  bioParagraphs: string[];
  experienceAge: string;
  globalDeployments: string;
  systemCommits: string;
  designPhilosophy: string;
  offKernel: string;
}

const FALLBACK_ABOUT: AboutContent = {
  bioParagraphs: [
    "I am a digital architect operating at the intersection of aesthetic intent and engineering rigor. With over a decade of deployment history, I specialize in building interfaces that feel alive, fluid, and spatially aware.",
    "My philosophy follows a strict logic: complexity should be handled by the machine, so the user experiences only simplicity. I optimize for the \"Aha!\" moment—the exact frame where a user realizes they are interacting with a premium architectural system."
  ],
  experienceAge: "10Y+",
  globalDeployments: "150+",
  systemCommits: "24K+",
  designPhilosophy: "I believe in the \"Nyquist Validation\" of UI—testing every interaction at its threshold to ensure zero friction. My layouts are built on spatial grids, ensuring mathematical harmony across any viewport.",
  offKernel: "When I'm not architecting systems, I'm likely exploring automotive design, studying mid-century modern furniture, or experimenting with generative art in GLSL."
};

export function About() {
  const [content, setContent] = useState<AboutContent>(FALLBACK_ABOUT);

  useEffect(() => {
    let active = true;
    async function loadAbout() {
      try {
        const snap = await getDoc(doc(db, 'live', 'about'));
        if (snap.exists() && active) {
          setContent(snap.data() as AboutContent);
        }
      } catch (err) {
        console.warn('[About] Failed to fetch CMS content, using static fallback:', err);
      }
    }
    loadAbout();
    return () => { active = false; };
  }, []);

  return (
    <div className="flex flex-col gap-24">
      {/* ─── Header: Strategic Mission ────────────────────────── */}
      <section className="flex flex-col lg:flex-row gap-16 items-start">
        <div className="flex-1 flex flex-col gap-10">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <User size={16} />
               </div>
               <span className="text-[10px] font-mono tracking-[0.4em] text-white/30 uppercase">Personnel_Profile // A_CHAVAN</span>
            </div>
            
            <h2 className="text-6xl font-bold text-white tracking-tighter leading-[0.9] font-serif uppercase">
              Architecting the <br />
              <span className="text-amber-500">Invisible.</span>
            </h2>
            
            <div className="flex flex-col gap-8 text-base font-sans text-white/50 leading-relaxed max-w-[60ch] italic">
              {content.bioParagraphs?.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Professional Statistics Module ────────────────────── */}
        <aside className="w-full lg:w-[350px] space-y-6">
          <div className="bg-white/[0.015] border border-white/5 rounded-[2.5rem] p-10 flex flex-col gap-10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[60px] -mr-16 -mt-16 group-hover:bg-amber-500/10 transition-all duration-1000" />
            
            <div className="flex flex-col gap-1 relative z-10">
               <div className="flex items-center gap-2 mb-1">
                  <Activity size={10} className="text-amber-500/40" />
                  <span className="text-[8px] font-mono font-bold text-white/20 uppercase tracking-widest">Experience_Age</span>
               </div>
               <span className="text-5xl font-bold text-amber-500 tracking-tighter font-serif">{content.experienceAge}</span>
               <div className="w-full h-px bg-white/5 mt-2" />
            </div>

            <div className="flex flex-col gap-1 relative z-10">
               <div className="flex items-center gap-2 mb-1">
                  <Target size={10} className="text-amber-500/40" />
                  <span className="text-[8px] font-mono font-bold text-white/20 uppercase tracking-widest">Global_Deployments</span>
               </div>
               <span className="text-5xl font-bold text-white tracking-tighter font-serif">{content.globalDeployments}</span>
               <div className="w-full h-px bg-white/5 mt-2" />
            </div>

            <div className="flex flex-col gap-1 relative z-10">
               <div className="flex items-center gap-2 mb-1">
                  <Zap size={10} className="text-amber-500/40" />
                  <span className="text-[8px] font-mono font-bold text-white/20 uppercase tracking-widest">System_Commits</span>
               </div>
               <span className="text-5xl font-bold text-white tracking-tighter font-serif">{content.systemCommits}</span>
            </div>

            <div className="mt-4 pt-4 border-t border-white/[0.03] opacity-20">
               <p className="text-[8px] font-mono text-white italic uppercase tracking-[0.3em]">Verified_Historical_Metrics</p>
            </div>
          </div>
        </aside>
      </section>

      {/* ─── Operational Philosophy ───────────────────────────── */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
        {/* Decorative Grid Line */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-white/5 via-transparent to-transparent" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 p-10 bg-white/[0.01] border border-white/5 rounded-[2.5rem]"
        >
          <div className="flex items-center gap-3">
             <Shield size={16} className="text-amber-500/40" />
             <h3 className="text-xs font-black text-white uppercase tracking-[0.4em]">Design_Philosophy</h3>
          </div>
          <p className="font-sans text-sm text-white/40 leading-relaxed italic">
            {content.designPhilosophy}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col gap-6 p-10 bg-white/[0.01] border border-white/5 rounded-[2.5rem]"
        >
          <div className="flex items-center gap-3">
             <Activity size={16} className="text-amber-500/40" />
             <h3 className="text-xs font-black text-white uppercase tracking-[0.4em]">Off_Kernel</h3>
          </div>
          <p className="font-sans text-sm text-white/40 leading-relaxed italic">
            {content.offKernel}
          </p>
        </motion.div>
      </section>
    </div>
  );
}
