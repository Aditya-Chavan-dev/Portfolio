export interface GitHubRepo {
  id:               number
  name:             string
  full_name:        string
  description:      string | null
  html_url:         string
  homepage:         string | null
  language:         string | null
  stargazers_count: number
  forks_count:      number
  topics:           string[]
  updated_at:       string
  fork:             boolean
  private:          boolean
}

export interface GitHubContributionDay {
  date:              string
  contributionCount: number
}

export interface GitHubActivity {
  totalContributions: number
  weeks: { contributionDays: GitHubContributionDay[] }[]
}

export interface GitHubCache {
  repos:    GitHubRepo[]
  activity: GitHubActivity | null
  cachedAt: number  // Unix timestamp ms — used for TTL check
}
