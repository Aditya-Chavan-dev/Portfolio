import type { ExperienceItem } from './experience.types'

interface Props {
  readonly item:   ExperienceItem
  readonly isLast: boolean
}

export function ExperienceCard({ item, isLast }: Props) {
  return (
    <article className="relative pl-8">
      {/* Timeline line */}
      {!isLast && (
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-[22px] bottom-0 w-px bg-gray-200 dark:bg-gray-800"
        />
      )}
      {/* Timeline dot */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-[6px] w-[15px] h-[15px] rounded-full border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950"
      />

      <div className="pb-8">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 leading-snug">
          {item.role}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {item.company} · {item.duration}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 leading-relaxed">
          {item.description}
        </p>
        {item.tags.length > 0 && (
          <ul aria-label="Skills used" className="flex flex-wrap gap-2 mt-3">
            {item.tags.map((tag) => (
              <li key={tag}>
                <span className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
