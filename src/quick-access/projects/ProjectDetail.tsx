import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGithubProjects } from '@/hooks/useGithubProjects'
import { projectMetadata } from '@/lib/projectMetadata'
import { SectionNav } from '@/shared/SectionNav'

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>()
  const { projects, loading, error } = useGithubProjects()

  if (loading) {
    return (
      <div className="min-h-screen bg-theme-primary">
        <SectionNav />
        <div className="max-w-3xl mx-auto px-8 py-20 text-center text-theme-muted">
          Loading project details...
        </div>
      </div>
    )
  }

  if (error || !projects.length) {
    return (
      <div className="min-h-screen bg-theme-primary">
        <SectionNav />
        <div className="max-w-3xl mx-auto px-8 py-20 text-center text-red-500 text-sm">
          Failed to load projects. <br/>
          {error ? `Debug: ${error}` : 'Debug: Zero non-forked non-archived repositories found.'}
        </div>
      </div>
    )
  }

  // Find by name or slug
  const project = projects.find(p => p.name === projectId)

  if (!project) {
    return (
      <div className="min-h-screen bg-theme-primary">
        <SectionNav />
        <div className="max-w-3xl mx-auto px-8 py-20 text-center text-theme-muted">
          Project "{projectId}" not found.
        </div>
      </div>
    )
  }

  const meta = projectMetadata[project.name] || {}
  const mergedProject = { ...project, ...meta } as any

  return (
    <div className="h-screen w-full bg-theme-primary flex flex-col overflow-hidden font-sans">
      <SectionNav />

      <motion.main 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 flex flex-col gap-6 max-w-7xl mx-auto w-full px-8 pb-12 mt-4 min-h-0"
      >
        {/* Back navigation */}
        <Link 
          to="/projects" 
          className="text-xs text-theme-secondary hover:text-theme-primary transition-colors flex items-center gap-1 w-fit group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Back to Projects
        </Link>

        {/* COMBINED HEADER CARD  */}
        <div className="bg-white dark:bg-[#131315] rounded-2xl p-7 grid grid-cols-1 md:grid-cols-3 gap-8 border border-black/[0.03] dark:border-white/[0.03] shadow-sm w-full">
          {/* Left Column (Details) - 1/3 Width */}
          <div className="md:col-span-1 flex flex-col gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {mergedProject.name}
            </h1>
            <div className="flex flex-col gap-1.5 text-sm text-gray-500 dark:text-gray-400">
              <span className="text-gray-400 dark:text-gray-500">
                {mergedProject.startDate || 'Jan 2024'} - {mergedProject.endDate || 'Mar 2024'}
              </span>
              <span>Total Commits = 142</span>
            </div>
            <a 
              href={mergedProject.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 shadow-sm w-fit mt-2"
            >
              GitHub Repo ↗
            </a>
          </div>

          {/* Right Column (Description) - 2/3 Width */}
          <div className="md:col-span-2 flex items-center border-t md:border-t-0 md:border-l border-black/[0.05] dark:border-white/[0.05] pt-4 md:pt-0 md:pl-8">
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {mergedProject.description || "A premium layout showcasing dynamic visual grid and limits framing accurately streams efficiently without threshold triggers."}
            </p>
          </div>
        </div>

        {/* 2x2 BENTO CONTENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0 w-full">
          
          {/* Box 1: TECH STACK */}
          <div className="bg-white dark:bg-[#131315] rounded-2xl p-6 flex flex-col gap-3 border border-black/[0.03] dark:border-white/[0.03] overflow-y-auto">
            <h2 className="text-xs font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase">1. TECH STACK</h2>
            <div className="flex flex-wrap gap-2">
              {mergedProject.language && (
                <span className="px-3 py-1.5 bg-black/[0.04] dark:bg-white/[0.04] rounded-md text-xs font-medium text-gray-800 dark:text-gray-200">
                  {mergedProject.language}
                </span>
              )}
              {mergedProject.topics.map((topic: string) => (
                <span key={topic} className="px-3 py-1.5 bg-black/[0.04] dark:bg-white/[0.04] rounded-md text-xs font-medium text-gray-800 dark:text-gray-200">
                  {topic}
                </span>
              ))}
              {!mergedProject.language && mergedProject.topics.length === 0 && (
                <p className="text-sm text-gray-500 dark:text-gray-400">No tech stack listed.</p>
              )}
            </div>
          </div>

          {/* Box 2: METRICS */}
          <div className="bg-white dark:bg-[#131315] rounded-2xl p-6 flex flex-col gap-3 border border-black/[0.03] dark:border-white/[0.03] overflow-y-auto">
            <h2 className="text-xs font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase">2. METRICS</h2>
            <ul className="flex flex-col gap-3">
              {(mergedProject.meta?.metrics || []).map((m: any, i: number) => (
                <li key={i} className="flex justify-between items-center text-sm border-b border-black/[0.02] dark:border-white/[0.02] pb-2 last:border-0 last:pb-0">
                  <span className="font-medium text-gray-600 dark:text-gray-300">{m.title}</span>
                  <span className="font-bold text-gray-800 dark:text-gray-100">{m.value}</span>
                </li>
              ))}
              {(!mergedProject.meta?.metrics || mergedProject.meta.metrics.length === 0) && (
                <li className="text-sm text-gray-400 dark:text-gray-500 flex flex-col gap-1">
                  <span>No custom metrics added yet.</span>
                  <span className="text-xxs text-gray-400/60">Include metrics list (with title and value) inside portfolio.json later Node.</span>
                </li>
              )}
            </ul>
          </div>

          {/* Box 3: FLAGSHIP FEATURES */}
          <div className="bg-white dark:bg-[#131315] rounded-2xl p-6 flex flex-col gap-3 border border-black/[0.03] dark:border-white/[0.03] overflow-y-auto">
            <h2 className="text-xs font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase">3. FLAGSHIP FEATURES</h2>
            <ul className="flex flex-col gap-3">
              {(mergedProject.meta?.flagshipFeatures || []).map((feat: any, i: number) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-300 items-start">
                  <span className="font-bold text-amber-600 dark:text-amber-400 text-xs pt-0.5">0{i+1}</span>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{feat.title}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">{feat.description}</span>
                  </div>
                </li>
              ))}
              {(!mergedProject.meta?.flagshipFeatures || mergedProject.meta.flagshipFeatures.length === 0) && (
                <span className="text-sm text-gray-400 dark:text-gray-500">Details coming soon</span>
              )}
            </ul>
          </div>

          {/* Box 4: LEARNINGS & ISSUES */}
          <div className="bg-white dark:bg-[#131315] rounded-2xl p-6 flex flex-col gap-3 border border-black/[0.03] dark:border-white/[0.03] overflow-y-auto">
            <h2 className="text-xs font-bold tracking-wider text-gray-400 dark:text-gray-500 uppercase">4. LEARNINGS & BIG ISSUES</h2>
            <ul className="flex flex-col gap-3">
              {(mergedProject.meta?.learningsIssues || []).map((learn: any, i: number) => (
                <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-300 items-start">
                  <span className="font-bold text-amber-600 dark:text-amber-400 text-xs pt-0.5">0{i+1}</span>
                  <div className="flex flex-col">
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{learn.title}</span>
                    <span className="text-gray-500 dark:text-gray-400 text-xs">{learn.description}</span>
                  </div>
                </li>
              ))}
              {(!mergedProject.meta?.learningsIssues || mergedProject.meta.learningsIssues.length === 0) && (
                <span className="text-sm text-gray-400 dark:text-gray-500">Details coming soon</span>
              )}
            </ul>
          </div>
        </div>

      </motion.main>
    </div>

  )
}
