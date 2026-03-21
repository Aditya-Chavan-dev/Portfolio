import { useNavigate } from 'react-router-dom'
import { WelcomeDialogue } from './WelcomeDialogue'
import type { WelcomeConfig } from './landing.types'
import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  readonly content:        WelcomeConfig
  readonly showCTA:        boolean
  readonly showSkipHint:   boolean
  readonly skipAnimation:  boolean
  readonly onDialogueComplete: () => void
}

export function LandingPageMobile({
  content,
  showCTA,
  showSkipHint,
  skipAnimation,
  onDialogueComplete,
}: Props) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => showCTA && navigate('/hub')}
      className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center select-none cursor-pointer overflow-y-auto py-[48px] relative px-8"
    >
      <div className="max-w-[320px] w-full flex flex-col items-center justify-center text-center">
        
        {/* 2. Dialogue */}
        <WelcomeDialogue
          name={content.name}
          lines={content.dialogue}
          skip={skipAnimation}
          onComplete={onDialogueComplete}
          highlightIndex={content.highlightIndex}
        />

        {/* 3. Prompts */}
        <div className="mt-[42px] flex flex-col items-center justify-center h-[50px] relative">
          <AnimatePresence mode="wait">
            {showCTA ? (
              <motion.p
                key="continue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="font-['JetBrains_Mono',monospace] text-[12px] text-[#555555] tracking-[0.02em] flex items-center"
              >
                Tap to continue 
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
                className="font-['JetBrains_Mono',monospace] text-[12px] text-[#555555] tracking-[0.02em]"
              >
                Tap twice to skip
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}

