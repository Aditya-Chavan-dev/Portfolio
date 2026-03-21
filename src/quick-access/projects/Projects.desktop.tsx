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

export function ProjectsDesktop({ content, repos, reposLoading, onSelectProject }: Props) {
  return (
    <div className="min-h-screen bg-theme-primary">
      <SectionNav />
      <main className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold text-theme-primary mb-2 tracking-tight">
          {content.pageTitle}
        </h1>
        <p className="text-theme-secondary mb-10 font-medium">
          {content.pageSubtitle}
        </p>

        {content.items.length > 0 && (
          <section className="mb-12" aria-label={content.featuredLabel}>
            <h2 className="text-sm font-medium text-theme-secondary mb-5">
              {content.featuredLabel}
            </h2>
            <div className="grid grid-cols-2 gap-4">
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
          <div className="h-48 skeleton" />
        )}
        {!reposLoading && repos.length > 0 && (
          <section aria-label={content.githubReposLabel}>
            <h2 className="text-sm font-medium text-theme-secondary mb-5">
              {content.githubReposLabel}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {repos.slice(0, 12).map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    block p-5 rounded-xl
                    border border-theme-default
                    hover:border-theme-hover
                    hover:shadow-sm transition-all duration-150
                  "
                >
                  <h3 className="font-bold text-theme-primary leading-snug tracking-tight">
                    {repo.name}
                  </h3>
                  {repo.description && (
                    <p className="text-sm font-medium text-theme-secondary mt-1.5 line-clamp-2 leading-relaxed">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-4 text-xs font-semibold text-theme-muted">
                    {repo.language && <span>{repo.language}</span>}
                    <span>★ {repo.stargazers_count}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {content.items.length === 0 && !reposLoading && repos.length === 0 && (
          <p className="text-theme-muted">{content.emptyState}</p>
        )}
      </main>
    </div>
  )
}
