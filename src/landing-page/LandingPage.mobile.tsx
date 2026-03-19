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

export function LandingPageMobile({
  content,
  showCTA,
  showSkipHint,
  skipAnimation,
  onDialogueComplete,
}: Props) {
  const navigate = useNavigate()

  return (
    <div
      onClick={() => showCTA && navigate('/hub')}
      className="min-h-dvh bg-white dark:bg-gray-950 flex flex-col select-none cursor-pointer"
    >
      {/* Top bar — toggle right-aligned */}
      <header className="flex justify-end px-6 pt-8">
        <ThemeToggle />
      </header>

      {/* Name + role */}
      <div className="px-6 pt-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
          {content.name}
        </h1>
        <p className="text-base text-gray-500 dark:text-gray-400 mt-1">
          {content.role}
        </p>
      </div>

      {/* Dialogue */}
      <main className="flex-1 flex flex-col justify-center px-6 py-8">
        <WelcomeDialogue
          lines={content.dialogue}
          skip={skipAnimation}
          onComplete={onDialogueComplete}
        />
      </main>

      {/* CTA — thumb-reach bottom */}
      <footer className="px-6 pb-10 space-y-2">
        {showCTA && (
          <button
            type="button"
            onClick={() => navigate('/hub')}
            className="
              font-mono text-sm
              text-gray-500 dark:text-gray-400
              hover:text-gray-900 dark:hover:text-gray-100
              transition-colors duration-150
              min-h-[44px] flex items-center
            "
          >
            {content.ctaMobile}
            <span aria-hidden="true" className="ml-0.5">▋</span>
          </button>
        )}
        {showSkipHint && (
          <p className="font-mono text-xs text-gray-400 dark:text-gray-600">
            {content.skipHintMobile}
          </p>
        )}
      </footer>
    </div>
  )
}
