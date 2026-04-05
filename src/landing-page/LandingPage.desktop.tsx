import { motion, AnimatePresence } from 'framer-motion'
import { WelcomeDialogue } from './WelcomeDialogue'
import type { WelcomeConfig } from './landing.types'
import EditableText from '@/admin/EditableText'
import { AmbientDust } from './AmbientDust'

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

  return (
    <div className="h-screen w-screen bg-black flex items-center justify-center select-none overflow-hidden relative text-white transition-colors duration-700">
      
      {/* 1. Cinematic Background Layers */}
      <AmbientDust count={100} />
      <div className="absolute inset-0 bg-radial-glow opacity-40 pointer-events-none" />

      
      {/* Cinematic Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_200px_rgba(0,0,0,0.8)] z-30" />

      {/* 2. Anamorphic Letterboxing (Expansion Animation) */}
      <motion.div 
        initial={{ height: '50vh' }}
        animate={{ height: '12vh' }}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 w-full bg-black z-40" 
      />
      <motion.div 
        initial={{ height: '50vh' }}
        animate={{ height: '12vh' }}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-0 left-0 w-full bg-black z-40" 
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

      {/* 4. Navigation Prompt Zone (Subtle & Delayed) */}
      <div className="absolute bottom-16 left-0 w-full flex flex-col items-center justify-center z-50 pointer-events-none">
        <AnimatePresence mode="wait">
          {isDialogueComplete && (
            <motion.div 
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
              className="flex flex-col items-center gap-2 pointer-events-auto"
            >
              <div
                onClick={onNavigateHub}
                className="group cursor-pointer"
              >
                <motion.div 
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="text-[10px] font-medium tracking-[0.8em] font-display text-theme-accent uppercase group-hover:opacity-100 group-hover:tracking-[1em] transition-all duration-700"
                >
                  <EditableText 
                    id="welcome.ctaDesktop" 
                    value="PRESS ANY KEY TO CONTINUE" 
                  />
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

