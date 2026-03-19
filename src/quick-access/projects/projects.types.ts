export interface ProjectItem {
  id:          string
  name:        string
  description: string
  tags:        string[]
  githubUrl:   string
  liveUrl?:    string
  imageUrl?:   string
  problem?:    string
  approach?:   string
  outcome?:    string
}

export interface ProjectsContent {
  pageTitle:       string
  pageSubtitle:    string
  featuredLabel:   string
  githubReposLabel: string
  emptyState:      string
  items:           ProjectItem[]
}
