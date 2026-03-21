import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '@/shared/ThemeToggle'
import { QuickAccessGrid } from './QuickAccessGrid'
import { TestimonialsStrip } from './TestimonialsStrip'
import type { HubContent } from './hub.types'
import { motion } from 'framer-motion'

interface Props {
  readonly content: HubContent
}

export function HubMobile({ content }: Props) {
  const navigate = useNavigate()

  return (
    <div className="min-h-dvh bg-ambient-light dark:bg-ambient-dark pb-4 flex flex-col antialiased overflow-hidden">
      {/* ── Header ─────────────────────────────────────────────── */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-between px-6 py-5 border-b border-theme-muted bg-theme-nav backdrop-blur-md sticky top-0 z-10"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-rose-500 shrink-0 shadow-md"
            aria-hidden="true"
          />
          <div>
            <h1 className="text-base font-bold text-theme-primary tracking-tight">
              {content.ownerName}
            </h1>
            <p className="text-xs font-medium text-theme-secondary">
              {content.ownerRole}
            </p>
          </div>
        </div>
        <ThemeToggle />
      </motion.header>

      {/* ── Single column body ─────────────────────────────────── */}
      <motion.main 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="px-6 py-6 space-y-6 flex-1"
      >
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="
            w-full p-4 text-left rounded-xl
            glass-card opacity-40 cursor-not-allowed
          "
        >
          <p className="font-semibold text-theme-primary text-sm">
            {content.journeyButtonLabel}
          </p>
          <p className="text-xs text-theme-muted mt-1">
            {content.journeyButtonSubtext}
          </p>
        </button>

        <QuickAccessGrid
          label={content.quickAccessLabel}
          items={content.quickAccessItems}
        />

        <section aria-label={content.testimonialsLabel}>
          <p className="text-sm font-medium text-theme-secondary mb-3">
            {content.testimonialsLabel}
          </p>
          <TestimonialsStrip emptyStateText={content.testimonialsEmptyState} />
          <button
            type="button"
            onClick={() => navigate('/testimonial')}
            className="
              mt-3 text-sm
              text-indigo-600 dark:text-indigo-400
              hover:text-indigo-500 dark:hover:text-indigo-300
              transition-colors duration-150 cursor-pointer
            "
          >
            {content.leaveTestimonialLabel}
          </button>
        </section>
      </motion.main>
    </div>
  )
}
