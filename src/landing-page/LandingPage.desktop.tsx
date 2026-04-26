import { motion } from 'framer-motion'
import { WelcomeDialogue } from './WelcomeDialogue'
import type { WelcomeConfig } from './landing.types'
import { AmbientDust } from './AmbientDust'
import { CinematicOverlay } from './CinematicOverlay'
import { useMousePosition } from '@/common/shared/useMousePosition'

interface Props {
  readonly content:        WelcomeConfig
  readonly isDialogueComplete: boolean
  readonly onDialogueComplete: () => void
  readonly onNavigateHub:  () => void
}

export function LandingPageDesktop({
  content,
  isDialogueComplete,
  onDialogueComplete,
  onNavigateHub,
}: Props) {
  const mouse = useMousePosition()

  return (
    <div className="h-screen w-screen bg-[#050506] flex items-center justify-center select-none overflow-hidden relative text-white">
      {/* 1. Cinematic Background Layers */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Deep Nebula Glow */}
        <motion.div 
          style={{ 
            x: mouse.x * 20, 
            y: mouse.y * 20,
          }}
          className="absolute inset-0 z-0 pointer-events-none opacity-30 blur-[120px]"
        >
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent-gold/5 rounded-full" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full" />
        </motion.div>

        {/* Ambient Particle System */}
        <AmbientDust count={40} />
      </div>

      <CinematicOverlay />

      {/* 2. Central Dialogue Hook */}
      <div className="relative z-50 flex flex-col items-center">
        <WelcomeDialogue 
          lines={content.dialogue}
          highlightIndexes={content.highlightIndex}
          onComplete={onDialogueComplete}
        />
        
        {/* Interactive Prompt */}
        <div className={`mt-12 transition-all duration-1000 ${isDialogueComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <button
            onClick={onNavigateHub}
            className="group relative px-10 py-4 font-mono text-[10px] uppercase tracking-[0.3em] overflow-hidden transition-all"
          >
            <span className="relative z-10 text-accent-gold-header group-hover:text-white transition-colors duration-500">
              {content.ctaDesktop}
            </span>
            <div className="absolute inset-0 border border-accent-gold/20 group-hover:border-accent-gold/40 transition-colors" />
          </button>
        </div>
      </div>
    </div>
  )
}
