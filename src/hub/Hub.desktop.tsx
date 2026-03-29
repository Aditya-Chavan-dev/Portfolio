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
    <div className="h-screen bg-transparent flex flex-col antialiased overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-system-grid" />
      
      {/* ── Main Bento Grid ─────────────────────────────────────── */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-12 grid-rows-12 gap-4 p-6 w-full flex-1 relative z-10 overflow-hidden"
      >
        {/* Module 1: Profile & Hero (Compact) */}
        <div className="col-span-9 row-span-5 glass-premium p-8 flex flex-col justify-center relative overflow-hidden group hover:border-amber-500/30 transition-colors">

          
          <div className="flex items-center justify-between gap-8">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-3">
                <EditableText id="hub.ownerRole" value={content.ownerRole} as="p" className="mono-label !opacity-60 !text-amber-600 dark:!text-amber-500/60" />
                <div className="h-[1px] w-8 bg-theme-default/10" />
              </div>
              <EditableText id="hub.ownerName" value={content.ownerName} as="h1" className="text-5xl font-black text-theme-primary tracking-tight leading-none" />
              {content.ownerQuote && (
                <div className="max-w-[450px] border-l-2 border-amber-500/20 pl-4 mt-4">
                  <EditableText id="hub.ownerQuote" value={content.ownerQuote} as="p" className="text-base text-theme-secondary font-serif italic leading-relaxed" />
                </div>
              )}
            </div>

            <ImageUpload 
              id="hub.ownerPhotoUrl"
              className="w-44 h-44 rounded-[2.5rem] bg-theme-base/20 shrink-0 shadow-2xl relative overflow-hidden group/img border border-theme-default/20"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover/img:opacity-100 transition-opacity" />
              {photoUrl ? (
                <img src={photoUrl} className="w-full h-full rounded-[2.4rem] object-cover grayscale group-hover/img:grayscale-0 transition-all duration-700 scale-125 group-hover/img:scale-110" alt={content.ownerName} />
              ) : (
                <span className="text-theme-muted text-[10px] font-mono">[ NULL_IMG ]</span>
              )}
            </ImageUpload>
          </div>
        </div>

        {/* Module 2: Active Comms / Testimonials (Tall Sidebar) */}
        <aside className="col-span-3 row-span-12 glass-premium p-6 flex flex-col gap-6 relative overflow-hidden hover:border-amber-500/20 transition-colors">

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <EditableText id="hub.testimonialsLabel" value={content.testimonialsLabel} as="p" className="mono-label !opacity-60" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
            </div>
          </div>

          <div className="flex-1 min-h-0">
            <TestimonialsStrip emptyStateText={content.testimonialsEmptyState} />
          </div>

          <motion.button
            whileHover={{ x: 5 }}
            type="button"
            onClick={() => navigate('/testimonial')}
            className="w-full py-3 glass-premium text-[9px] font-mono text-theme-secondary hover:text-amber-600 dark:hover:text-amber-500 hover:border-amber-500 transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-3 group"
          >
            <EditableText id="hub.leaveTestimonialLabel" value={content.leaveTestimonialLabel} as="span" />
            <span className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </motion.button>
        </aside>

        {/* Module 4: Immersive Journey (Wide Button) */}
        <motion.button
          whileHover={{ scale: 1.005 }}
          whileTap={{ scale: 0.995 }}
          onClick={() => navigate('/journey')}
          className="col-span-9 row-span-2 glass-premium-dark p-6 flex items-center justify-between relative overflow-hidden group hover:border-amber-500/40 transition-colors"
        >
           <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
           <div className="flex items-center gap-8 relative z-10">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center border border-amber-500/20 group-hover:bg-amber-500/20 transition-colors">
                 <Sparkles size={24} className="text-amber-500" />
              </div>
              <div className="flex flex-col text-left">
                 <EditableText id="hub.journeyButtonLabel" value={content.journeyButtonLabel} as="span" className="text-2xl font-black uppercase tracking-wider" />
                 <EditableText id="hub.journeyButtonSubtext" value={content.journeyButtonSubtext} as="span" className="mono-label !opacity-60 !text-inherit" />
              </div>
           </div>
           
           <div className="flex items-center gap-4 relative z-10">

              <div className="w-10 h-10 rounded-full border border-theme-default/20 flex items-center justify-center group-hover:border-amber-500 transition-colors">
                 <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </div>
           </div>
        </motion.button>

        {/* Module 3: System Access / Quick Access (Horizontal Base) */}
        <div className="col-span-9 row-span-5 glass-premium p-6 flex flex-col gap-4 relative overflow-hidden">

          <div className="flex items-center gap-4">
             <div className="h-[1px] flex-1 bg-theme-default" />
          </div>
          
          <QuickAccessGrid
            items={content.quickAccessItems}
          />
        </div>
      </motion.main>
    </div>
  )
}
