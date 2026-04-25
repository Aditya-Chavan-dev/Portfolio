import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot, doc, updateDoc, deleteDoc } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { CheckCircle2, XCircle, Trash2, Clock, User, MessageSquare } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Testimonial } from '@/common/types/testimonial.types'

export default function AdminTestimonialsTab() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Show all testimonials for moderation, newest first
    const q = query(collection(db, 'testimonials'), orderBy('submittedAt', 'desc'))
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Testimonial))
      setTestimonials(data)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  async function setStatus(id: string, status: 'approved' | 'rejected' | 'pending') {
    try {
      await updateDoc(doc(db, 'testimonials', id), {
        status,
        approvedAt: status === 'approved' ? Date.now() : null
      })
    } catch (err) {
      console.error('Failed to update testimonial status:', err)
    }
  }

  async function deleteTestimonial(id: string) {
    if (!window.confirm('Terminate this transmission permanently?')) return
    try {
      await deleteDoc(doc(db, 'testimonials', id))
    } catch (err) {
      console.error('Failed to delete testimonial:', err)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 opacity-30">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4" />
        <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Syncing Feed...</span>
      </div>
    )
  }

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-white tracking-tight font-serif uppercase">Incoming Signals</h2>
          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-mono">Transmission Moderation Queue</p>
        </div>
        
        <div className="flex items-center gap-8 text-[10px] font-mono uppercase tracking-widest bg-white/5 border border-white/10 px-6 py-4 rounded-2xl">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-white/60">Pending:</span>
            <span className="text-white">{testimonials.filter(t => t.status === 'pending').length}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-white/60">Live:</span>
            <span className="text-white">{testimonials.filter(t => t.status === 'approved').length}</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        <AnimatePresence mode="popLayout">
          {testimonials.map((testimonial) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              key={testimonial.id}
              className={`
                relative p-6 md:p-8 rounded-[2.5rem] border transition-all duration-500 group overflow-hidden
                ${testimonial.status === 'approved' 
                  ? 'bg-emerald-500/[0.03] border-emerald-500/10' 
                  : testimonial.status === 'rejected'
                    ? 'bg-red-500/[0.03] border-red-500/10 opacity-60'
                    : 'bg-white/[0.03] border-white/5'}
              `}
            >
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-white/5 border border-white/10 group-hover:scale-105 transition-transform duration-500 shadow-2xl">
                    {testimonial.photo ? (
                      <img src={testimonial.photo} className="w-full h-full object-cover" alt={testimonial.name} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/10">
                        <User size={32} />
                      </div>
                    )}
                  </div>
                  {testimonial.status === 'pending' && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 bg-amber-500 rounded-full flex items-center justify-center text-bg-base border-2 border-[#050507]">
                      <Clock size={10} />
                    </div>
                  )}
                </div>

                <div className="flex-1 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-bold text-white tracking-tight">{testimonial.name}</h3>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">
                        {testimonial.relationship}{testimonial.company ? ` @ ${testimonial.company}` : ''}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {testimonial.status !== 'approved' && (
                        <button
                          onClick={() => setStatus(testimonial.id, 'approved')}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                        >
                          <CheckCircle2 size={14} />
                          Authorize
                        </button>
                      )}
                      
                      {testimonial.status !== 'rejected' && (
                        <button
                          onClick={() => setStatus(testimonial.id, 'rejected')}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all bg-red-500/10 text-red-500 hover:bg-red-500/20"
                        >
                          <XCircle size={14} />
                          Reject
                        </button>
                      )}

                      {testimonial.status === 'rejected' && (
                        <button
                          onClick={() => setStatus(testimonial.id, 'pending')}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all bg-white/5 text-white/40 hover:bg-white/10"
                        >
                          <Clock size={14} />
                          Reset to Pending
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteTestimonial(testimonial.id)}
                        className="p-2.5 rounded-full bg-red-500/5 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 transition-all ml-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="relative">
                    <MessageSquare size={16} className="absolute -left-6 top-0 text-white/5" />
                    <p className="text-sm text-text-muted leading-relaxed font-sans italic">
                      "{testimonial.message}"
                    </p>
                  </div>
                </div>
              </div>

              {/* Timestamp decor */}
              <div className="absolute bottom-4 right-8 flex items-center gap-2 opacity-10 pointer-events-none">
                <span className="text-[9px] font-mono tracking-[0.3em] uppercase">
                  UTC / {new Date(testimonial.submittedAt).toLocaleTimeString()}
                </span>
                <div className="w-8 h-px bg-white/20" />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {testimonials.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 border-2 border-dashed border-white/[0.03] rounded-[2.5rem] opacity-20">
            <MessageSquare size={48} className="mb-4" />
            <p className="text-lg font-serif italic">No signals detected in this frequency.</p>
            <p className="text-[10px] uppercase tracking-[0.3em] mt-4 font-mono">Standby for incoming content...</p>
          </div>
        )}
      </div>
    </div>
  )
}
