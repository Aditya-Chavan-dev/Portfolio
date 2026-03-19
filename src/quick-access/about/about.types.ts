export interface AboutFact {
  label: string
  value: string
}

export interface AboutContent {
  pageTitle:   string
  pageSubtitle: string
  bio:         string
  facts:       AboutFact[]
  photoUrl?:   string
}
