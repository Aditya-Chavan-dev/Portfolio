import { useState } from 'react'
import EditableText from '@/admin/EditableText'
import { useEditMode } from '@/admin/EditModeContext'

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
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)

  function handleFileSelection(e: React.ChangeEvent<HTMLInputElement>) {
     const file = e.target.files?.[0]
     if (file && file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (re) => setPhotoPreview(re.target?.result as string)
        reader.readAsDataURL(file)
     }
  }

  const inputClasses = `
    w-full px-4 py-3 rounded-xl text-sm
    border border-theme-default
    bg-theme-secondary
    text-theme-primary
    placeholder-gray-400 dark:placeholder-gray-600
    focus-visible:ring-2 focus-visible:ring-amber-500/20
    transition-colors duration-150
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-6"
      aria-label={namePlaceholder}
    >
      {/* ── Photo Identity ───────────────────────────────────── */}
      <div className="flex flex-col items-center gap-4 mb-8">
         <div className="relative group/id cursor-pointer overflow-hidden">
            <input 
                type="file" 
                className="hidden" 
                id="photo-upload" 
                accept="image/*"
                onChange={handleFileSelection}
            />
            <label 
                htmlFor="photo-upload" 
                className="w-24 h-24 rounded-full border-2 border-dashed border-theme-default/40 flex items-center justify-center cursor-pointer hover:border-amber-500/50 transition-all overflow-hidden relative"
            >
               {photoPreview ? (
                   <img src={photoPreview} className="w-full h-full object-cover" alt="Preview" />
               ) : (
                   <div className="flex flex-col items-center gap-1 opacity-40">
                       <span className="text-2xl">📷</span>
                       <span className="text-[8px] font-mono tracking-widest">UPLOAD_ID</span>
                   </div>
               )}
               <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/id:opacity-100 transition-opacity flex items-center justify-center text-[8px] font-bold text-white uppercase tracking-tighter">
                  Update
               </div>
            </label>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input type="text" placeholder={namePlaceholder} disabled className={inputClasses} />
          {isEditing && <EditableText id="testimonial.namePlaceholder" value={namePlaceholder} className="absolute -top-4 right-0 text-[10px] scale-75 opacity-50" />}
        </div>
        <div className="relative">
          <input type="text" placeholder={companyPlaceholder} disabled className={inputClasses} />
          {isEditing && <EditableText id="testimonial.companyPlaceholder" value={companyPlaceholder} className="absolute -top-4 right-0 text-[10px] scale-75 opacity-50" />}
        </div>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <input type="text" placeholder={rolePlaceholder} disabled className={inputClasses} />
          {isEditing && <EditableText id="testimonial.rolePlaceholder" value={rolePlaceholder} className="absolute -top-4 right-0 text-[10px] scale-75 opacity-50" />}
        </div>
        <div className="relative">
          <textarea placeholder={messagePlaceholder} disabled className={`${inputClasses} resize-none h-32`} maxLength={300} />
          {isEditing && <EditableText id="testimonial.messagePlaceholder" value={messagePlaceholder} className="absolute -top-4 right-0 text-[10px] scale-75 opacity-50" />}
        </div>
        <div className="relative">
          <input type="email" placeholder={emailPlaceholder} disabled className={inputClasses} />
          {isEditing && <EditableText id="testimonial.emailPlaceholder" value={emailPlaceholder} className="absolute -top-4 right-0 text-[10px] scale-75 opacity-50" />}
        </div>
      </div>

      <label className="flex items-start gap-3 select-none pt-2">
        <input type="checkbox" disabled className="mt-1 accent-theme-primary" />
        <span className="text-xs text-theme-secondary leading-snug">
          <EditableText id="testimonial.consentLabel" value={consentLabel} />
        </span>
      </label>

      <button
        type="submit"
        disabled
        className="
          w-full py-4 rounded-xl text-sm font-semibold
          bg-gray-200 dark:bg-gray-800/50
          text-theme-secondary
          border border-theme-default/10
          cursor-not-allowed
        "
      >
        <EditableText id="testimonial.submitLabel" value={submitLabel} />
      </button>

      <p className="text-xs text-center text-theme-muted pt-2 text-wrap">
        <EditableText id="testimonial.prototypeNotice" value={prototypeNotice} />
      </p>
    </form>
  )
}
