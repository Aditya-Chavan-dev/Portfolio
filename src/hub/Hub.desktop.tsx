import { useNavigate } from 'react-router-dom'
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
      
      {/* ── Top Header Service ──────────────────────────────────── */}
      <header className="px-12 pt-8 pb-4 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
             <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
          </div>
          <div className="flex flex-col">
            <span className="mono-label !opacity-100 text-amber-500">OPERATIVE_HUD</span>
            <span className="text-[10px] text-white/20 font-mono tracking-tighter">SEC_LVL_04 // [DATAREADY]</span>
          </div>
        </div>
        
        <div className="flex items-center gap-8">
           <div className="flex flex-col items-end">
             <span className="mono-label !opacity-30">LOCAL_TIME</span>
             <span className="text-xs font-mono text-white/40">{new Date().toLocaleTimeString()}</span>
           </div>
        </div>
      </header>

      {/* ── Main Bento Grid ─────────────────────────────────────── */}
      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-12 grid-rows-6 gap-6 px-12 pb-12 w-full flex-1 relative z-10 overflow-y-auto scrollbar-hide"
      >
        {/* Module 1: Profile & Hero (Large Bento) */}
        <div className="col-span-8 row-span-4 glass-premium p-10 flex flex-col justify-between relative overflow-hidden group hover:border-amber-500/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 mono-label !opacity-10">MOD_PROFILE_0x1</div>
          
          <div className="flex items-start justify-between gap-12">
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <EditableText id="hub.ownerRole" value={content.ownerRole} as="p" className="mono-label !opacity-60 !text-amber-500/60" />
                <div className="h-[1px] w-8 bg-white/5" />
              </div>
              <EditableText id="hub.ownerName" value={content.ownerName} as="h1" className="text-7xl font-black text-white tracking-tight" />
              {content.ownerQuote && (
                <div className="max-w-[500px] border-l-2 border-amber-500/20 pl-6 mt-8">
                  <EditableText id="hub.ownerQuote" value={content.ownerQuote} as="p" className="text-lg text-white/50 font-serif italic leading-relaxed" />
                </div>
              )}
            </div>

            <ImageUpload 
              id="hub.ownerPhotoUrl"
              className="w-64 h-64 rounded-[2rem] bg-white/5 shrink-0 shadow-2xl relative overflow-hidden group/img p-1 border border-white/10"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover/img:opacity-100 transition-opacity" />
              {photoUrl ? (
                <img src={photoUrl} className="w-full h-full rounded-[1.8rem] object-cover grayscale group-hover/img:grayscale-0 transition-all duration-700 scale-105 group-hover/img:scale-100" alt={content.ownerName} />
              ) : (
                <span className="text-white/20 text-[10px] font-mono">[ NULL_IMG ]</span>
              )}
            </ImageUpload>
          </div>

          <div className="flex items-center gap-6 mt-12 pb-2">
             <div className="flex-1 h-[1px] bg-white/5" />
             <div className="flex gap-4">
                <div className="w-2 h-2 bg-amber-500/40 rounded-full" />
                <div className="w-2 h-2 bg-white/10 rounded-full" />
                <div className="w-2 h-2 bg-white/10 rounded-full" />
             </div>
          </div>
        </div>

        {/* Module 2: Active Comms / Testimonials (Tall Sidebar) */}
        <aside className="col-span-4 row-span-6 glass-premium p-8 flex flex-col gap-8 relative overflow-hidden hover:border-white/20 transition-colors">
          <div className="absolute top-0 right-0 p-4 mono-label !opacity-10">MOD_COMMS_0x2</div>
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
            className="w-full py-4 glass-premium !bg-white/5 text-[10px] font-mono text-white/40 hover:text-amber-500 hover:border-amber-500/40 transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-3 group"
          >
            <EditableText id="hub.leaveTestimonialLabel" value={content.leaveTestimonialLabel} as="span" />
            <span className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
          </motion.button>
        </aside>

        {/* Module 3: System Access / Quick Access (Horizontal Base) */}
        <div className="col-span-8 row-span-2 glass-premium p-8 flex flex-col gap-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 mono-label !opacity-10">MOD_FS_0x3</div>
          <div className="flex items-center gap-4">
             <span className="mono-label !opacity-60">QUICK_ACCESS_INIT</span>
             <div className="h-[1px] flex-1 bg-white/5" />
          </div>
          
          <QuickAccessGrid
            items={content.quickAccessItems}
          />
        </div>
      </motion.main>
    </div>
  )
}
