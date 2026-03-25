import { SectionNav }            from '@/shared/SectionNav'
import { useExperienceContent }  from './useExperienceContent'
import { ExperienceCard }        from './ExperienceCard'
import EditableText from '@/admin/components/EditableText'

export default function Experience() {
  const { content, loading } = useExperienceContent()

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
        <EditableText id="experience.pageTitle" value={content.pageTitle} as="h1" className="text-2xl md:text-3xl font-bold text-theme-primary mb-2 tracking-tight" />
        <EditableText id="experience.pageSubtitle" value={content.pageSubtitle} as="p" className="text-sm md:text-base text-theme-secondary mb-10" />

        {/* Filter out archived items for public view */}
        {(() => {
          const visibleItems = content.items.filter(item => !item.archived)
          return visibleItems.length > 0 ? (
          <div>
            {visibleItems.map((item, i) => (
              <ExperienceCard
                key={item.id}
                item={item}
                itemIndex={i}
                isLast={i === visibleItems.length - 1}
              />
            ))}
          </div>
        ) : (
          <p className="text-theme-muted text-sm">{content.emptyState}</p>
        )
        })()}
      </main>
    </div>
  )
}
