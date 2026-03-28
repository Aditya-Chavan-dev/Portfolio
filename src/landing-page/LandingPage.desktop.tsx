import { useEffect } from 'react'
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

export function LandingPageDesktop({
  content,
  showCTA,
  showSkipHint,
  skipAnimation,
  onDialogueComplete,
  onNavigateHub,
}: Props) {
  const { mode } = useEditMode()

  // Support "Press any key to continue" once dialogue is complete
  useEffect(() => {
    if (!showCTA || mode === 'edit') return

    const handleAnyKey = () => {
      onNavigateHub()
    }

    window.addEventListener('keydown', handleAnyKey)
    return () => window.removeEventListener('keydown', handleAnyKey)
  }, [showCTA, mode, onNavigateHub])

  return (
    <div className="h-screen w-screen bg-theme-base flex flex-col items-center justify-center select-none overflow-hidden py-12 relative text-theme-primary">
      <AmbientDust count={120} />
      
      {/* Background HUD Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-system-grid" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[800px] w-full flex flex-col items-center justify-center text-center relative z-10 glass-premium p-12 rounded-[2.5rem] magnetic-area"
      >
        <div className="mono-label !opacity-60 mb-8 border-b border-white/5 pb-2">
          SYSTEM_VERSION :: v3.1.0_PROD
        </div>

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
              <motion.div
                key="continue"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
                onClick={onNavigateHub}
                className="group relative cursor-pointer"
              >
                <div className="absolute -inset-4 bg-amber-500/5 blur-xl group-hover:bg-amber-500/10 transition-colors rounded-full" />
                <div className="text-[13px] text-white/40 tracking-[0.2em] font-mono group-hover:text-amber-500 transition-colors duration-300 flex items-center gap-3">
                  <EditableText id="welcome.ctaDesktop" value={content.ctaDesktop} />
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
                </div>
              </motion.div>
            ) : showSkipHint ? (
              <motion.p
                key="skip"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.2 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="mono-label text-[10px]"
              >
                <EditableText id="welcome.skipHintDesktop" value={content.skipHintDesktop} />
              </motion.p>
            ) : null}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Aesthetic Metadata corners */}
      <div className="absolute bottom-12 left-12 mono-label !opacity-30 flex flex-col gap-1 text-[8px]">
        <span>X: [REDACTED]</span>
        <span>Y: [REDACTED]</span>
      </div>
      <div className="absolute top-12 right-12 mono-label !opacity-30 text-[8px]">
        LOC: SECTOR_7_G
      </div>
    </div>
  )
}

