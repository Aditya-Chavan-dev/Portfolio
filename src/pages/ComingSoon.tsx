import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export const ComingSoon = () => {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative h-[100dvh] w-full bg-bg-base flex flex-col items-center justify-center text-center px-6 overflow-hidden"
    >
      {/* AMBER GLOW BACKGROUND */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div 
          animate={{ 
            opacity: [0.6, 1, 0.6],
            scale: [1, 1.05, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201,169,110,0.07) 0%, transparent 70%)'
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-body text-[10px] uppercase tracking-[0.25em] text-accent mb-6"
        >
          In Production
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-display text-6xl md:text-8xl text-text-primary max-w-4xl leading-tight mb-8"
        >
          Something cinematic is coming.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="font-body text-sm text-text-muted max-w-xl mb-12 tracking-wide"
        >
          Aditya's immersive professional journey is being crafted frame by frame.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={() => navigate('/hub')}
          className="group flex items-center gap-2 font-body text-[11px] uppercase tracking-[0.18em] text-accent hover:text-text-primary transition-colors"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span>Back to Hub</span>
        </motion.button>
      </div>
    </motion.div>
  )
}
