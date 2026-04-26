import { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useIsMobile } from '@/common/hooks/useIsMobile'
import { LandingPageMobile } from './LandingPage.mobile'
import { LandingPageDesktop } from './LandingPage.desktop'
import { WarpTransition } from './WarpTransition'
import { useWelcomeContent } from './useWelcomeContent'
import type { WelcomeConfig } from './landing.types'

export default function LandingPage() {
  const navigate = useNavigate()
  const isMobile = useIsMobile()
  const { content, loading } = useWelcomeContent()
  
  const [isDialogueComplete, setIsDialogueComplete] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [skipAnimation, setSkipAnimation] = useState(false)

  // 1. Keyboard skip logic (Double Enter)
  useEffect(() => {
    let lastKeyTime = 0
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        const now = Date.now()
        if (now - lastKeyTime < 300) {
          setSkipAnimation(true)
          setIsDialogueComplete(true)
        }
        lastKeyTime = now
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleDialogueComplete = useCallback(() => {
    setIsDialogueComplete(true)
  }, [])

  const handleNavigateHub = useCallback(() => {
    setIsExiting(true)
  }, [])

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center" role="status">
        <div className="w-8 h-8 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" />
      </div>
    )
  }

  const sharedProps = {
    content: content as WelcomeConfig,
    skipAnimation,
    isDialogueComplete,
    onDialogueComplete: handleDialogueComplete,
    onNavigateHub: handleNavigateHub
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
          <WarpTransition key="warp" onComplete={() => navigate('/hub')} />
        )}
      </AnimatePresence>
    </>
  )
}
