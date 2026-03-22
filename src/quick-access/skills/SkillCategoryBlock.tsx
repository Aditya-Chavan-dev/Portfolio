import type { SkillCategory } from './skills.types'
import type { EnrichedProject } from '@/types/project'

interface Props {
  readonly category: SkillCategory
  readonly projects: EnrichedProject[]
}

const LEVEL_WIDTH: Record<string, string> = {
  Beginner:     'w-1/3',
  Intermediate: 'w-2/3',
  Advanced:     'w-full',
}

const ICON_SLUG: Record<string, string> = {
  'React': 'react',
  'TypeScript': 'typescript',
  'Tailwind CSS': 'tailwindcss',
  'Node.js': 'nodejs',
  'Firebase': 'firebase',
}

export function SkillCategoryBlock({ category, projects }: Props) {
  return (
    <section aria-label={category.name}>
      <h2 className="text-base font-semibold text-theme-primary mb-4">
        {category.name}
      </h2>
      <ul className="space-y-3">
        {category.items.map((skill) => {
          const matchedProjects = (projects || []).filter(p => {
            const topics = Array.isArray(p.topics) ? p.topics : []
            const tech = Array.isArray(p.meta?.techStack) ? p.meta.techStack : []
            const nameMatch = (t: string) => t.toLowerCase() === skill.name.toLowerCase()
            return topics.some(nameMatch) || tech.some(nameMatch)
          })

          return (
            <li key={skill.name}>
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  {ICON_SLUG[skill.name] && (
                    <img 
                      src={`https://cdn.jsdelivr.net/gh/devicon/devicon@latest/icons/${ICON_SLUG[skill.name]}/${ICON_SLUG[skill.name]}-original.svg`} 
                      className="w-4 h-4" 
                      alt={`${skill.name} icon`}
                    />
                  )}
                  <span className="text-sm text-theme-secondary">{skill.name}</span>
                </div>
                <span className="text-xs text-theme-muted">{skill.level}</span>
              </div>
              <div className="h-1.5 bg-theme-secondary rounded-full overflow-hidden mb-2">
                <div
                  className={`h-full bg-indigo-600 dark:bg-indigo-500 rounded-full ${LEVEL_WIDTH[skill.level] ?? 'w-1/2'}`}
                />
              </div>

              {matchedProjects.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  <span className="text-[10px] text-theme-muted self-center mr-1">Used in:</span>
                  {matchedProjects.map(p => (
                    <span key={p.name} className="px-1.5 py-0.5 text-[9px] bg-theme-secondary text-theme-secondary rounded md border border-theme-default">
                      {p.name}
                    </span>
                  ))}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
