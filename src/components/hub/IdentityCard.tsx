import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const IdentityCard = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-start justify-center h-full p-10 max-w-md">
      {/* PHOTO */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-40 h-40 mb-8 overflow-hidden rounded-2xl border border-border-hover/30"
      >
        <img 
          src="https://i.pravatar.cc/300?img=11" 
          alt="Aditya Chavan" 
          className="object-cover w-full h-full grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.08, ease: "easeOut" }}
        className="font-display text-5xl font-semibold text-text-primary tracking-tight leading-[1.2] mb-3"
      >
        Aditya Chavan
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.14 }}
        className="font-body text-[12px] uppercase tracking-[0.18em] text-accent mb-8 leading-[1.6]"
      >
        Senior UI/UX Architect
      </motion.p>

      {/* TAGLINE */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.18 }}
        className="font-display italic text-lg text-text-muted max-w-[240px] leading-relaxed mb-10"
      >
        "Crafting spatial experiences that live at the intersection of logic and beauty."
      </motion.p>

      {/* DIVIDER */}
      <div className="w-full h-px bg-border-dim mb-10" />

      {/* CTA BUTTON */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.24 }}
        onClick={() => navigate('/coming-soon')}
        className="group relative flex items-center gap-3 px-6 py-3 border border-accent text-accent font-body text-[11px] uppercase tracking-[0.22em] transition-all duration-300 hover:bg-accent hover:text-bg-base"
      >
        <Play size={12} className="fill-current" />
        <span>Immersive Journey</span>
      </motion.button>
    </div>
  )
}
