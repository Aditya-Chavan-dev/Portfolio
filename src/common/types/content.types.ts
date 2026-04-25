export interface ExperienceEntry {
  id?: string;
  company: string;
  role: string;
  date: string;
  bullets: string[];
  order?: number;
}

export interface CertificationEntry {
  id?: string;
  title: string;
  issuer: string;
  date: string;
  icon: string;
  order?: number;
}

export interface TechStackEntry {
  id?: string;
  category: string;
  tools: string[];
  order?: number;
}

export interface ProjectEntry {
  id?: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  featured: boolean;
  order: number;
}

/** ─── Legacy Migration Types (Syncing with Admin OS) ──────────────── */

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

export interface ExperienceItem {
  id:          string
  company:     string
  role:        string
  duration:    string
  description: string
  bulletPoints?: string[]
  tags:        string[]
  logoUrl?:    string
  archived?:   boolean
}

export interface ExperienceContent {
  pageTitle:   string
  pageSubtitle: string
  emptyState:  string
  items:       ExperienceItem[]
}

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
