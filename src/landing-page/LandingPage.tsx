import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/common/shared/useIsMobile'
import { useWelcomeContent } from './useWelcomeContent'
import { LandingPageDesktop } from './LandingPage.desktop'
import { LandingPageMobile }  from './LandingPage.mobile'
import { SESSION_KEYS } from '@/common/shared/constants'

export default function LandingPage() {
  const isMobile               = useIsMobile()
  const { content, loading }   = useWelcomeContent()
  const navigate               = useNavigate()

  const [skipAnimation,  setSkipAnimation ] = useState(false)
  const [isExiting,      setIsExiting     ] = useState(false)

  const enterResetTimeoutRef  = useRef<number | undefined>(undefined)
  const enterCountRef         = useRef(0)

  const handleDialogueComplete = useCallback(() => {
    sessionStorage.setItem(SESSION_KEYS.HAS_SEEN_WELCOME, 'true')
  }, [])

  const handleNavigateHub = useCallback(() => {
    setIsExiting(true)
  }, [])

  // Combinatory input handler: Double-Enter to skip, Any-Key to continue
  useEffect(() => {
    if (isMobile) return

    const handleKey = (e: KeyboardEvent) => {
      // Ignore system/modifier keys
      if (['Control', 'Alt', 'Shift', 'Meta'].includes(e.key)) return

      // Logic: If already completed/skipped or if not Enter -> go to Hub
      // If Enter -> first press tracks for skip, second press skips
      if (e.key === 'Enter' && !skipAnimation) {
        clearTimeout(enterResetTimeoutRef.current)
        enterCountRef.current += 1
        
        if (enterCountRef.current >= 2) {
          setSkipAnimation(true)
          enterCountRef.current = 0
          return
        }

        enterResetTimeoutRef.current = window.setTimeout(() => {
          enterCountRef.current = 0
        }, 800)
        return
      }

      handleNavigateHub()
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isMobile, skipAnimation, handleNavigateHub])

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-theme-primary" role="status" aria-live="polite">
        <span className="sr-only">Loading…</span>
      </div>
    )
  }

  const sharedProps = {
    content,
    skipAnimation,
    onDialogueComplete:  handleDialogueComplete,
    onNavigateHub:       handleNavigateHub,
  }

  return (
    <>
      {isMobile ? (
        <LandingPageMobile  {...sharedProps} />
      ) : (
        <LandingPageDesktop {...sharedProps} />
      )}

      <AnimatePresence>
        {isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-[9999] pointer-events-none"
            onAnimationComplete={() => navigate('/hub')}
          />
        )}
      </AnimatePresence>
    </>
  )
}
