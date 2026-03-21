import { SectionNav } from '@/shared/SectionNav'
import { ProjectCard } from './ProjectCard'
import type { ProjectItem, ProjectsContent } from './projects.types'
import type { GitHubRepo } from '@/shared/github.types'

interface Props {
  readonly content:        ProjectsContent
  readonly repos:          GitHubRepo[]
  readonly reposLoading:   boolean
  readonly onSelectProject: (project: ProjectItem) => void
}

export function ProjectsMobile({ content, repos, reposLoading, onSelectProject }: Props) {
  return (
    <div className="min-h-dvh bg-theme-primary pb-24">
      <SectionNav />
      <main className="px-6 py-8">
        <h1 className="text-2xl font-bold text-theme-primary mb-1 tracking-tight">
          {content.pageTitle}
        </h1>
        <p className="text-sm text-theme-secondary mb-8">
          {content.pageSubtitle}
        </p>

        {content.items.length > 0 && (
          <section className="mb-8" aria-label={content.featuredLabel}>
            <h2 className="text-xs font-medium text-theme-secondary mb-4 uppercase tracking-wider">
              {content.featuredLabel}
            </h2>
            <div className="space-y-3">
              {content.items.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => onSelectProject(project)}
                />
              ))}
            </div>
          </section>
        )}

        {reposLoading && (
          <div className="h-32 skeleton" />
        )}
        {!reposLoading && repos.length > 0 && (
          <section aria-label={content.githubReposLabel}>
            <h2 className="text-xs font-medium text-theme-secondary mb-4 uppercase tracking-wider">
              {content.githubReposLabel}
            </h2>
            <div className="space-y-3">
              {repos.slice(0, 8).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${repo.name} (opens in a new tab)`}
                  className="
                    block p-4 rounded-xl
                    border border-theme-default
                    hover:border-theme-hover
                    transition-colors duration-150
                  "
                >
                  <h3 className="font-semibold text-theme-primary text-sm">
                    {repo.name}
                  </h3>
                  {repo.description && (
                    <p className="text-xs text-theme-secondary mt-1 line-clamp-2">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex gap-3 mt-2 text-xs text-theme-muted">
                    {repo.language && <span>{repo.language}</span>}
                    <span>★ {repo.stargazers_count}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {content.items.length === 0 && !reposLoading && repos.length === 0 && (
          <p className="text-sm text-theme-muted">{content.emptyState}</p>
        )}
      </main>
    </div>
  )
}
