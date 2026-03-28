import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '@/common/shared/ThemeToggle'
import { QuickAccessGrid } from './QuickAccessGrid'
import { TestimonialsStrip } from './TestimonialsStrip'
import EditableText from '@/admin/EditableText'
import ImageUpload from '@/admin/ImageUpload'
import { useEditMode } from '@/admin/EditModeContext'
import type { HubContent } from './hub.types'
import { motion } from 'framer-motion'

interface Props {
  readonly content: HubContent
}

export function HubMobile({ content }: Props) {
  const navigate = useNavigate()
  const { draftData } = useEditMode()

  // Resolve current display photo (Draft > Live)
  const photoUrl = draftData['hub.ownerPhotoUrl'] !== undefined 
    ? (draftData['hub.ownerPhotoUrl'] as string) 
    : content.ownerPhotoUrl

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
        <ImageUpload 
          id="hub.ownerPhotoUrl"
          className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-rose-500 shrink-0 shadow-xl flex items-center justify-center border-2 border-theme-muted"
        >
          {photoUrl ? (
            <img src={photoUrl} className="w-full h-full rounded-full object-cover" alt={content.ownerName} />
          ) : (
            <span className="text-gray-400 text-xs">[ Profile ]</span>
          )}
        </ImageUpload>

        {/* 2. Hero Section (Centered) */}
        <div className="text-center space-y-2">
          <EditableText id="hub.ownerRole" value={content.ownerRole} as="p" className="text-xs uppercase tracking-widest text-theme-secondary font-medium" />
          <EditableText id="hub.ownerName" value={content.ownerName} as="h1" className="text-3xl font-bold text-theme-primary tracking-tight" />
          {content.ownerQuote && (
            <EditableText id="hub.ownerQuote" value={content.ownerQuote} as="p" className="text-sm italic text-gray-600 dark:text-gray-300 font-serif px-2" />
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
            <EditableText id="hub.journeyButtonLabel" value={content.journeyButtonLabel} as="p" className="font-semibold text-theme-primary font-serif text-sm" />
            <EditableText id="hub.journeyButtonSubtext" value={content.journeyButtonSubtext} as="p" className="text-xs text-theme-muted mt-1 uppercase tracking-wider" />
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
          <EditableText id="hub.testimonialsLabel" value={content.testimonialsLabel} as="p" className="text-xs font-semibold text-theme-secondary uppercase tracking-wider text-center" />
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
            <EditableText id="hub.leaveTestimonialLabel" value={content.leaveTestimonialLabel} as="span" />
          </button>
        </section>
      </motion.main>
    </div>
  )
}
