export interface CertificationItem {
  id:             string
  name:           string
  issuer:         string
  date:           string
  description:    string
  tags:           string[]
  imageUrl:       string
  credentialUrl?: string
  archived?:      boolean
}

export interface CertificationsContent {
  pageTitle:   string
  pageSubtitle: string
  items:       CertificationItem[]
}


