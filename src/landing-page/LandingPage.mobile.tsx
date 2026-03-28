import { WelcomeDialogue } from './WelcomeDialogue'
import type { WelcomeConfig } from './landing.types'
import { AmbientDust } from './AmbientDust'
import { motion, AnimatePresence } from 'framer-motion'
import { useEditMode } from '@/admin/EditModeContext'
import EditableText from '@/admin/EditableText'

interface Props {
  readonly content:        WelcomeConfig
  readonly showCTA:        boolean
  readonly showSkipHint:   boolean
  readonly skipAnimation:  boolean
  readonly onDialogueComplete: () => void
  readonly onNavigateHub:  () => void
}

export function LandingPageMobile({
  content,
  showCTA,
  showSkipHint,
  skipAnimation,
  onDialogueComplete,
  onNavigateHub,
}: Props) {
  const { mode } = useEditMode()

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (showCTA && mode !== 'edit' && (e.key === 'Enter' || e.key === ' ')) {
      if (e.key === ' ') e.preventDefault()
      onNavigateHub()
    }
  }

  return (
    <div
      onClick={() => showCTA && mode !== 'edit' && onNavigateHub()}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      className="min-h-screen bg-[#0A0A0A] text-white flex flex-col items-center justify-center select-none cursor-pointer overflow-hidden py-[48px] relative px-8"
    >
      <AmbientDust count={40} />
      <div className="max-w-[320px] w-full flex flex-col items-center justify-center text-center relative z-10">
        
        {/* 2. Dialogue */}
        <WelcomeDialogue
          lines={content.dialogue}
          skip={skipAnimation}
          onComplete={onDialogueComplete}
          highlightIndex={content.highlightIndex}
        />

        {/* 3. Prompts */}
        <div className="mt-[42px] flex flex-col items-center justify-center h-[50px] relative">
          <AnimatePresence mode="wait">
            {showCTA ? (
              <motion.div
                key="continue"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-[12px] text-[#555555] tracking-[0.02em] flex items-center"
              >
                <EditableText id="welcome.ctaMobile" value={content.ctaMobile} />
                <motion.span 
                  animate={{ opacity: [1, 0.3, 1] }} 
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="ml-1"
                >
                  ▋
                </motion.span>
              </motion.div>
            ) : showSkipHint ? (
              <motion.p
                key="skip"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="text-[12px] text-[#555555] tracking-[0.02em]"
              >
                <EditableText id="welcome.skipHintMobile" value={content.skipHintMobile} />
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>

      </div>
    </div>
  )
}

