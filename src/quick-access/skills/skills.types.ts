export interface SkillItem {
  name:  string
  color?: string
  iconSlug?: string
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
