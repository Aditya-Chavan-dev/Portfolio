import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '@/shared/ThemeToggle'
import { WelcomeDialogue } from './WelcomeDialogue'
import type { WelcomeContent } from './landing.types'

interface Props {
  readonly content:        WelcomeContent
  readonly showCTA:        boolean
  readonly showSkipHint:   boolean
  readonly skipAnimation:  boolean
  readonly onDialogueComplete: () => void
}

export function LandingPageDesktop({
  content,
  showCTA,
  showSkipHint,
  skipAnimation,
  onDialogueComplete,
}: Props) {
  const navigate = useNavigate()

  // Support "Press any key to continue" once dialogue is complete
  useEffect(() => {
    if (!showCTA) return

    const handleAnyKey = () => {
      navigate('/hub')
    }

    window.addEventListener('keydown', handleAnyKey)
    return () => window.removeEventListener('keydown', handleAnyKey)
  }, [showCTA, navigate])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex flex-col select-none">
      {/* Top bar */}
      <header className="flex justify-between items-start px-16 pt-16">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {content.name}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-1">
            {content.role}
          </p>
        </div>
        <ThemeToggle />
      </header>

      {/* Dialogue — vertically centred in remaining space */}
      <main className="flex-1 flex flex-col justify-center px-16">
        <WelcomeDialogue
          lines={content.dialogue}
          skip={skipAnimation}
          onComplete={onDialogueComplete}
        />
      </main>

      {/* CTA — pinned bottom-left */}
      <footer className="px-16 pb-16 space-y-2">
        {showCTA && (
          <button
            type="button"
            onClick={() => navigate('/hub')}
            className="
              block font-mono text-sm
              text-gray-500 dark:text-gray-400
              hover:text-gray-900 dark:hover:text-gray-100
              transition-colors duration-150
            "
          >
            {content.ctaDesktop}
            <span aria-hidden="true" className="ml-0.5">▋</span>
          </button>
        )}
        {showSkipHint && (
          <p className="font-mono text-xs text-gray-400 dark:text-gray-600">
            {content.skipHintDesktop}
          </p>
        )}
      </footer>
    </div>
  )
}
