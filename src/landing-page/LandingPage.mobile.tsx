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
    <div className="h-[100dvh] w-screen bg-bg-base flex items-center justify-center select-none overflow-hidden relative text-white transition-colors duration-700">
      
      {/* 1. Cinematic Background Layers */}
      <AmbientDust count={40} />
      
      {/* Subtle Nebula Glow Layer (Static for Mobile) */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30 blur-[80px]">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-accent-gold/10 rounded-full mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent-gold/5 rounded-full mix-blend-screen" />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08)_0%,_transparent_80%)] opacity-40 pointer-events-none" />

      {/* 2. Dialogue Container (Perfect Centering) */}
      <div className="w-full h-full flex flex-col items-center justify-center relative z-10 px-6 overflow-hidden">
        <WelcomeDialogue
          lines={content.dialogue}
          highlightIndex={content.highlightIndex}
          skip={skipAnimation}
          onComplete={onDialogueComplete}
        />
      </div>

      {/* 3. Navigation Prompt Zone (Simplified for Mobile) */}
      <div className="absolute bottom-12 left-0 w-full flex flex-col items-center justify-center z-50 pointer-events-none">
        <AnimatePresence mode="wait">
          {isDialogueComplete && (
            <motion.div 
              key="complete"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
              className="flex flex-col items-center gap-2 pointer-events-auto"
            >
              <button
                onClick={onNavigateHub}
                className="group relative flex flex-col items-center gap-4 outline-none"
              >
                {/* CTA Box */}
                <div className="ethereal-glass px-10 py-4 rounded-full border border-white/10 active:border-accent-gold/40 transition-all duration-300 shadow-lg shadow-black/40">
                  <div className="text-xs font-mono tracking-[0.4em] text-white/50 active:text-white uppercase">
                    <EditableText 
                      id="welcome.ctaMobile" 
                      value="TAP TO CONTINUE" 
                    />
                  </div>
                </div>

                {/* Subtle Hint */}
                <motion.div 
                  animate={{ opacity: [0.3, 0.5, 0.3] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="text-[10px] font-medium tracking-[0.2em] font-body text-white/20 uppercase"
                >
                  <EditableText 
                    id="welcome.skipHintMobile" 
                    value="(Double-Tap to Skip)" 
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
