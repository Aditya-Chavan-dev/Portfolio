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
        w-full p-6 text-left rounded-2xl
        glass-card premium-hover cursor-pointer
      "
    >
      <h3 className="font-bold text-lg text-theme-primary leading-snug tracking-tight">
        {project.name}
      </h3>
      <p className="text-sm text-theme-secondary mt-1 line-clamp-2 leading-snug">
        {project.description}
      </p>
      {project.tags.length > 0 && (
        <ul aria-label="Tech tags" className="flex flex-wrap gap-2 mt-3">
          {project.tags.map((tag) => (
            <li key={tag}>
              <span className="text-xs px-2 py-1 rounded-md tag">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      )}
    </button>
  )
}
