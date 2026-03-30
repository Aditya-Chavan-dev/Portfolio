import { motion, AnimatePresence } from 'framer-motion'
import { WelcomeDialogue } from './WelcomeDialogue'
import type { WelcomeConfig } from './landing.types'
import EditableText from '@/admin/EditableText'

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
    <div className="h-[100dvh] w-screen bg-theme-base flex flex-col items-center justify-between select-none overflow-hidden relative text-theme-primary transition-colors duration-700">
      
      {/* 1. Top Runway */}
      <div className="h-[3vh] w-full" />

      {/* 2. Dialogue Container (Scroll-free) */}
      <div className="w-full flex-1 flex flex-col items-center justify-start text-center relative z-10 overflow-hidden px-6 pt-[2vh]">
        <WelcomeDialogue
          lines={content.dialogue}
          highlightIndex={content.highlightIndex}
          skip={skipAnimation}
          onComplete={onDialogueComplete}
        />
      </div>

      {/* 3. Navigation Prompt Zone (Fixed Height, Centered) */}
      <div className="h-[10vh] w-full flex items-center justify-center relative z-20">
        <AnimatePresence mode="wait">
          <motion.div 
            key={isDialogueComplete ? 'complete' : 'typing'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex items-center justify-center p-6"
          >
            {/* Pulsating Background Glow (Only in complete state) */}
            {isDialogueComplete && (
              <motion.div
                animate={{ 
                  opacity: [0.3, 0.6, 0.3],
                  scale: [0.9, 1.2, 0.9],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3, 
                  ease: "easeInOut" 
                }}
                className="absolute inset-0 bg-theme-accent/40 blur-[50px] rounded-full -z-10"
              />
            )}

            <div
              onClick={onNavigateHub}
              className="group relative cursor-pointer"
            >
              <div className={`
                text-[12px] font-black italic tracking-[0.3em] font-sans 
                transition-all duration-500 flex items-center gap-3 uppercase
                ${isDialogueComplete 
                  ? 'text-theme-accent cta-bloom' 
                  : 'text-theme-primary/50'}
              `}>
                <EditableText 
                  id="welcome.ctaMobile" 
                  value={isDialogueComplete ? 'TAP ANYWHERE TO CONTINUE' : '(DOUBLE-TAP TO SKIP)'} 
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
