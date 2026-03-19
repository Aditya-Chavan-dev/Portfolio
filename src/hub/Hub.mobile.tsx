import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '@/shared/ThemeToggle'
import { QuickAccessGrid } from './QuickAccessGrid'
import { TestimonialsStrip } from './TestimonialsStrip'
import type { HubContent } from './hub.types'

interface Props {
  readonly content: HubContent
}

export function HubMobile({ content }: Props) {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh bg-white dark:bg-gray-950 pb-4">
      {/* ── Header ─────────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-gray-900">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 shrink-0"
            aria-hidden="true"
          />
          <div>
            <h1 className="text-base font-bold text-gray-900 dark:text-gray-100">
              {content.ownerName}
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {content.ownerRole}
            </p>
          </div>
        </div>
        <ThemeToggle />
      </header>

      {/* ── Single column body ─────────────────────────────────── */}
      <main className="px-6 py-6 space-y-6">
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="
            w-full p-4 text-left rounded-xl
            border border-gray-200 dark:border-gray-800
            opacity-50 cursor-not-allowed
          "
        >
          <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
            {content.journeyButtonLabel}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-1">
            {content.journeyButtonSubtext}
          </p>
        </button>

        <QuickAccessGrid
          label={content.quickAccessLabel}
          items={content.quickAccessItems}
        />

        <section aria-label={content.testimonialsLabel}>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
            {content.testimonialsLabel}
          </p>
          <TestimonialsStrip emptyStateText={content.testimonialsEmptyState} />
          <button
            type="button"
            onClick={() => navigate('/testimonial')}
            className="
              mt-3 text-sm
              text-gray-500 dark:text-gray-400
              hover:text-gray-900 dark:hover:text-gray-100
              transition-colors duration-150
            "
          >
            {content.leaveTestimonialLabel}
          </button>
        </section>
      </main>
    </div>
  )
}
