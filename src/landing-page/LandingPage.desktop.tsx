import { motion, AnimatePresence } from 'framer-motion'
import { WelcomeDialogue } from './WelcomeDialogue'
import type { WelcomeConfig } from './landing.types'
import EditableText from '@/admin/EditableText'
import { AmbientDust } from './AmbientDust'
import { useMousePosition } from '@/common/shared/useMousePosition'

interface Props {
  readonly content:        WelcomeConfig
  readonly skipAnimation:  boolean
  readonly isDialogueComplete: boolean
  readonly onDialogueComplete: () => void
  readonly onNavigateHub:  () => void
}

export function LandingPageDesktop({
  content,
  skipAnimation,
  isDialogueComplete,
  onDialogueComplete,
  onNavigateHub,
}: Props) {
  const mouse = useMousePosition()

  return (
    <div className="h-screen w-screen bg-bg-base flex items-center justify-center select-none overflow-hidden relative text-white transition-colors duration-700">
      
      {/* 1. Cinematic Background Layers */}
      
      {/* Multi-layered Nebula Glow with Mouse Parallax */}
      <motion.div 
        style={{ 
          x: mouse.x * 40, 
          y: mouse.y * 40,
        }}
        className="absolute inset-0 z-0 pointer-events-none opacity-40 blur-[100px]"
      >
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent-gold/10 rounded-full mix-blend-screen animate-pulse-azure" />
        <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-accent-gold/5 rounded-full mix-blend-screen" />
      </motion.div>

      {/* Reactive Dust Particles */}
      <AmbientDust count={120} mouseX={mouse.x} mouseY={mouse.y} />

      {/* Nebula Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-accent-gold/5 opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-accent-gold-dim)_0%,_transparent_70%)] opacity-30 pointer-events-none" />
      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.9)] z-30" />

      {/* 2. Anamorphic Letterboxing (Expansion Animation) */}
      <motion.div 
        initial={{ height: '50vh' }}
        animate={{ height: '12vh' }}
        transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 w-full bg-bg-base z-40 border-b border-white/5" 
      />
      <motion.div 
        initial={{ height: '50vh' }}
        animate={{ height: '12vh' }}
        transition={{ duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 w-full bg-bg-base z-40 border-t border-white/5" 
      />

      {/* 3. Dialogue Container (Perfect Centering) */}
      <div className="w-full h-full flex flex-col items-center justify-center relative z-10 px-12 overflow-hidden">
        <WelcomeDialogue
          lines={content.dialogue}
          highlightIndex={content.highlightIndex}
          skip={skipAnimation}
          onComplete={onDialogueComplete}
        />
      </div>

      {/* 4. Navigation Prompt Zone (Glassmorphic & Premium) */}
      <div className="absolute bottom-16 left-0 w-full flex flex-col items-center justify-center z-50 pointer-events-none">
        <AnimatePresence mode="wait">
          {isDialogueComplete && (
            <motion.div 
              key="complete"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
              className="flex flex-col items-center gap-2 pointer-events-auto"
            >
              <button
                onClick={onNavigateHub}
                className="group relative flex flex-col items-center gap-3 outline-none"
              >
                {/* CTA Box */}
                <div className="ethereal-glass px-8 py-3 rounded-full border border-white/10 group-hover:border-accent-gold/40 transition-all duration-700">
                  <div className="text-[10px] font-mono tracking-[0.5em] text-white/40 group-hover:text-white/90 group-hover:tracking-[0.6em] transition-all duration-700 uppercase">
                    <EditableText 
                      id="welcome.ctaDesktop" 
                      value="PRESS ANY KEY TO CONTINUE" 
                    />
                  </div>
                </div>

                {/* Subtle Hint */}
                <motion.div 
                  animate={{ opacity: [0.2, 0.4, 0.2] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="text-[9px] font-medium tracking-[0.2em] font-body text-white/30 uppercase"
                >
                  <EditableText 
                    id="welcome.skipHintDesktop" 
                    value="(Double Enter to Skip)" 
                  />
                </motion.div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
