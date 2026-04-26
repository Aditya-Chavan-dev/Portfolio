import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { motion } from 'framer-motion'
import { MessageSquare, Quote, User, Activity, Shield, Terminal } from 'lucide-react'
import { Testimonial } from '@/common/types/testimonial.types'
import { DetailLayout } from '@/layouts/DetailLayout'

export default function TestimonialGallery() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const q = query(
          collection(db, 'testimonials'),
          where('status', '==', 'approved'),
          orderBy('approvedAt', 'desc')
        )
        const snapshot = await getDocs(q)
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Testimonial))
        setTestimonials(data)
      } catch (err) {
        console.error('Failed to fetch testimonials:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchTestimonials()
  }, [])

  return (
    <DetailLayout title="Testimonials">
      <div className="flex flex-col gap-20">
        {/* ─── Header Section ───────────────────────────────────── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4 max-w-xl">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/10 rounded-lg text-amber-500 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                   <MessageSquare size={16} />
                </div>
                <span className="text-[10px] font-mono tracking-[0.4em] text-white/30 uppercase">Signal_Repository // External_Review</span>
             </div>
             <h2 className="text-5xl font-bold text-white tracking-tighter font-serif uppercase leading-none">The Signal Archive</h2>
             <p className="text-sm text-white/40 leading-relaxed italic">
               A technical record of verified transmissions and architectural validations from cross-sector partners.
             </p>
          </div>
          
          <div className="flex items-center gap-6 text-[10px] font-mono uppercase tracking-[0.2em] opacity-40">
             <div className="flex items-center gap-2">
                <Shield size={12} className="text-emerald-500" />
                Auth_Signals: 0{testimonials.length}
             </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-48 rounded-[2.5rem] bg-white/5 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <>
            {testimonials.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {testimonials.map((t, idx) => (
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    viewport={{ once: true }}
                    key={t.id}
                    className="group relative p-10 rounded-[2.5rem] bg-white/[0.015] border border-white/5 hover:border-amber-500/20 hover:bg-white/[0.03] transition-all duration-700 flex flex-col gap-8"
                  >
                    <Quote className="absolute top-8 right-10 text-white/[0.03] group-hover:text-amber-500/10 transition-colors" size={64} />
                    
                    <div className="space-y-6 relative z-10">
                      <p className="text-sm leading-relaxed text-white/50 italic font-mono whitespace-pre-wrap lowercase tracking-tight">
                        "{t.text || (t as any).message}"
                      </p>

                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl overflow-hidden bg-white/5 border border-white/5 flex-shrink-0 group-hover:border-amber-500/20 transition-colors">
                          {t.photo ? (
                            <img src={t.photo} className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" alt={t.name} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/10">
                              <User size={24} />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 space-y-1">
                          <h4 className="text-sm font-bold text-white uppercase font-serif tracking-wide">{t.name}</h4>
                          <div className="flex items-center gap-2">
                             <Terminal size={10} className="text-amber-500/30" />
                             <p className="text-[9px] text-white/30 uppercase tracking-widest truncate font-mono">
                               {t.relationship}{t.company ? ` // ${t.company}` : ''}
                             </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Footer Telemetry */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/[0.03] opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0">
                       <div className="flex items-center gap-3">
                          <Activity size={10} className="text-emerald-500/60" />
                          <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest italic">Signal_Verified_A1</span>
                       </div>
                       <span className="text-[8px] font-mono text-white/10">PK_0X{idx + 102}</span>
                    </div>
                  </motion.article>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 bg-white/[0.015] border border-dashed border-white/10 rounded-[3rem] opacity-30">
                <MessageSquare size={48} className="mb-6 text-amber-500/20" />
                <p className="text-xl font-serif italic mb-2 uppercase tracking-tighter">The signals are quiet...</p>
                <p className="text-[10px] uppercase tracking-[0.4em] font-mono">Archive empty // Awaiting_Decryption</p>
              </div>
            )}
          </>
        )}
      </div>
    </DetailLayout>
  )
}
