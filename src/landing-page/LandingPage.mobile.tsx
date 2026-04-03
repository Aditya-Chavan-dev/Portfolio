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

export function LandingPageMobile({
  content,
  skipAnimation,
  isDialogueComplete,
  onDialogueComplete,
  onNavigateHub,
}: Props) {

  return (
    <div className="h-[100dvh] w-screen bg-black flex items-center justify-center select-none overflow-hidden relative text-white transition-colors duration-700">
      
      {/* 1. Cinematic Background Layers */}
      <AmbientDust count={40} />
      <div className="absolute inset-0 bg-radial-glow opacity-20 pointer-events-none" />
      <div className="absolute inset-0 grain-overlay opacity-5 pointer-events-none" />

      {/* 2. Dialogue Container (Perfect Centering) */}
      <div className="w-full h-full flex flex-col items-center justify-center relative z-10 px-6 overflow-hidden">
        <WelcomeDialogue
          lines={content.dialogue}
          highlightIndex={content.highlightIndex}
          skip={skipAnimation}
          onComplete={onDialogueComplete}
        />
      </div>

      {/* 3. Navigation Prompt Zone (Subtle & Delayed) */}
      <div className="absolute bottom-8 left-0 w-full flex flex-col items-center justify-center z-20 pointer-events-none">
        <AnimatePresence mode="wait">
          {isDialogueComplete && (
            <motion.div 
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.8 }}
              className="flex flex-col items-center gap-2 pointer-events-auto"
            >
              <div
                onClick={onNavigateHub}
                className="group cursor-pointer"
              >
                <motion.div 
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="text-[10px] font-medium tracking-[0.4em] font-display text-theme-accent uppercase transition-all duration-700"
                >
                  <EditableText 
                    id="welcome.ctaMobile" 
                    value="TAP TO CONTINUE" 
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
