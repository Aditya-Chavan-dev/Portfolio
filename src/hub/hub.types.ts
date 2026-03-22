export interface QuickAccessItem {
  title:       string
  description: string
  route:       string
  icon?:       string
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
