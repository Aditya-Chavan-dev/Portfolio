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
  const inputClasses = `
    w-full px-4 py-3 rounded-xl text-sm
    border border-gray-200 dark:border-gray-800
    bg-white dark:bg-gray-900
    text-gray-900 dark:text-gray-100
    placeholder-gray-400 dark:placeholder-gray-600
    focus-visible:ring-2 focus-visible:ring-gray-400
    transition-colors duration-150
    disabled:opacity-50 disabled:cursor-not-allowed
  `

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="space-y-4"
      aria-label="Testimonial submission form"
    >
      <input type="text"  aria-label={namePlaceholder}    placeholder={namePlaceholder}    disabled className={inputClasses} />
      <input type="text"  aria-label={rolePlaceholder}    placeholder={rolePlaceholder}    disabled className={inputClasses} />
      <textarea           aria-label={messagePlaceholder} placeholder={messagePlaceholder} disabled className={`${inputClasses} resize-none h-28`} maxLength={300} />
      <input type="email" aria-label={emailPlaceholder}   placeholder={emailPlaceholder}   disabled className={inputClasses} />

      <label className="flex items-start gap-3 select-none">
        <input type="checkbox" disabled className="mt-1 accent-gray-700" />
        <span className="text-xs text-gray-500 dark:text-gray-400 leading-snug">{consentLabel}</span>
      </label>

      <button
        type="submit"
        disabled
        className="
          w-full py-3 rounded-xl text-sm font-semibold
          bg-gray-200 dark:bg-gray-800
          text-gray-500 dark:text-gray-400
          cursor-not-allowed
        "
      >
        {submitLabel}
      </button>

      <p className="text-xs text-center text-gray-400 dark:text-gray-600 pt-2">
        {prototypeNotice}
      </p>
    </form>
  )
}
