import { useTestimonials } from './useTestimonials'

interface SampleTestimonial {
  id: string
  name: string
  company: string
  relationship: string
  message: string
  photoUrl?: string
}

const SAMPLE_TESTIMONIALS: SampleTestimonial[] = [
  {
    id: 's1',
    name: "Sarah Chen",
    company: "Future Labs",
    relationship: "Senior Architect",
    message: "Adi's ability to bridge the gap between complex backend systems and premium UI animations is rare. A true full-stack artist.",
    photoUrl: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    id: 's2',
    name: "Marcus Vane",
    company: "MetaVerse Inc",
    relationship: "Lead Designer",
    message: "The attention to detail in the 'Operative OS' aesthetic is phenomenal. Clean code, beautiful design, and absolute professional.",
    photoUrl: "https://i.pravatar.cc/150?u=marcus"
  },
  {
    id: 's3',
    name: "Elena Rodriguez",
    company: "Cyber Security First",
    relationship: "CTO",
    message: "Rarely do I see someone who handles security and architecture with such elegance. A powerhouse developer for any high-stakes project.",
    photoUrl: "https://i.pravatar.cc/150?u=elena"
  }
]

function TestimonialCard({ testimonial }: { readonly testimonial: SampleTestimonial }) {
  return (
    <article className="
      p-5 ethereal-glass
      w-full transition-all duration-700
    ">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-10 h-10 rounded-full bg-theme-base/20 border border-theme-default/20 overflow-hidden shrink-0">
            {testimonial.photoUrl && <img src={testimonial.photoUrl} alt={testimonial.name} className="w-full h-full object-cover grayscale" />}
        </div>
        <div className="flex flex-col min-w-0">
            <span className="text-sm font-black text-theme-primary truncate tracking-tight">{testimonial.name}</span>
            <span className="font-hud !text-theme-accent !opacity-60 !text-[10px] truncate">
                {testimonial.relationship} | {testimonial.company}
            </span>
        </div>
      </div>
      <blockquote className="mt-4">
        <p className="text-[12px] text-theme-secondary/80 leading-relaxed font-serif italic">
          "{testimonial.message}"
        </p>
      </blockquote>
    </article>
  )
}

interface TestimonialsStripProps {
  readonly emptyStateText: string
}

export function TestimonialsStrip({ emptyStateText }: TestimonialsStripProps) {
  const { testimonials, loading } = useTestimonials()

  if (loading) return <div className="h-full w-full bg-theme-base/5 animate-pulse rounded-xl" />

  // Use samples if no real ones
  const items: SampleTestimonial[] = testimonials.length > 0 
    ? (testimonials as any) 
    : SAMPLE_TESTIMONIALS

  if (items.length === 0) return <div className="p-4 border border-dashed border-theme-default/20 rounded-xl text-[10px] text-theme-muted">{emptyStateText}</div>

  return (
    <div className="relative h-full w-full overflow-hidden group/strip">
      {/* Slow fade edges */}
      <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-theme-base to-transparent z-10 pointer-events-none opacity-20" />
      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-theme-base to-transparent z-10 pointer-events-none opacity-20" />

      {/* Desktop Scroll Loop */}
      <div className="hidden md:block h-full">
         <div className="testimonials-scroll-up space-y-4 hover:[animation-play-state:paused] pointer-events-auto">
            {/* Double the items for a seamless -50% loop */}
            {[...items, ...items].map((t: SampleTestimonial, i) => (
              <TestimonialCard key={`${t.id}-${i}`} testimonial={t} />
            ))}
         </div>
      </div>

      {/* Mobile Swipe */}
      <div className="flex md:hidden gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {items.map((t: SampleTestimonial) => <TestimonialCard key={t.id} testimonial={t} />)}
      </div>
    </div>
  )
}
