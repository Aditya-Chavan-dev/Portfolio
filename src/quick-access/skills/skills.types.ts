export interface SkillItem {
  id:         string
  name:       string
  level:      string
  iconUrl:    string
  iconSource: string
}

export interface SkillCategory {
  name:  string
  items: SkillItem[]
}

export interface SkillsContent {
  pageTitle:   string
  pageSubtitle: string
  emptyState:  string
  categories:  SkillCategory[]
}
