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
