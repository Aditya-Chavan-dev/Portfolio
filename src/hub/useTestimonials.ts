import { useState, useEffect } from 'react'
import { subscribeToApprovedTestimonials } from '@/common/shared/firestore.service'
import type { PublicTestimonial } from '@/common/types/testimonial.types'

export function useTestimonials() {
  const [testimonials, setTestimonials] = useState<PublicTestimonial[]>([])
  const [loading,      setLoading     ] = useState(true)

  useEffect(() => {
    const timeoutTimer = setTimeout(() => {
      setLoading(false)
    }, 2500)

    const unsubscribe = subscribeToApprovedTestimonials(
      (items) => {
        clearTimeout(timeoutTimer)
        setTestimonials(items)
        setLoading(false)
      },
      (error) => {
        clearTimeout(timeoutTimer)
        console.error('Testimonials loading stream error:', error)
        setLoading(false)
      }
    )

    return () => {
      clearTimeout(timeoutTimer)
      unsubscribe()
    }
  }, [])

  return { testimonials, loading } as const
}
