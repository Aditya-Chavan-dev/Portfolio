import { useState, useEffect } from 'react'
import { useNavigate }          from 'react-router-dom'
import { getTestimonialPageContent } from '@/shared/firestore.service'
import { TestimonialForm }      from './TestimonialForm'
import type { TestimonialPageContent } from './testimonial.types'
import fallbackContent from './content.json'

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
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center" role="status" aria-live="polite">
        <span className="sr-only">Loading…</span>
        <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-400 rounded-full animate-spin" aria-hidden="true" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => navigate('/hub')}
          className="
            text-sm text-gray-400 dark:text-gray-500
            hover:text-gray-900 dark:hover:text-gray-100
            transition-colors duration-150 mb-8
          "
        >
          {content.backLabel}
        </button>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight">
          {content.pageTitle}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
          {content.pageSubtitle}
        </p>

        <TestimonialForm
          namePlaceholder={content.namePlaceholder}
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
