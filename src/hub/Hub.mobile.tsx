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
    <div className="min-h-dvh bg-ambient-light dark:bg-ambient-dark pb-8 flex flex-col antialiased overflow-x-hidden">
      {/* ── Header Layer (Minimal) ───────────────────────────────── */}
      <div className="absolute top-5 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* ── Single Column Stack ──────────────────────────────────── */}
      <motion.main 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="px-6 pt-16 flex flex-col items-center space-y-8 flex-1 w-full max-w-md mx-auto"
      >
        {/* 1. Photo Top */}
        <div 
          className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-rose-500 shrink-0 shadow-xl flex items-center justify-center text-gray-400 text-xs border-2 border-theme-muted"
          aria-label="Profile photo"
        >
          {content.ownerPhotoUrl ? (
            <img src={content.ownerPhotoUrl} className="w-full h-full rounded-full object-cover" alt={content.ownerName} />
          ) : (
            <span>[ Profile ]</span>
          )}
        </div>

        {/* 2. Hero Section (Centered) */}
        <div className="text-center space-y-2">
          <p className="text-xs uppercase tracking-widest text-theme-secondary font-medium">
            {content.ownerRole}
          </p>
          <h1 className="text-3xl font-bold text-theme-primary tracking-tight">
            {content.ownerName}
          </h1>
          {content.ownerQuote && (
            <p className="text-sm italic text-gray-600 dark:text-gray-300 font-serif px-2">
              &ldquo;{content.ownerQuote}&rdquo;
            </p>
          )}
        </div>

        {/* 3. Journey Bar */}
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="
            w-full p-5 text-left rounded-xl
            glass-card flex items-center justify-between
            opacity-40 cursor-not-allowed border border-theme-muted
          "
        >
          <div>
            <p className="font-semibold text-theme-primary font-serif text-sm">
              {content.journeyButtonLabel}
            </p>
            <p className="text-xs text-theme-muted mt-1 uppercase tracking-wider">
              {content.journeyButtonSubtext}
            </p>
          </div>
          <span className="text-lg text-theme-secondary">→</span>
        </button>

        {/* 4. Section Divider & Quick Access */}
        <div className="w-full space-y-5">
          <div className="h-px bg-theme-muted w-full" />
          <QuickAccessGrid
            label="QUICK ACCESS"
            items={content.quickAccessItems}
          />
        </div>

        {/* 5. Testimonials Section */}
        <section className="w-full space-y-4" aria-label={content.testimonialsLabel}>
          <p className="text-xs font-semibold text-theme-secondary uppercase tracking-wider text-center">
            {content.testimonialsLabel}
          </p>
          <TestimonialsStrip emptyStateText={content.testimonialsEmptyState} />
          <button
            type="button"
            onClick={() => navigate('/testimonial')}
            className="
              mt-2 text-sm w-full text-center
              text-theme-secondary font-medium hover:underline
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
