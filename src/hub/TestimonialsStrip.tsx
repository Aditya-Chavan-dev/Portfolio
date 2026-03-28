import { useTestimonials } from './useTestimonials'
import type { PublicTestimonial } from '@/common/shared/testimonial.types'

function TestimonialCard({ testimonial }: { readonly testimonial: PublicTestimonial }) {
  return (
    <article className="
      p-5 rounded-2xl shrink-0
      glass-card
      w-72 md:w-auto
    ">
      <blockquote>
        <p className="text-sm text-theme-secondary line-clamp-3 leading-relaxed">
          {testimonial.message}
        </p>
      </blockquote>
      <footer className="mt-3">
        <p className="text-sm font-semibold text-theme-primary">
          {testimonial.name}
        </p>
        <p className="text-xs text-theme-secondary">
          {testimonial.relationship}
        </p>
      </footer>
    </article>
  )
}

function PlaceholderCard({ text }: { readonly text: string }) {
  return (
    <div className="
      p-4 rounded-xl shrink-0
      border border-dashed border-theme-dashed
      w-72 md:w-auto
    ">
      <p className="text-sm text-theme-muted">{text}</p>
    </div>
  )
}

interface TestimonialsStripProps {
  readonly emptyStateText: string
}

export function TestimonialsStrip({ emptyStateText }: TestimonialsStripProps) {
  const { testimonials, loading } = useTestimonials()

  if (loading) {
    return (
      <div
        className="h-32 skeleton"
        role="status"
        aria-live="polite"
      >
        <span className="sr-only">Loading testimonials…</span>
      </div>
    )
  }

  const hasItems = testimonials.length > 0

  return (
    <>
      {/* Desktop: vertical auto-scroll upward */}
      <div
        className="hidden md:block overflow-hidden h-96"
        aria-label="Testimonials"
      >
        <div className={hasItems ? 'testimonials-scroll-up space-y-3' : ''}>
          {hasItems
            ? testimonials.map((t) => <TestimonialCard key={t.id} testimonial={t} />)
            : <PlaceholderCard text={emptyStateText} />
          }
        </div>
      </div>

      {/* Mobile: horizontal swipe */}
      <div
        className="flex md:hidden gap-3 overflow-x-auto pb-2 scrollbar-hide"
        aria-label="Testimonials"
      >
        {hasItems
          ? testimonials.map((t) => <TestimonialCard key={t.id} testimonial={t} />)
          : <PlaceholderCard text={emptyStateText} />
        }
      </div>
    </>
  )
}
