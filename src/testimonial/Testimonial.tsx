import { useState, useEffect } from 'react'
import { useNavigate }          from 'react-router-dom'
import { getTestimonialPageContent } from '@/common/shared/firestore.service'
import { TestimonialForm }      from './TestimonialForm'
import EditableText from '@/admin/EditableText'
import type { TestimonialPageContent } from './testimonial.types'
import { testimonialFallback as fallbackContent } from '@/common/config/fallbacks'

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
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center" role="status" aria-live="polite">
        <span className="sr-only">Loading…</span>
        <div className="w-6 h-6 border-2 border-theme-default border-t-theme-primary rounded-full animate-spin" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-theme-primary flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => navigate('/hub')}
          className="
            text-sm text-theme-muted
            hover:text-theme-secondary
            transition-colors duration-150 mb-8
          "
        >
          <EditableText id="testimonial.backLabel" value={content.backLabel} />
        </button>

        <h1 className="text-2xl font-bold text-white mb-2 tracking-tight">
          <EditableText id="testimonial.pageTitle" value={content.pageTitle} />
        </h1>
        <p className="text-sm text-theme-secondary mb-8">
          <EditableText id="testimonial.pageSubtitle" value={content.pageSubtitle} />
        </p>

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
      </div>
    </div>
  )
}
