import { useEffect } from 'react'
import { WelcomeDialogue } from './WelcomeDialogue'
import type { WelcomeConfig } from './landing.types'
import { AmbientDust } from './AmbientDust'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  readonly content:        WelcomeConfig
  readonly showCTA:        boolean
  readonly showSkipHint:   boolean
  readonly skipAnimation:  boolean
  readonly onDialogueComplete: () => void
  readonly onNavigateHub:  () => void
}

export function LandingPageDesktop({
  content,
  showCTA,
  showSkipHint,
  skipAnimation,
  onDialogueComplete,
  onNavigateHub,
}: Props) {

  // Support "Press any key to continue" once dialogue is complete
  useEffect(() => {
    if (!showCTA) return

    const handleAnyKey = () => {
      onNavigateHub()
    }

    window.addEventListener('keydown', handleAnyKey)
    return () => window.removeEventListener('keydown', handleAnyKey)
  }, [showCTA, onNavigateHub])

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center select-none overflow-hidden py-[48px] relative">
      <AmbientDust count={80} />
      <div className="max-w-[800px] w-full flex flex-col items-center justify-center text-center relative z-10">
        
        {/* 2. Dialogue */}
        <WelcomeDialogue
          lines={content.dialogue}
          skip={skipAnimation}
          onComplete={onDialogueComplete}
          highlightIndex={content.highlightIndex}
        />

        {/* 3. Prompts */}
        <div className="mt-[56px] flex flex-col items-center justify-center h-[60px] relative">
          <AnimatePresence mode="wait">
            {showCTA ? (
              <motion.p
                key="continue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                onClick={onNavigateHub}
                className="text-[13px] text-[#555555] tracking-[0.02em] hover:text-[#FFFFFF] transition-colors duration-200 cursor-pointer flex items-center"
              >
                Press any key to continue 
                <motion.span 
                  animate={{ opacity: [1, 0.3, 1] }} 
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="ml-1"
                >
                  ▋
                </motion.span>
              </motion.p>
            ) : showSkipHint ? (
              <motion.p
                key="skip"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="text-[13px] text-[#555555] tracking-[0.02em]"
              >
                Press Enter twice to skip
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}

