import type { SkillCategory } from './skills.types'

interface Props {
  readonly category: SkillCategory
}

const LEVEL_WIDTH: Record<string, string> = {
  Beginner:     'w-1/3',
  Intermediate: 'w-2/3',
  Advanced:     'w-full',
}

export function SkillCategoryBlock({ category }: Props) {
  return (
    <section aria-label={category.name}>
      <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">
        {category.name}
      </h2>
      <ul className="space-y-3">
        {category.items.map((skill) => (
          <li key={skill.name}>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-gray-700 dark:text-gray-300">{skill.name}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">{skill.level}</span>
            </div>
            <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gray-400 dark:bg-gray-500 rounded-full ${LEVEL_WIDTH[skill.level] ?? 'w-1/2'}`}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
