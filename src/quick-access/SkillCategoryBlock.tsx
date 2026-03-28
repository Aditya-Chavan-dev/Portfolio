import { useState } from 'react'
import type { SkillCategory, SkillItem } from './skills.types'
import type { EnrichedProject } from '@/common/types/project'
import EditableText from '@/admin/EditableText'
import AddSkillModal from '@/admin/AddSkillModal'
import { useEditMode } from '@/admin/EditModeContext'
import { X, Plus } from 'lucide-react'

interface Props {
  readonly category: SkillCategory
  readonly categoryIndex: number
  readonly projects?: EnrichedProject[]
  readonly allCategories: SkillCategory[]
  readonly onCategoriesChange: (categories: SkillCategory[]) => void
}

export function SkillCategoryBlock({ category, categoryIndex, allCategories, onCategoriesChange }: Props) {
  const { mode } = useEditMode()
  const [showAddModal, setShowAddModal] = useState(false)
  const isEditing = mode === 'edit'

  function handleDeleteSkill(skillIndex: number) {
    const updatedCategories = allCategories.map((cat, i) => {
      if (i !== categoryIndex) return cat
      return { ...cat, items: cat.items.filter((_, si) => si !== skillIndex) }
    })
    onCategoriesChange(updatedCategories)
  }

  function handleAddSkill(skill: SkillItem) {
    const updatedCategories = allCategories.map((cat, i) => {
      if (i !== categoryIndex) return cat
      return { ...cat, items: [...cat.items, skill] }
    })
    onCategoriesChange(updatedCategories)
  }

  function handleDeleteCategory() {
    onCategoriesChange(allCategories.filter((_, i) => i !== categoryIndex))
  }

  return (
    <section aria-label={category.name} className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <h2 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 flex items-center gap-1 uppercase tracking-wider">
          <span className="w-1 h-1 bg-amber-500 rounded-full" />
          <EditableText id={`skills.categories.${categoryIndex}.name`} value={category.name} as="span" />
        </h2>
        {isEditing && (
          <button
            onClick={handleDeleteCategory}
            className="text-red-500/60 hover:text-red-500 transition-colors cursor-pointer"
            title="Delete this category"
          >
            <X size={12} />
          </button>
        )}
      </div>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 pt-1">
        {category.items.map((skill, skillIndex) => {
          return (
            <div 
              key={skill.id}
              className="
                bg-white dark:bg-[#131315] border border-black/[0.03] dark:border-white/[0.04] rounded-xl p-1.5 
                flex flex-col items-center justify-center gap-1 text-center h-16
                hover:scale-105 hover:shadow-md
                transition-all duration-200 cursor-default group relative
              "
            >
              {/* Delete button - visible only in edit mode */}
              {isEditing && (
                <button
                  onClick={() => handleDeleteSkill(skillIndex)}
                  className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer z-10"
                  title={`Remove ${skill.name}`}
                >
                  <X size={10} className="text-white" />
                </button>
              )}
              {skill.iconUrl && (
                <img 
                  src={skill.iconUrl} 
                  className="w-7 h-7 object-contain transition-transform group-hover:scale-105" 
                  alt={`${skill.name} icon`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    if (target.src.includes('-original.svg') && !target.dataset.fallbackAttempted) {
                      target.dataset.fallbackAttempted = 'true'
                      target.src = target.src.replace('-original.svg', '-plain.svg')
                    }
                  }}
                />
              )}
              <EditableText id={`skills.categories.${categoryIndex}.items.${skillIndex}.name`} value={skill.name} as="span" className="text-xs text-gray-700 dark:text-gray-300 font-medium tracking-wide" />
            </div>
          )
        })}

        {/* Add Skill button - visible only in edit mode */}
        {isEditing && (
          <button
            onClick={() => setShowAddModal(true)}
            className="
              border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl h-16
              flex flex-col items-center justify-center gap-1
              text-gray-400 dark:text-gray-600 hover:text-amber-500 hover:border-amber-500
              transition-all duration-200 cursor-pointer
            "
            title="Add new skill"
          >
            <Plus size={18} />
            <span className="text-[9px] font-medium">Add</span>
          </button>
        )}
      </div>

      <AddSkillModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddSkill}
      />
    </section>
  )
}


