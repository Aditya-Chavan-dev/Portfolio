import { useState, useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/shared/useIsMobile'
import { useWelcomeContent } from './useWelcomeContent'
import { LandingPageDesktop } from './LandingPage.desktop'
import { LandingPageMobile }  from './LandingPage.mobile'
import { useThemeContext } from '@/shared/ThemeProvider'

const SESSION_KEY = 'has_seen_welcome' as const

export default function LandingPage() {
  const isMobile               = useIsMobile()
  const { content, loading }   = useWelcomeContent()
  const navigate               = useNavigate()
  const { setTheme }           = useThemeContext()

  // Force dark theme for the cinematic intro
  useEffect(() => {
    setTheme('dark')
  }, [setTheme])

  const [showCTA,        setShowCTA       ] = useState(false)
  const [skipAnimation,  setSkipAnimation ] = useState(false)
  const [isExiting,      setIsExiting     ] = useState(false)

  const ctaTimeoutRef         = useRef<number | undefined>(undefined)
  const enterResetTimeoutRef  = useRef<number | undefined>(undefined)
  const enterCountRef         = useRef(0)

  // SSR-safe: read sessionStorage client-side only
  useEffect(() => {
    const seen = sessionStorage.getItem(SESSION_KEY) === 'true'
    if (seen) {
      setShowCTA(true)
      setSkipAnimation(true)
    }
  }, [])

  // Double-Enter to skip on desktop
  useEffect(() => {
    if (isMobile) return

    const handleKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return

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

    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [isMobile])

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(ctaTimeoutRef.current)
      clearTimeout(enterResetTimeoutRef.current)
    }
  }, [])

  const handleDialogueComplete = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, 'true')
    ctaTimeoutRef.current = window.setTimeout(() => setShowCTA(true), 2000)
  }, [])

  const handleNavigateHub = useCallback(() => {
    setIsExiting(true)
  }, [])

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-theme-primary" role="status" aria-live="polite">
        <span className="sr-only">Loading…</span>
      </div>
    )
  }

  const sharedProps = {
    content,
    showCTA,
    showSkipHint:        !showCTA,
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
