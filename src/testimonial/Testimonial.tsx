import { useState, useEffect } from 'react'
import { useNavigate }          from 'react-router-dom'
import { getTestimonialPageContent } from '@/common/shared/firestore.service'
import { TestimonialForm }      from './TestimonialForm'
import EditableText from '@/admin/EditableText'
import type { TestimonialPageContent } from './testimonial.types'
import { testimonialFallback as fallbackContent } from '@/common/config/fallbacks'
import { CinematicOverlay } from '@/landing-page/CinematicOverlay'
import { motion } from 'framer-motion'
import { Terminal, Shield, Activity, ChevronLeft } from 'lucide-react'

import { LoadingSpinner } from '@/common/components/LoadingSpinner'

export default function Testimonial() {
  const navigate = useNavigate()
  const [content, setContent] = useState<TestimonialPageContent | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getTestimonialPageContent()
      .then((data) => {
        if (!cancelled) setContent(data ?? (fallbackContent as unknown as TestimonialPageContent))
      })
      .catch(() => {
        if (!cancelled) setContent(fallbackContent as unknown as TestimonialPageContent)
      })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [])

  if (loading || !content) {
    return <LoadingSpinner fullScreen label="OPENING UPLINK…" />
  }

  return (
    <div className="min-h-screen bg-[#050507] flex items-center justify-center p-6 relative overflow-hidden">
      <CinematicOverlay />
      <div className="absolute inset-0 pointer-events-none nebula-glow-gold opacity-5" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-xl relative z-10"
      >
        {/* Navigation Wrapper */}
        <div className="flex items-center justify-between mb-8">
           <button
             type="button"
             onClick={() => navigate('/hub')}
             className="flex items-center gap-2 text-[10px] font-mono font-bold text-white/30 hover:text-amber-500 uppercase tracking-[0.3em] transition-all group"
           >
             <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
             <EditableText id="testimonial.backLabel" value={content.backLabel} />
           </button>
           
           <div className="flex items-center gap-4 opacity-40">
              <div className="w-8 h-px bg-white/10" />
              <Shield size={14} className="text-amber-500" />
           </div>
        </div>

        {/* Transmission Module Frame */}
        <div className="bg-white/[0.015] border border-white/5 rounded-[2.5rem] p-10 space-y-10 relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
           
           {/* Header Intelligence */}
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                    <Terminal size={16} />
                 </div>
                 <span className="text-[10px] font-mono tracking-[0.4em] text-white/30 uppercase">Uplink_Channel // 04</span>
              </div>
              
              <div className="space-y-2">
                 <h1 className="text-4xl font-bold text-white tracking-tighter uppercase font-serif">
                   <EditableText id="testimonial.pageTitle" value={content.pageTitle} />
                 </h1>
                 <p className="text-sm text-white/40 leading-relaxed italic">
                   <EditableText id="testimonial.pageSubtitle" value={content.pageSubtitle} />
                 </p>
              </div>
           </div>

           {/* The Core Form Component */}
           <TestimonialForm
             namePlaceholder={content.namePlaceholder}
             companyPlaceholder={content.companyPlaceholder}
             rolePlaceholder={content.rolePlaceholder}
             messagePlaceholder={content.messagePlaceholder}
             emailPlaceholder={content.emailPlaceholder}
             consentLabel={content.consentLabel}
             submitLabel={content.submitLabel}
             prototypeNotice={content.prototypeNotice}
           />

           {/* Module Status Footer */}
           <div className="pt-6 border-t border-white/[0.03] flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
              <div className="flex items-center gap-3">
                 <Activity size={10} className="text-emerald-500 animate-pulse" />
                 <span className="text-[8px] font-mono text-white/40 tracking-[0.3em] uppercase italic">Handshake_Stable</span>
              </div>
           </div>
        </div>
      </motion.div>
    </div>
  )
}
