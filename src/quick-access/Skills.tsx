import { useState, useEffect, useCallback } from 'react'
import { SectionNav }       from '@/common/shared/SectionNav'
import { useSkillsContent } from './useSkillsContent'
import { SkillCategoryBlock } from './SkillCategoryBlock'
import EditableText from '@/admin/EditableText'
import { useEditMode } from '@/admin/EditModeContext'
import { useFeaturedProjects } from '@/common/hooks/useFeaturedProjects'
import { Plus } from 'lucide-react'
import type { SkillCategory } from './skills.types'

export default function Skills() {
  const { content, loading: contentLoading } = useSkillsContent()
  const { projects, loading: projectsLoading } = useFeaturedProjects()
  const { mode, updateDraft, draftData } = useEditMode()
  const isEditing = mode === 'edit'

  const loading = contentLoading || projectsLoading

  // Local categories state — starts from content, overridden by draft
  const [localCategories, setLocalCategories] = useState<SkillCategory[] | null>(null)

  // Sync from Firestore content when it loads (and when NOT editing)
  useEffect(() => {
    if (content && !localCategories) {
      // Check if draft already has categories
      const draftCats = draftData['skills.categories']
      if (draftCats) {
        setLocalCategories(draftCats)
      } else {
        setLocalCategories(content.categories)
      }
    }
  }, [content, localCategories, draftData])

  // When categories change (add/remove), push to draft
  const handleCategoriesChange = useCallback((newCategories: SkillCategory[]) => {
    setLocalCategories(newCategories)
    updateDraft('skills.categories', newCategories)
  }, [updateDraft])

  function handleAddCategory() {
    if (!localCategories) return
    const newCategory: SkillCategory = {
      name: 'New Category',
      items: [],
    }
    handleCategoriesChange([...localCategories, newCategory])
  }

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

  const categories = localCategories || content.categories

  return (
    <div className="min-h-screen bg-theme-primary pb-24 md:pb-0">
      <SectionNav />
      <main className="max-w-3xl mx-auto px-6 md:px-8 py-4 md:py-6">
        <EditableText id="skills.pageTitle" value={content.pageTitle} as="h1" className="text-2xl md:text-3xl font-bold text-theme-primary mb-2 tracking-tight" />
        <EditableText id="skills.pageSubtitle" value={content.pageSubtitle} as="p" className="text-sm md:text-base text-theme-secondary mb-5" />

        {categories.length > 0 ? (
          <div className="space-y-5">
            {categories.map((cat, catIndex) => (
              <SkillCategoryBlock
                key={`${cat.name}-${catIndex}`}
                category={cat}
                categoryIndex={catIndex}
                projects={projects}
                allCategories={categories}
                onCategoriesChange={handleCategoriesChange}
              />
            ))}
          </div>
        ) : (
          <p className="text-theme-muted text-sm">{content.emptyState}</p>
        )}

        {/* Add Category button - visible only in edit mode */}
        {isEditing && (
          <button
            onClick={handleAddCategory}
            className="
              mt-5 w-full py-3 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700
              flex items-center justify-center gap-2
              text-sm text-gray-400 dark:text-gray-600 hover:text-amber-500 hover:border-amber-500
              transition-all duration-200 cursor-pointer
            "
          >
            <Plus size={16} />
            Add Category
          </button>
        )}
      </main>
    </div>
  )
}


