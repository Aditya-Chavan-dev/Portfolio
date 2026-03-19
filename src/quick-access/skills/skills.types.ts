export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced'

export interface SkillItem {
  name:  string
  level: SkillLevel
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
