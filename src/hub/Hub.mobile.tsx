import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '@/common/shared/ThemeToggle'
import { QuickAccessGrid } from './QuickAccessGrid'
import { TestimonialsStrip } from './TestimonialsStrip'
import EditableText from '@/admin/EditableText'
import ImageUpload from '@/admin/ImageUpload'
import { useEditMode } from '@/admin/EditModeContext'
import type { HubContent } from './hub.types'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

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
    <div className="min-h-dvh bg-nebula pb-12 flex flex-col antialiased overflow-x-hidden relative theme-transition">
      {/* ── Dynamic Starstruck Background ────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-system-grid opacity-[0.03]" />
        <div className="absolute top-[10%] left-[-20%] w-[80%] h-[40%] starstruck-bg-glow opacity-60" style={{ willChange: "opacity" }} />
        <div className="absolute bottom-[10%] right-[-20%] w-[80%] h-[40%] starstruck-bg-glow opacity-40" style={{ willChange: "opacity" }} />
      </div>

      {/* ── Header Layer (Minimal) ───────────────────────────────── */}
      <div className="absolute top-6 right-6 z-30">
        <ThemeToggle />
      </div>

      {/* ── Single Column Stack ──────────────────────────────────── */}
      <motion.main 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="px-6 pt-16 flex flex-col items-center space-y-8 flex-1 w-full max-w-md mx-auto"
      >
        {/* 1. Photo Top (Holographic) */}
        <div className="relative group/img">
          <div className="absolute inset-0 bg-theme-accent/20 blur-2xl rounded-full animate-pulse z-0" />
          <ImageUpload 
            id="hub.ownerPhotoUrl"
            className="w-36 h-36 rounded-full ethereal-glass shrink-0 shadow-2xl relative z-10 flex items-center justify-center border-theme-accent/30 overflow-hidden"
          >
            {photoUrl ? (
              <img src={photoUrl} className="w-full h-full rounded-full object-cover grayscale brightness-110 group-hover/img:grayscale-0 transition-all duration-1000" alt={content.ownerName} />
            ) : (
              <div className="font-hud text-[10px] text-theme-accent animate-pulse">[ PROJECTION ]</div>
            )}
          </ImageUpload>
        </div>

        {/* 2. Hero Section (Centered) */}
        <div className="text-center space-y-3 relative z-10">
          <EditableText id="hub.ownerRole" value={content.ownerRole} as="p" className="font-hud !text-theme-accent !opacity-80 !text-[11px]" />
          <EditableText id="hub.ownerName" value={content.ownerName} as="h1" className="text-4xl font-black text-theme-primary tracking-tighter text-bloom" />
          {content.ownerQuote && (
            <div className="max-w-[280px] mx-auto mt-4 px-4 py-2 border-x border-theme-accent/10">
              <EditableText id="hub.ownerQuote" value={content.ownerQuote} as="p" className="text-[13px] italic text-theme-secondary font-serif leading-relaxed" />
            </div>
          )}
        </div>

        {/* 3. Journey Bar (Ethereal Status) */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate('/journey')}
          className="
            w-full p-6 text-left rounded-2xl
            ethereal-glass flex items-center justify-between
            group relative overflow-hidden
          "
        >
          <div className="absolute inset-y-0 left-0 w-1 bg-theme-accent opacity-40" />
          <div className="relative z-10">
            <EditableText id="hub.journeyButtonLabel" value={content.journeyButtonLabel} as="p" className="text-xl font-black italic tracking-widest text-theme-primary text-bloom" />
            <EditableText id="hub.journeyButtonSubtext" value={content.journeyButtonSubtext} as="p" className="font-hud !text-theme-accent !opacity-60 !text-[10px] mt-1" />
          </div>
          <ChevronRight className="text-theme-accent opacity-40 group-active:translate-x-1 transition-transform" />
        </motion.button>

        {/* 4. Section Divider & Quick Access */}
        <div className="w-full space-y-5">
          <div className="h-px bg-theme-muted w-full" />
          <QuickAccessGrid
            items={content.quickAccessItems}
          />
        </div>

        {/* 5. Testimonials Section (Live Feed) */}
        <section className="w-full space-y-6 relative z-10" aria-label={content.testimonialsLabel}>
          <div className="flex items-center justify-center gap-3">
             <div className="h-px flex-1 bg-theme-accent/10" />
             <EditableText id="hub.testimonialsLabel" value={content.testimonialsLabel} as="p" className="font-hud !text-theme-accent !opacity-80 !text-[10px]" />
             <div className="w-1 h-1 bg-theme-accent rounded-full animate-pulse" />
             <div className="h-px flex-1 bg-theme-accent/10" />
          </div>
          
          <div className="relative">
            <TestimonialsStrip emptyStateText={content.testimonialsEmptyState} />
          </div>
          
          <button
            type="button"
            onClick={() => navigate('/testimonial')}
            className="
              mt-4 w-full py-4 text-center rounded-xl
              bg-theme-accent/5 border border-theme-accent/10
              text-theme-accent font-hud text-[11px] 
              active:bg-theme-accent/20 transition-all duration-300
            "
          >
            <EditableText id="hub.leaveTestimonialLabel" value={content.leaveTestimonialLabel} as="span" />
          </button>
        </section>
      </motion.main>
    </div>
  )
}
