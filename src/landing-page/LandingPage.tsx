import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/common/hooks/useIsMobile'
import { useWelcomeContent } from './useWelcomeContent'
import { LandingPageDesktop } from './LandingPage.desktop.tsx'
import { LandingPageMobile }  from './LandingPage.mobile.tsx'
import { SESSION_KEYS } from '@/common/shared/constants'

export default function LandingPage() {
  const isMobile               = useIsMobile()
  const { content, loading }   = useWelcomeContent()
  const navigate               = useNavigate()

  const [skipAnimation,  setSkipAnimation ] = useState(false)
  const [isDialogueComplete, setIsDialogueComplete] = useState(false)
  const [isExiting,      setIsExiting     ] = useState(false)

  const enterResetTimeoutRef  = useRef<number | undefined>(undefined)
  const enterCountRef         = useRef(0)

  const handleDialogueComplete = useCallback(() => {
    setIsDialogueComplete(true)
    sessionStorage.setItem(SESSION_KEYS.HAS_SEEN_WELCOME, 'true')
  }, [])

  const handleNavigateHub = useCallback(() => {
    setIsExiting(true)
  }, [])

  // Navigation listener - re-enabled post-completion
  useEffect(() => {
    if (!isDialogueComplete) return

    const handleContinue = (e: MouseEvent | KeyboardEvent) => {
      // If it's a mouse event, ignore if the user clicked an interactive control (like a theme toggle)
      if (e instanceof MouseEvent) {
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('a') || target.closest('[role="button"]')) return;
      }
      handleNavigateHub()
    }
    
    window.addEventListener('keydown', handleContinue)
    window.addEventListener('mousedown', handleContinue)
    return () => {
      window.removeEventListener('keydown', handleContinue)
      window.removeEventListener('mousedown', handleContinue)
    }
  }, [isDialogueComplete, handleNavigateHub])

  // Skip detection (Double-Enter)
  useEffect(() => {
    if (isMobile) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !skipAnimation && !isDialogueComplete) {
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
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isMobile, skipAnimation, isDialogueComplete])

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
    isDialogueComplete,
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
