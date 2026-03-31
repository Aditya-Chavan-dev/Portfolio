import { useNavigate } from 'react-router-dom'
import { QuickAccessGrid } from './QuickAccessGrid'
import { TestimonialsStrip } from './TestimonialsStrip'
import EditableText from '@/admin/EditableText'
import ImageUpload from '@/admin/ImageUpload'
import { useEditMode } from '@/admin/EditModeContext'
import type { HubContent } from './hub.types'
import { motion } from 'framer-motion'
import { Sparkles, ChevronRight } from 'lucide-react'

interface Props {
  readonly content: HubContent
}

export function HubDesktop({ content }: Props) {
  const navigate = useNavigate()
  const { draftData } = useEditMode()
  
  // Resolve current display photo (Draft > Live)
  const photoUrl = draftData['hub.ownerPhotoUrl'] !== undefined 
    ? (draftData['hub.ownerPhotoUrl'] as string) 
    : content.ownerPhotoUrl

  return (
    <div className="h-screen bg-nebula flex flex-col antialiased overflow-hidden relative theme-transition">
      {/* ── Dynamic Starstruck Background ────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-system-grid opacity-[0.03]" />
        
        {/* Atmospheric Radial Blooms — Optimized Opacity Only */}
        <motion.div
          animate={{ 
            opacity: [0.08, 0.15, 0.08],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "opacity" }}
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] starstruck-bg-glow"
        />
        <motion.div
          animate={{ 
            opacity: [0.03, 0.1, 0.03],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          style={{ willChange: "opacity" }}
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] starstruck-bg-glow"
        />
      </div>
      
      {/* ── Main Bento Grid ─────────────────────────────────────── */}
      <motion.main 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="grid grid-cols-12 grid-rows-12 gap-4 p-6 w-full flex-1 relative z-10 overflow-hidden"
      >
        {/* Module 1: Profile & Hero (Holographic) */}
        <div className="col-span-9 row-span-5 ethereal-glass p-10 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4">
             <div className="w-1.5 h-1.5 bg-theme-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--accent-rgb),0.6)]" />
          </div>
          
          <div className="flex items-center justify-between gap-12">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-4">
                <EditableText 
                  id="hub.ownerRole" 
                  value={content.ownerRole} 
                  as="p" 
                  className="font-hud !text-theme-accent !opacity-80 !text-[12px]" 
                />
                <div className="h-[1px] flex-1 bg-theme-accent/20" />
              </div>
              
              <EditableText 
                id="hub.ownerName" 
                value={content.ownerName} 
                as="h1" 
                className="text-6xl font-black text-theme-primary tracking-tighter leading-none text-bloom" 
              />
              
              {content.ownerQuote && (
                <div className="max-w-[500px] border-l-2 border-theme-accent/20 pl-6 py-2 mt-6">
                  <EditableText 
                    id="hub.ownerQuote" 
                    value={content.ownerQuote} 
                    as="p" 
                    className="text-lg text-theme-secondary font-serif italic leading-relaxed opacity-80" 
                  />
                </div>
              )}
            </div>

            <ImageUpload 
              id="hub.ownerPhotoUrl"
              className="w-52 h-52 rounded-full ethereal-glass shrink-0 shadow-2xl relative overflow-hidden group/img p-1 border-theme-accent/20"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-theme-accent/20 to-transparent z-10 opacity-0 group-hover/img:opacity-100 transition-opacity" />
              {photoUrl ? (
                <img 
                  src={photoUrl} 
                  className="w-full h-full rounded-full object-cover grayscale brightness-110 group-hover/img:grayscale-0 transition-all duration-1000 scale-110 group-hover/img:scale-100" 
                  alt={content.ownerName} 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-hud text-[10px] text-theme-accent animate-pulse">
                  [ PROJECTION_OFF ]
                </div>
              )}
            </ImageUpload>
          </div>
        </div>

        {/* Module 2: Active Comms / Testimonials (System Feed) */}
        <aside className="col-span-3 row-span-12 ethereal-glass p-6 flex flex-col gap-8 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-20">
             <div className="w-8 h-8 border-t border-r border-theme-accent/40" />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <EditableText 
                  id="hub.testimonialsLabel" 
                  value={content.testimonialsLabel} 
                  as="p" 
                  className="font-hud !text-theme-accent !opacity-80 !text-[11px]" 
                />
                <div className="w-1.5 h-1.5 bg-theme-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--accent-rgb),0.6)]" />
            </div>
          </div>

          <div className="flex-1 min-h-0 relative">
            <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-theme-surface to-transparent z-10 pointer-events-none" />
            <TestimonialsStrip emptyStateText={content.testimonialsEmptyState} />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-theme-surface to-transparent z-10 pointer-events-none" />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => navigate('/testimonial')}
            className="w-full py-4 bg-theme-accent/5 border border-theme-accent/10 text-theme-accent font-hud text-[11px] hover:bg-theme-accent/20 hover:border-theme-accent/40 transition-all duration-500 flex items-center justify-center gap-4 group/btn overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
            <EditableText id="hub.leaveTestimonialLabel" value={content.leaveTestimonialLabel} as="span" className="relative z-10" />
            <span className="relative z-10 group-hover:translate-x-1 transition-transform">→</span>
          </motion.button>
        </aside>

        {/* Module 4: Immersive Journey (Ethereal Status Bar) */}
        <motion.button
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.995 }}
          onClick={() => navigate('/journey')}
          className="col-span-9 row-span-2 ethereal-glass p-8 flex items-center justify-between relative overflow-hidden group"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-theme-accent/10 via-transparent to-theme-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           <div className="flex items-center gap-10 relative z-10">
              <div className="w-14 h-14 rounded-full bg-theme-accent/10 flex items-center justify-center border border-theme-accent/20 group-hover:bg-theme-accent/30 transition-all duration-500 shadow-[0_0_20px_rgba(var(--accent-rgb),0.1)]">
                 <Sparkles size={28} className="text-theme-accent text-bloom" />
              </div>
              <div className="flex flex-col text-left">
                 <EditableText id="hub.journeyButtonLabel" value={content.journeyButtonLabel} as="span" className="text-3xl font-black uppercase tracking-[0.2em] italic text-bloom" />
                 <EditableText id="hub.journeyButtonSubtext" value={content.journeyButtonSubtext} as="span" className="font-hud !text-theme-accent !opacity-60 !text-[11px]" />
              </div>
           </div>
           
           <div className="flex items-center gap-6 relative z-10 pr-4">
              <div className="w-12 h-12 rounded-full border border-theme-accent/20 flex items-center justify-center group-hover:border-theme-accent group-hover:bg-theme-accent/10 transition-all duration-500">
                 <ChevronRight className="group-hover:translate-x-1 transition-transform text-theme-accent" />
              </div>
           </div>
        </motion.button>

        {/* Module 3: System Access / Quick Access (Ethereal Grid) */}
        <div className="col-span-9 row-span-5 ethereal-glass p-8 flex flex-col gap-6 relative overflow-hidden">
          <div className="flex items-center gap-6">
             <div className="h-[1px] flex-1 bg-theme-accent/10" />
             <div className="w-2 h-2 border border-theme-accent/40 rotate-45" />
             <div className="h-[1px] w-12 bg-theme-accent/10" />
          </div>
          
          <QuickAccessGrid
            items={content.quickAccessItems}
          />
        </div>
      </motion.main>
    </div>
  )
}
