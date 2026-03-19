import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '@/shared/ThemeToggle'
import { QuickAccessGrid } from './QuickAccessGrid'
import { TestimonialsStrip } from './TestimonialsStrip'
import type { HubContent } from './hub.types'

interface Props {
  readonly content: HubContent
}

export function HubDesktop({ content }: Props) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-gray-100 dark:border-gray-900">
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0"
            aria-hidden="true"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {content.ownerName}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {content.ownerRole}
            </p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      {/* ── Body: two-column ───────────────────────────────────── */}
      <main className="flex gap-8 p-8">
        {/* Left (60%) */}
        <div className="flex-1 space-y-6">
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="
              w-full p-5 text-left rounded-xl
              border border-gray-200 dark:border-gray-800
              opacity-50 cursor-not-allowed
            "
          >
            <p className="font-semibold text-gray-900 dark:text-gray-100">
              {content.journeyButtonLabel}
            </p>
            <p className="text-sm text-gray-400 dark:text-gray-600 mt-1">
              {content.journeyButtonSubtext}
            </p>
          </button>

          <QuickAccessGrid
            label={content.quickAccessLabel}
            items={content.quickAccessItems}
          />
        </div>

        {/* Right (40%) */}
        <aside className="w-80 space-y-4 shrink-0">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {content.testimonialsLabel}
          </p>
          <TestimonialsStrip emptyStateText={content.testimonialsEmptyState} />
          <button
            type="button"
            onClick={() => navigate('/testimonial')}
            className="
              w-full text-left text-sm
              text-gray-500 dark:text-gray-400
              hover:text-gray-900 dark:hover:text-gray-100
              transition-colors duration-150
            "
          >
            {content.leaveTestimonialLabel}
          </button>
        </aside>
      </main>
    </div>
  )
}
