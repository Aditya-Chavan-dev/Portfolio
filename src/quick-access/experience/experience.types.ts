export interface ExperienceItem {
  id:          string
  company:     string
  role:        string
  duration:    string
  description: string
  bulletPoints?: string[]
  tags:        string[]
  logoUrl?:    string
}

export interface ExperienceContent {
  pageTitle:   string
  pageSubtitle: string
  emptyState:  string
  items:       ExperienceItem[]
}
