import type { ProjectItem } from './projects.types'

interface Props {
  readonly project: ProjectItem
  readonly onClick: () => void
}

export function ProjectCard({ project, onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        w-full p-5 text-left rounded-xl
        border border-gray-200 dark:border-gray-800
        hover:border-gray-400 dark:hover:border-gray-600
        hover:shadow-sm
        transition-all duration-150
      "
    >
      <h3 className="font-semibold text-gray-900 dark:text-gray-100 leading-snug">
        {project.name}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-snug">
        {project.description}
      </p>
      {project.tags.length > 0 && (
        <ul aria-label="Tech tags" className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((tag) => (
            <li key={tag}>
              <span className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      )}
    </button>
  )
}
