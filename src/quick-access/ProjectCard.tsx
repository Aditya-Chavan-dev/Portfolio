import type { EnrichedProject } from '@/common/types/project'

interface Props {
  readonly project: EnrichedProject
}

export function ProjectCard({ project }: Props) {
  const meta = project.meta

  return (
    <div className="w-full p-6 text-left rounded-2xl glass-card transition-all duration-300 flex flex-col h-full font-sans group hover:border-amber-500/30">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-theme-primary leading-snug tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
          {project.name}
        </h3>
        {project.stars > 0 && (
          <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
            ★ {project.stars}
          </span>
        )}
      </div>
      <p className="text-sm text-theme-secondary mt-2 line-clamp-2 leading-relaxed flex-1">
        {meta?.shortDescription || project.description || "No description provided."}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-theme-default">
        {project.language && (
          <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-theme-muted/5 text-theme-primary font-bold uppercase tracking-wider">
            {project.language}
          </span>
        )}
        {project.topics.slice(0, 3).map((topic) => (
          <span key={topic} className="text-[10px] font-mono px-2 py-1 rounded bg-theme-muted/5 text-theme-muted uppercase tracking-wider">
            {topic}
          </span>
        ))}
      </div>
    </div>
  )
}


