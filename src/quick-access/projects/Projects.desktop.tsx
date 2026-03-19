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
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <SectionNav />
      <main className="max-w-4xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight">
          {content.pageTitle}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">
          {content.pageSubtitle}
        </p>

        {content.items.length > 0 && (
          <section className="mb-12" aria-label={content.featuredLabel}>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-5">
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
          <div className="h-48 rounded-xl bg-gray-100 dark:bg-gray-900 animate-pulse" />
        )}
        {!reposLoading && repos.length > 0 && (
          <section aria-label={content.githubReposLabel}>
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-5">
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
                    border border-gray-200 dark:border-gray-800
                    hover:border-gray-400 dark:hover:border-gray-600
                    hover:shadow-sm transition-all duration-150
                  "
                >
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 leading-snug">
                    {repo.name}
                  </h3>
                  {repo.description && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-snug">
                      {repo.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-3 text-xs text-gray-400 dark:text-gray-600">
                    {repo.language && <span>{repo.language}</span>}
                    <span>★ {repo.stargazers_count}</span>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {content.items.length === 0 && !reposLoading && repos.length === 0 && (
          <p className="text-gray-400 dark:text-gray-600">{content.emptyState}</p>
        )}
      </main>
    </div>
  )
}
