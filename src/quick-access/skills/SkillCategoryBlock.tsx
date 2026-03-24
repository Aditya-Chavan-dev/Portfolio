import type { SkillCategory } from './skills.types'
import type { EnrichedProject } from '@/types/project'

interface Props {
  readonly category: SkillCategory
  readonly projects?: EnrichedProject[]
}

export function SkillCategoryBlock({ category }: Props) {
  return (
    <section aria-label={category.name} className="flex flex-col gap-1">
      <h2 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 flex items-center gap-1 uppercase tracking-wider">
        <span className="w-1 h-1 bg-amber-500 rounded-full" />
        {category.name}
      </h2>
      
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 pt-1">
        {category.items.map((skill) => {
          return (
            <div 
              key={skill.id}
              className="
                bg-white dark:bg-[#131315] border border-black/[0.03] dark:border-white/[0.04] rounded-xl p-1.5 
                flex flex-col items-center justify-center gap-1 text-center h-16
                hover:scale-105 hover:shadow-md
                transition-all duration-200 cursor-default group
              "
            >
              <img 
                src={skill.iconUrl} 
                className="w-7 h-7 object-contain transition-transform group-hover:scale-105" 
                alt={`${skill.name} icon`}
                onError={(e) => {
                  // Fallback: try -plain variant if -original fails
                  const target = e.target as HTMLImageElement
                  if (target.src.includes('-original.svg') && !target.dataset.fallbackAttempted) {
                    target.dataset.fallbackAttempted = 'true'
                    target.src = target.src.replace('-original.svg', '-plain.svg')
                  }
                }}
              />
              <span className="text-xs text-gray-700 dark:text-gray-300 font-medium tracking-wide">
                {skill.name}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
