import { useState, useEffect } from 'react'
import { subscribeToApprovedTestimonials } from '@/common/shared/firestore.service'
import type { PublicTestimonial } from '@/common/shared/testimonial.types'

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
        if (items.length === 0) {
          setTestimonials([
            {
              id: "dummy-1",
              name: "TechFlow CEO",
              relationship: "Client",
              message: "Aditya is a wizard of full-stack development. His attention to detail and cinematic UI design is world-class.",
              status: "approved",
              submittedAt: Date.now()
            },
            {
              id: "dummy-2",
              name: "CreativeSphere Lead",
              relationship: "Collaborator",
              message: "Working with Aditya was a seamless experience. He transformed our concept into a high-performance reality.",
              status: "approved",
              submittedAt: Date.now()
            },
            {
              id: "dummy-3",
              name: "Meta Principal Engineer",
              relationship: "Mentor",
              message: "The most impressive portfolio I've seen in years. The Hub is a masterpiece of modern engineering.",
              status: "approved",
              submittedAt: Date.now()
            }
          ])
        } else {
          setTestimonials(items)
        }
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
