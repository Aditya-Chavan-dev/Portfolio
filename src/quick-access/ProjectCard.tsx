import type { EnrichedProject } from '@/common/types/project'

interface Props {
  readonly project: EnrichedProject
}

export function ProjectCard({ project }: Props) {
  const meta = project.meta

  return (
    <div className="w-full p-6 text-left rounded-2xl bg-white dark:bg-[#131315] border border-black/[0.03] dark:border-white/[0.03] shadow-sm hover:shadow-md transition-shadow flex flex-col h-full font-sans">
      <div className="flex justify-between items-start">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-snug tracking-tight">
          {project.name}
        </h3>
        {project.stars > 0 && (
          <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
            ★ {project.stars}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 leading-relaxed flex-1">
        {meta?.shortDescription || project.description || "No description provided."}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-black/[0.02] dark:border-white/[0.02]">
        {project.language && (
          <span className="text-xs px-2.5 py-1 rounded bg-black/[0.04] dark:bg-white/[0.04] text-gray-800 dark:text-gray-200 font-semibold">
            {project.language}
          </span>
        )}
        {project.topics.slice(0, 3).map((topic) => (
          <span key={topic} className="text-xs px-2 py-1 rounded bg-black/[0.02] dark:bg-white/[0.02] text-gray-500 dark:text-gray-400">
            {topic}
          </span>
        ))}
      </div>
    </div>
  )
}


