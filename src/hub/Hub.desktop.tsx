import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '@/shared/ThemeToggle'
import { QuickAccessGrid } from './QuickAccessGrid'
import { TestimonialsStrip } from './TestimonialsStrip'
import type { HubContent } from './hub.types'
import { motion } from 'framer-motion'

interface Props {
  readonly content: HubContent
}

export function HubDesktop({ content }: Props) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-ambient-light dark:bg-ambient-dark flex flex-col antialiased overflow-hidden">
      {/* ── Header ─────────────────────────────────────────────── */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex items-center justify-between px-10 py-6 border-b border-theme-muted bg-theme-nav backdrop-blur-md sticky top-0 z-10"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-rose-500 shrink-0 shadow-md"
            aria-hidden="true"
          />
          <div>
            <h1 className="text-xl font-bold text-theme-primary tracking-tight">
              {content.ownerName}
            </h1>
            <p className="text-sm font-medium text-theme-secondary">
              {content.ownerRole}
            </p>
          </div>
        </div>
        <ThemeToggle />
      </motion.header>

      {/* ── Body: two-column ───────────────────────────────────── */}
      <motion.main 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="flex gap-8 p-10 max-w-7xl mx-auto w-full flex-1"
      >
        {/* Left (60%) */}
        <div className="flex-1 space-y-6">
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="
              w-full p-5 text-left rounded-xl
              glass-card opacity-40 cursor-not-allowed
            "
          >
            <p className="font-semibold text-theme-primary">
              {content.journeyButtonLabel}
            </p>
            <p className="text-sm text-theme-muted mt-1">
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
          <p className="text-sm font-medium text-theme-secondary">
            {content.testimonialsLabel}
          </p>
          <TestimonialsStrip emptyStateText={content.testimonialsEmptyState} />
          <button
            type="button"
            onClick={() => navigate('/testimonial')}
            className="
              w-full text-left text-sm
              text-theme-secondary
              hover:text-theme-primary
              transition-colors duration-150
            "
          >
            {content.leaveTestimonialLabel}
          </button>
        </aside>
      </motion.main>
    </div>
  )
}
