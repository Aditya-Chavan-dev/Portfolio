import { useState, useEffect, useCallback, useRef } from 'react'
import { useIsMobile } from '@/shared/useIsMobile'
import { useWelcomeContent } from './useWelcomeContent'
import { LandingPageDesktop } from './LandingPage.desktop'
import { LandingPageMobile }  from './LandingPage.mobile'

const SESSION_KEY = 'has_seen_welcome' as const

export default function LandingPage() {
  const isMobile               = useIsMobile()
  const { content, loading }   = useWelcomeContent()

  const [showCTA,        setShowCTA       ] = useState(false)
  const [skipAnimation,  setSkipAnimation ] = useState(false)

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

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      clearTimeout(ctaTimeoutRef.current)
      clearTimeout(enterResetTimeoutRef.current)
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

  const handleDialogueComplete = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, 'true')
    ctaTimeoutRef.current = window.setTimeout(() => setShowCTA(true), 600)
  }, [])

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950" role="status" aria-live="polite">
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
  }

  return isMobile
    ? <LandingPageMobile  {...sharedProps} />
    : <LandingPageDesktop {...sharedProps} />
}
