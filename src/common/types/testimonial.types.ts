export type TestimonialStatus = 'pending' | 'approved' | 'rejected'

export interface Testimonial {
  id:           string
  name:         string
  relationship: string
  text:         string
  /** @internal PII — never expose in public APIs or client-rendered UI */
  email:        string
  status:       TestimonialStatus
  photo?:       string | null // Base64 compressed image
  submittedAt:  number        // Unix timestamp ms
  approvedAt?:  number        // Set when admin approves
}

/** Public-safe projection — used by client-facing hooks and components */
export type PublicTestimonial = Omit<Testimonial, 'email'>



