import { useState, useEffect } from 'react'
import { subscribeToApprovedTestimonials } from '@/shared/firestore.service'
import type { PublicTestimonial } from '@/shared/testimonial.types'

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<PublicTestimonial[]>([])
  const [loading,      setLoading     ] = useState(true)

  useEffect(() => {
    const unsubscribe = subscribeToApprovedTestimonials((items) => {
      setTestimonials(items)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  return { testimonials, loading } as const
}
