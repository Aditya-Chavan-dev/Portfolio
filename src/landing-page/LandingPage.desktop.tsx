import { WelcomeDialogue } from './WelcomeDialogue'
import type { WelcomeConfig } from './landing.types'
import { AmbientDust } from './AmbientDust'
import { motion } from 'framer-motion'
import EditableText from '@/admin/EditableText'

interface Props {
  readonly content:        WelcomeConfig
  readonly skipAnimation:  boolean
  readonly onDialogueComplete: () => void
  readonly onNavigateHub:  () => void
}

export function LandingPageDesktop({
  content,
  skipAnimation,
  onDialogueComplete,
  onNavigateHub,
}: Props) {

  return (
    <div className="h-screen w-screen bg-theme-base flex flex-col items-center justify-center select-none overflow-hidden py-6 relative text-theme-primary transition-colors duration-700">
      <AmbientDust count={120} />
      
      {/* Cinematic HUD Layer - Refined V2 */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-system-grid opacity-[0.15]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.6)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.9)_100%)]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent opacity-30" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/10 to-transparent opacity-30" />
      </div>
      
      <div className="w-full flex-1 flex flex-col items-center justify-start relative z-10 px-12 overflow-hidden py-4">
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
            onClick={onNavigateHub}
            className="group relative cursor-pointer"
          >
            <div className="absolute -inset-4 bg-amber-500/5 blur-xl group-hover:bg-amber-500/10 transition-colors rounded-full" />
            <div className="text-[14px] text-theme-muted tracking-[0.2em] font-mono group-hover:text-theme-accent transition-colors duration-300 flex items-center gap-3">
              <EditableText id="welcome.ctaDesktop" value={content.ctaDesktop || 'ENTER_WORKSPACE'} />
              <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Metadata corners — minimalist HUD - V2 Subtler */}
      <div className="absolute top-8 left-8 mono-label !opacity-10 hidden md:flex flex-col gap-1 text-[8px]">
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-amber-500/40 rounded-full" />
          <span>SYS.RDY: TRUE</span>
        </div>
        <span>PROTO: 2.4.0</span>
      </div>
      
      <div className="absolute bottom-12 left-12 mono-label !opacity-10 flex flex-col gap-1 text-[7px]">
        <span>REG: [ENCRYPTED]</span>
      </div>
      
      <div className="absolute bottom-12 right-12 mono-label !opacity-10 text-[7px] text-right">
        <span>SESSION_INIT</span>
      </div>
    </div>
  )
}

