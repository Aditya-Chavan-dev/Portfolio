import { useState, useEffect } from 'react'
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MessageSquare, Quote, User } from 'lucide-react'
import { Testimonial } from '@/common/types/testimonial.types'

export default function TestimonialGallery() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

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
    <div className="min-h-screen bg-theme-primary text-white selection:bg-accent-gold/30">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent-gold/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-24">
        {/* Navigation */}
        <button
          onClick={() => navigate('/hub')}
          className="group flex items-center gap-3 text-[10px] font-bold text-white/40 hover:text-accent-gold uppercase tracking-[0.3em] transition-all mb-12"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Hub
        </button>

        {/* Header */}
        <header className="mb-20 space-y-4 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20 text-accent-gold text-[10px) font-bold uppercase tracking-widest">
            <MessageSquare size={10} />
            <span>Signal Archive</span>
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold tracking-tighter font-syne uppercase">
            Wall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-white">Appreciation</span>
          </h1>
          <p className="text-text-muted text-sm lg:text-base leading-relaxed">
            A verified record of transmissions from partners, collaborators, and clients in the digital sphere.
          </p>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-64 rounded-3xl bg-white/5 animate-pulse border border-white/10" />
            ))}
          </div>
        ) : (
          <>
            {testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((t, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    key={t.id}
                    className="group relative p-8 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-accent-gold/20 hover:bg-white/[0.05] transition-all duration-500 flex flex-col justify-between"
                  >
                    <Quote className="absolute top-6 right-8 text-white/5 group-hover:text-accent-gold/10 transition-colors" size={48} />
                    
                    <div className="space-y-6">
                      <p className="text-sm leading-relaxed text-text-muted italic relative z-10">
                        "{t.message}"
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/5 border border-white/10 flex-shrink-0">
                          {t.photo ? (
                            <img src={t.photo} className="w-full h-full object-cover" alt={t.name} />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/20">
                              <User size={20} />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-white truncate">{t.name}</h4>
                          <p className="text-[9px] text-white/40 uppercase tracking-widest truncate font-mono">
                            {t.relationship}{t.company ? ` @ ${t.company}` : ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-white/5 rounded-3xl opacity-30">
                <MessageSquare size={48} className="mb-6" />
                <p className="text-xl font-serif italic mb-2">The signals are quiet...</p>
                <p className="text-[10px] uppercase tracking-[0.4em] font-mono">Archive empty — awaiting transmission</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
