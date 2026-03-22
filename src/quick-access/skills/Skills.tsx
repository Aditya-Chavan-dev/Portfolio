import { SectionNav }       from '@/shared/SectionNav'
import { useSkillsContent } from './useSkillsContent'
import { SkillCategoryBlock } from './SkillCategoryBlock'
import { useFeaturedProjects } from '@/hooks/useFeaturedProjects'

export default function Skills() {
  const { content, loading: contentLoading } = useSkillsContent()
  const { projects, loading: projectsLoading } = useFeaturedProjects()

  const loading = contentLoading || projectsLoading

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center" role="status" aria-live="polite" aria-busy="true">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-theme-default border-t-theme-primary rounded-full animate-spin" aria-hidden="true" />
          <span className="text-sm text-theme-muted">Loading…</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-theme-primary pb-24 md:pb-0">
      <SectionNav />
      <main className="max-w-3xl mx-auto px-6 md:px-8 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-theme-primary mb-2 tracking-tight">
          {content.pageTitle}
        </h1>
        <p className="text-sm md:text-base text-theme-secondary mb-10">
          {content.pageSubtitle}
        </p>

        {content.categories.length > 0 ? (
          <div className="space-y-10">
            {content.categories.map((cat) => (
              <SkillCategoryBlock key={cat.name} category={cat} projects={projects} />
            ))}
          </div>
        ) : (
          <p className="text-theme-muted text-sm">{content.emptyState}</p>
        )}
      </main>
    </div>
  )
}
