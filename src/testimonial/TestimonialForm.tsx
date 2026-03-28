import EditableText from '@/admin/EditableText'
import { useEditMode } from '@/admin/EditModeContext'

interface Props {
  readonly namePlaceholder:    string
  readonly rolePlaceholder:    string
  readonly messagePlaceholder: string
  readonly emailPlaceholder:   string
  readonly consentLabel:       string
  readonly submitLabel:        string
  readonly prototypeNotice:    string
}

export function TestimonialForm({
  namePlaceholder,
  rolePlaceholder,
  messagePlaceholder,
  emailPlaceholder,
  consentLabel,
  submitLabel,
  prototypeNotice,
}: Props) {
  const { mode } = useEditMode()
  const isEditing = mode === 'edit'

  const inputClasses = `
    w-full px-4 py-3 rounded-xl text-sm
    border border-theme-default
    bg-theme-secondary
    text-theme-primary
    placeholder-gray-400 dark:placeholder-gray-600
    focus-visible:ring-2 focus-visible:ring-gray-400
    transition-colors duration-150
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-4"
      aria-label={namePlaceholder}
    >
      <div className="space-y-4">
        {/* We can't wrap 'placeholder' attributes directly, so we provide a hidden edit point for them in edit mode */}
        <div className="relative">
          <input type="text" placeholder={namePlaceholder} disabled className={inputClasses} />
          {isEditing && <EditableText id="testimonial.namePlaceholder" value={namePlaceholder} className="absolute -top-4 right-0 text-[10px] scale-75 opacity-50" />}
        </div>
        <div className="relative">
          <input type="text" placeholder={rolePlaceholder} disabled className={inputClasses} />
          {isEditing && <EditableText id="testimonial.rolePlaceholder" value={rolePlaceholder} className="absolute -top-4 right-0 text-[10px] scale-75 opacity-50" />}
        </div>
        <div className="relative">
          <textarea placeholder={messagePlaceholder} disabled className={`${inputClasses} resize-none h-28`} maxLength={300} />
          {isEditing && <EditableText id="testimonial.messagePlaceholder" value={messagePlaceholder} className="absolute -top-4 right-0 text-[10px] scale-75 opacity-50" />}
        </div>
        <div className="relative">
          <input type="email" placeholder={emailPlaceholder} disabled className={inputClasses} />
          {isEditing && <EditableText id="testimonial.emailPlaceholder" value={emailPlaceholder} className="absolute -top-4 right-0 text-[10px] scale-75 opacity-50" />}
        </div>
      </div>

      <label className="flex items-start gap-3 select-none">
        <input type="checkbox" disabled className="mt-1 accent-theme-primary" />
        <span className="text-xs text-theme-secondary leading-snug">
          <EditableText id="testimonial.consentLabel" value={consentLabel} />
        </span>
      </label>

      <button
        type="submit"
        disabled
        className="
          w-full py-3 rounded-xl text-sm font-semibold
          bg-gray-200 dark:bg-gray-800
          text-theme-secondary
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
