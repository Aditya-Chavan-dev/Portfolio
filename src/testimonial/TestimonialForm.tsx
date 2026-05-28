import { useState } from 'react'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { compressProfileImage } from '@/common/lib/imageOptimization'
import EditableText from '@/admin/EditableText'
import { useEditMode } from '@/admin/EditModeContext'
import { CheckCircle2, Loader2, Sparkles, User } from 'lucide-react'

interface Props {
  readonly namePlaceholder:    string
  readonly rolePlaceholder:    string
  readonly companyPlaceholder: string
  readonly messagePlaceholder: string
  readonly emailPlaceholder:   string
  readonly consentLabel:       string
  readonly submitLabel:        string
  readonly prototypeNotice:    string
}

export function TestimonialForm({
  namePlaceholder,
  rolePlaceholder,
  companyPlaceholder,
  messagePlaceholder,
  emailPlaceholder,
  consentLabel,
  submitLabel,
  prototypeNotice,
}: Props) {
  const { mode } = useEditMode()
  const isEditing = mode === 'edit'
  
  // State
  const [formData, setFormData] = useState({
    name: '',
    relationship: '',
    company: '',
    text: '',
    email: '',
    consent: false,
    website: '', // Honeypot
  })
  
  const [photoBase64, setPhotoBase64] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleFileSelection(e: React.ChangeEvent<HTMLInputElement>) {
     const file = e.target.files?.[0]
     if (file && file.type.startsWith('image/')) {
        try {
          const compressed = await compressProfileImage(file)
          setPhotoBase64(compressed)
        } catch (err) {
          console.error('Image compression failed:', err)
        }
     }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    // Honeypot check
    if (formData.website) return
    
    // Validation
    if (!formData.name || !formData.text || !formData.consent) {
      setErrorMessage('Please fill in all mandatory fields.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      await addDoc(collection(db, 'testimonials'), {
        ...formData,
        photo: photoBase64,
        status: 'pending', // Moderation gate
        submittedAt: Date.now(),
      })
      setStatus('success')
    } catch (err) {
      console.error('Submission failed:', err)
      setStatus('error')
      setErrorMessage('Transmission failed. The frequency might be blocked.')
    }
  }

  const inputClasses = `
    w-full px-4 py-3 rounded-xl text-sm
    border border-white/10
    bg-white/5
    text-white
    placeholder-gray-500
    focus-visible:ring-2 focus-visible:ring-accent-gold/20
    transition-all duration-300
    disabled:opacity-50
  `

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500">
          <CheckCircle2 size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold font-syne uppercase tracking-tight text-white">Transmission Received</h2>
          <p className="text-sm text-text-muted font-mono max-w-xs leading-relaxed">
            Your token of appreciation has been beamed to the architect's terminal for verification.
          </p>
        </div>
        <button 
          onClick={() => window.location.reload()}
          className="text-[10px] font-bold text-accent-gold uppercase tracking-[0.25em] pt-4 hover:opacity-70 transition-opacity"
        >
          Send another?
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Honeypot */}
      <input 
        type="text" 
        style={{ display: 'none' }} 
        tabIndex={-1} 
        value={formData.website} 
        onChange={(e) => setFormData({...formData, website: e.target.value})} 
      />

      {/* Identity Upload */}
      <div className="flex flex-col items-center gap-4 mb-8">
         <div className="relative group cursor-pointer overflow-hidden rounded-full transition-all duration-500 hover:shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <input 
                type="file" 
                className="hidden" 
                id="photo-upload" 
                accept="image/*"
                onChange={handleFileSelection}
            />
            <label 
                htmlFor="photo-upload" 
                className="w-24 h-24 rounded-full border-2 border-dashed border-white/10 flex items-center justify-center cursor-pointer hover:border-accent-gold/50 transition-all overflow-hidden relative bg-white/5"
            >
               {photoBase64 ? (
                   <img src={photoBase64} className="w-full h-full object-cover" alt="Preview" />
               ) : (
                   <div className="flex flex-col items-center gap-1 opacity-40">
                       <User size={32} />
                       <span className="text-[8px] font-mono tracking-widest text-white/50">SUBMIT_ID</span>
                   </div>
               )}
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-widest backdrop-blur-[2px]">
                  Change
               </div>
            </label>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder={namePlaceholder} 
            className={inputClasses}
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          {isEditing && <EditableText id="testimonial.namePlaceholder" value={namePlaceholder} className="absolute -top-4 right-0 text-[10px] scale-75 opacity-50" />}
        </div>
        <div className="relative">
          <input 
            type="text" 
            placeholder={companyPlaceholder} 
            className={inputClasses}
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
          />
          {isEditing && <EditableText id="testimonial.companyPlaceholder" value={companyPlaceholder} className="absolute -top-4 right-0 text-[10px] scale-75 opacity-50" />}
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input 
            type="text" 
            placeholder={rolePlaceholder} 
            className={inputClasses}
            value={formData.relationship}
            onChange={(e) => setFormData({...formData, relationship: e.target.value})}
          />
          {isEditing && <EditableText id="testimonial.rolePlaceholder" value={rolePlaceholder} className="absolute -top-4 right-0 text-[10px] scale-75 opacity-50" />}
        </div>
        <div className="relative">
          <textarea 
            placeholder={messagePlaceholder} 
            className={`${inputClasses} resize-none h-32 no-scrollbar`} 
            maxLength={400}
            value={formData.text}
            onChange={(e) => setFormData({...formData, text: e.target.value})}
            required
          />
          {isEditing && <EditableText id="testimonial.messagePlaceholder" value={messagePlaceholder} className="absolute -top-4 right-0 text-[10px] scale-75 opacity-50" />}
        </div>
        <div className="relative">
          <input 
            type="email" 
            placeholder={emailPlaceholder} 
            className={inputClasses}
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          {isEditing && <EditableText id="testimonial.emailPlaceholder" value={emailPlaceholder} className="absolute -top-4 right-0 text-[10px] scale-75 opacity-50" />}
        </div>
      </div>

      <label className="flex items-start gap-4 select-none pt-2 group cursor-pointer">
        <div className="relative flex items-center justify-center mt-1">
          <input 
            type="checkbox" 
            className="peer appearance-none w-5 h-5 border border-white/20 rounded bg-white/5 checked:bg-accent-gold transition-colors cursor-pointer"
            checked={formData.consent}
            onChange={(e) => setFormData({...formData, consent: e.target.checked})}
            required
          />
          <div className="absolute opacity-0 peer-checked:opacity-100 pointer-events-none text-bg-base">
            <CheckCircle2 size={14} />
          </div>
        </div>
        <span className="text-xs text-text-muted leading-relaxed group-hover:text-white transition-colors">
          <EditableText id="testimonial.consentLabel" value={consentLabel} />
        </span>
      </label>

      {status === 'error' && (
        <p className="text-[10px] text-red-500 font-mono uppercase tracking-widest text-center">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'submitting'}
        className="
          group relative w-full h-14 rounded-xl text-xs font-black
          bg-white text-black uppercase tracking-[0.2em]
          hover:scale-[1.02] active:scale-95 transition-all
          disabled:opacity-50 disabled:cursor-wait
          overflow-hidden isolate
        "
      >
        <span className="relative z-10 flex items-center justify-center gap-3">
          {status === 'submitting' ? (
            <>
              <Loader2 className="animate-spin" size={16} />
              Encrypting...
            </>
          ) : (
            <>
              <Sparkles size={16} />
              <EditableText id="testimonial.submitLabel" value={submitLabel} />
            </>
          )}
        </span>
        <div className="absolute inset-0 bg-accent-gold opacity-0 group-hover:opacity-10 transition-opacity" />
      </button>

      <p className="text-[9px] text-center text-white/20 pt-2 font-mono uppercase tracking-[0.1em]">
        <EditableText id="testimonial.prototypeNotice" value={prototypeNotice} />
      </p>
    </form>
  )
}
