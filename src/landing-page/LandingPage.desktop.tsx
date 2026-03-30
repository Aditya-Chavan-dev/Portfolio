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

export function LandingPageDesktop({
  content,
  skipAnimation,
  isDialogueComplete,
  onDialogueComplete,
  onNavigateHub,
}: Props) {

  return (
    <div className="h-screen w-screen bg-theme-base flex flex-col items-center justify-between select-none overflow-hidden relative text-theme-primary transition-colors duration-700">
      
      {/* 1. Top Runway */}
      <div className="h-[4vh] w-full" />

      {/* 2. Dialogue Container (Scroll-free by design) */}
      <div className="w-full flex-1 flex flex-col items-center justify-start relative z-10 px-12 overflow-hidden pt-[2vh]">
        <WelcomeDialogue
          lines={content.dialogue}
          highlightIndex={content.highlightIndex}
          skip={skipAnimation}
          onComplete={onDialogueComplete}
        />
      </div>

      {/* 3. Navigation Prompt Zone (Fixed Height, Centered) */}
      <div className="h-[12vh] w-full flex items-center justify-center relative z-20">
        <AnimatePresence mode="wait">
          <motion.div 
            key={isDialogueComplete ? 'complete' : 'typing'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex items-center justify-center p-8"
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
                className="absolute inset-0 bg-theme-accent/40 blur-[60px] rounded-full -z-10"
              />
            )}

            <div
              onClick={onNavigateHub}
              className="group relative cursor-pointer"
            >
              <div className={`
                text-[14px] font-black italic tracking-[0.5em] font-sans 
                transition-all duration-500 flex items-center gap-3 uppercase
                ${isDialogueComplete 
                  ? 'text-theme-accent cta-bloom' 
                  : 'text-theme-primary/50'}
                group-hover:scale-110 group-hover:cta-bloom
              `}>
                <EditableText 
                  id="welcome.ctaDesktop" 
                  value={isDialogueComplete ? 'PRESS ANY KEY TO CONTINUE' : '(Press enter twice to skip the animation)'} 
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

