import { useNavigate } from 'react-router-dom'
import { useFeaturedProjects } from '@/common/hooks/useFeaturedProjects'
import { ProjectCard } from './ProjectCard'
import { SectionNav } from '@/common/shared/SectionNav'


export default function Projects() {
  const { projects, loading, error } = useFeaturedProjects()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-theme-primary font-sans">
      <SectionNav />
      
      <main className="max-w-5xl mx-auto px-8 py-12">
        <h1 className="text-3xl font-bold text-theme-primary mb-2 tracking-tight">
          Featured Projects
        </h1>
        <p className="text-theme-secondary mb-10 font-medium">
          A curated selection of what I've built.
        </p>

        {loading && <ProjectsSkeleton />}
        
        {error && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm">
            Couldn't load projects right now.
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400">Projects coming soon.</p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project.id} onClick={() => navigate(`/projects/${project.name}`)} className="cursor-pointer">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </main>

    </div>
  )
}

function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl p-6 bg-white dark:bg-[#131315] border border-black/[0.03] dark:border-white/[0.03] animate-pulse flex flex-col h-40 shadow-sm">
          <div className="h-5 w-2/3 rounded-md bg-gray-200 dark:bg-gray-800 mb-3" />
          <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-800 mb-2" />
          <div className="h-4 w-4/5 rounded-md bg-gray-200 dark:bg-gray-800" />
          <div className="flex gap-2 mt-auto pt-4">
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-md" />
            <div className="h-6 w-16 bg-gray-200 dark:bg-gray-800 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  )
}


