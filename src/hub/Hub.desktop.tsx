import { useNavigate } from 'react-router-dom'
import { QuickAccessGrid } from './QuickAccessGrid'
import { TestimonialsStrip } from './TestimonialsStrip'
import EditableText from '@/admin/components/EditableText'
import type { HubContent } from './hub.types'
import { motion } from 'framer-motion'

interface Props {
  readonly content: HubContent
}

export function HubDesktop({ content }: Props) {
  const navigate = useNavigate()

  return (
    <div className="h-screen bg-ambient-light dark:bg-ambient-dark flex flex-col antialiased overflow-hidden">
      {/* ── Body: two-column ───────────────────────────────────── */}
      <motion.main 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="flex gap-8 px-12 pt-6 pb-12 w-full flex-1 items-stretch overflow-hidden"
      >
        {/* Left Column (Main content area) */}
        <div className="flex-1 flex flex-col justify-start pt-2 overflow-hidden">
          <div className="space-y-4">
            {/* 1. Upper Row: Hero + Photo Side-By-Side */}
            <div className="flex items-center justify-between gap-8">
              <div className="space-y-2 flex-1">
                <EditableText id="hub.ownerRole" value={content.ownerRole} as="p" className="text-sm uppercase tracking-widest text-theme-secondary font-medium" />
                <EditableText id="hub.ownerName" value={content.ownerName} as="h1" className="text-5xl font-bold text-theme-primary tracking-tight" />
                {content.ownerQuote && (
                  <EditableText id="hub.ownerQuote" value={content.ownerQuote} as="p" className="text-base text-gray-600 dark:text-gray-300 font-quote italic leading-relaxed pr-8" />
                )}
              </div>
 
              {/* Profile Image Mask */}
              <div 
                className="w-52 h-52 rounded-full bg-gradient-to-br from-indigo-500 to-rose-500 shrink-0 shadow-xl flex items-center justify-center text-gray-400 text-xs border-2 border-theme-muted"
                aria-label="Profile photo"
              >
                {content.ownerPhotoUrl ? (
                  <img src={content.ownerPhotoUrl} className="w-full h-full rounded-full object-cover" alt={content.ownerName} />
                ) : (
                  <span>[ Profile ]</span>
                )}
              </div>
            </div>
 
            {/* 2. Journey Bar */}
            <div className="pt-0">
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
                <EditableText id="hub.journeyButtonLabel" value={content.journeyButtonLabel} as="p" className="font-semibold text-sm text-theme-primary font-serif" />
                <EditableText id="hub.journeyButtonSubtext" value={content.journeyButtonSubtext} as="p" className="text-[10px] text-theme-muted mt-0.5 uppercase tracking-wider" />
              </div>
              <span className="text-lg text-gray-500">→</span>
            </button>
          </div>
 
            {/* 3. Section Divider & Quick Access */}
            <div className="space-y-4">
              <div className="h-px bg-theme-muted" />
              <QuickAccessGrid
                label="QUICK ACCESS"
                items={content.quickAccessItems}
              />
            </div>
          </div>
        </div>
 
        {/* Right Column (Sidebar Testimonials) */}
        <aside className="w-80 p-6 bg-gradient-to-b from-transparent to-theme-nav/10 rounded-2xl space-y-6 flex flex-col shrink-0 border border-theme-muted/20">
          <EditableText id="hub.testimonialsLabel" value={content.testimonialsLabel} as="p" className="text-xs font-semibold text-theme-secondary uppercase tracking-wider" />
          <div className="flex-1">
            <TestimonialsStrip emptyStateText={content.testimonialsEmptyState} />
          </div>
          <button
            type="button"
            onClick={() => navigate('/testimonial')}
            className="
              w-full text-center text-sm
              text-theme-secondary font-medium
              hover:text-theme-primary hover:underline
              transition-colors duration-150 cursor-pointer
            "
          >
            <EditableText id="hub.leaveTestimonialLabel" value={content.leaveTestimonialLabel} as="span" />
          </button>
        </aside>
      </motion.main>
    </div>
  )
}
