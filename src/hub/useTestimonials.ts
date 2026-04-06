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
              name: "Collaborator",
              relationship: "Colleague",
              message: "Aditya provided excellent technical solutions for our project. His expertise in full-stack architecture was a key asset to our success.",
              status: "approved",
              submittedAt: Date.now()
            },
            {
              id: "dummy-2",
              name: "Project Lead",
              relationship: "Client",
              message: "It was a pleasure working with Aditya. He delivered a high-quality, performant application on schedule.",
              status: "approved",
              submittedAt: Date.now()
            },
            {
              id: "dummy-3",
              name: "Software Engineer",
              relationship: "Peer",
              message: "Aditya has a great eye for design and performance. The technical implementation of this hub is impressive.",
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
