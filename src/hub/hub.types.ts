import { type ReactNode } from 'react'

export interface QuickAccessItem {
  title:       string
  label:       string
  route:       string
  icon?:       ReactNode
  onClick?:    () => void
}

export interface HubContent {
  ownerName:              string
  ownerRole:              string
  ownerQuote?:            string
  ownerPhotoUrl?:         string
  journeyButtonLabel:     string
  journeyButtonSubtext:   string
  quickAccessLabel:       string
  quickAccessItems:       QuickAccessItem[]
  testimonialsLabel:      string
  testimonialsEmptyState: string
  leaveTestimonialLabel:  string
}
