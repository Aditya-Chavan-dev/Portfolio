import { WelcomeDialogue } from './WelcomeDialogue'
import type { WelcomeConfig } from './landing.types'
import { AmbientDust } from './AmbientDust'
import { motion } from 'framer-motion'
import { useEditMode } from '@/admin/EditModeContext'
import EditableText from '@/admin/EditableText'

interface Props {
  readonly content:        WelcomeConfig
  readonly skipAnimation:  boolean
  readonly onDialogueComplete: () => void
  readonly onNavigateHub:  () => void
}

export function LandingPageMobile({
  content,
  skipAnimation,
  onDialogueComplete,
  onNavigateHub,
}: Props) {
  const { mode } = useEditMode()

  return (
    <div
      onClick={() => mode !== 'edit' && onNavigateHub()}
      role="button"
      tabIndex={0}
      className="min-h-dvh bg-theme-base text-theme-primary flex flex-col items-center justify-center select-none cursor-pointer overflow-hidden py-4 relative px-8 transition-colors duration-700"
    >
      <AmbientDust count={40} />
      
      {/* Cinematic HUD Layer */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-system-grid opacity-[0.2]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.5)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      </div>

      <div className="w-full flex-1 flex flex-col items-center justify-start text-center relative z-10 overflow-hidden py-2">
        
        {/* 2. Dialogue (Full Screen Width) */}
        <WelcomeDialogue
          lines={content.dialogue}
          skip={skipAnimation}
          onComplete={onDialogueComplete}
          highlightIndex={content.highlightIndex}
        />

        {/* 3. Prompts (Persistent Button) */}
        <div className="mt-8 flex flex-col items-center justify-center h-[50px] relative">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-[14px] text-theme-muted tracking-[0.2em] font-mono flex items-center gap-2"
          >
            <EditableText id="welcome.ctaMobile" value={content.ctaMobile || 'ENTER_WORKSPACE'} />
            <motion.span 
              animate={{ opacity: [1, 0.3, 1] }} 
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="text-amber-500"
            >
              ▋
            </motion.span>
          </motion.div>
        </div>

      </div>
    </div>
  )
}

