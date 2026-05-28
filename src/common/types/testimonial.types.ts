export type TestimonialStatus = 'pending' | 'approved' | 'rejected'

export interface Testimonial {
  id:           string
  name:         string
  relationship: string
  company?:     string
  text:         string
  email:        string
  status:       TestimonialStatus
  photo?:       string | null
  submittedAt:  number
  approvedAt?:  number
}

export type PublicTestimonial = Omit<Testimonial, 'email'>



