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
    <section aria-label={category.name} className="flex flex-col gap-4 mb-8">
      <div className="flex items-center justify-between border-b border-white/5 pb-2">
        <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
            <h2 className="mono-label !opacity-80 !text-[10px] tracking-[0.2em] uppercase">
                <EditableText id={`skills.categories.${categoryIndex}.name`} value={category.name} as="span" />
            </h2>
        </div>
        <div className="mono-label !opacity-20 !text-[8px]">SUB_SYS_0x{categoryIndex + 1} // STATUS: OPERATIONAL</div>
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
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
        {category.items.map((skill, skillIndex) => {
          return (
            <div 
              key={skill.id}
              className="
                glass-premium p-4 flex items-center gap-4 relative overflow-hidden group 
                hover:border-amber-500/20 transition-all duration-300 cursor-default
              "
            >
              {/* Background scanning effect */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-amber-500/20 opacity-0 group-hover:opacity-100 group-hover:animate-scan-line" />
              
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

              <div className="w-10 h-10 flex-shrink-0 glass-premium !bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-amber-500/30 transition-colors relative">
                {skill.iconUrl ? (
                    <img 
                    src={skill.iconUrl} 
                    className="w-6 h-6 object-contain opacity-100 transition-all duration-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.3)]" 
                    alt={`${skill.name} icon`}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement
                        if (target.src.includes('-original.svg') && !target.dataset.fallbackAttempted) {
                        target.dataset.fallbackAttempted = 'true'
                        target.src = target.src.replace('-original.svg', '-plain.svg')
                        }
                    }}
                    />
                ) : (
                    <div className="mono-label !text-[8px] opacity-20">NULL</div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <div className="flex items-center justify-between">
                    <EditableText 
                        id={`skills.categories.${categoryIndex}.items.${skillIndex}.name`} 
                        value={skill.name} 
                        as="span" 
                        className="text-[11px] text-white/90 font-mono tracking-wider group-hover:text-amber-500 transition-colors" 
                    />
                </div>
              </div>
            </div>
          )
        })}

        {/* Add Skill button - visible only in edit mode */}
        {isEditing && (
          <button
            onClick={() => setShowAddModal(true)}
            className="
              glass-premium border-dashed !bg-transparent p-4
              flex flex-col items-center justify-center gap-2
              text-white/20 hover:text-amber-500 hover:border-amber-500/40
              transition-all duration-300 cursor-pointer h-full
            "
            title="Add new skill"
          >
            <Plus size={18} />
            <span className="mono-label !text-[9px]">INIT_NEW_ENTRY</span>
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


