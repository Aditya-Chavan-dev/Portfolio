import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { EnrichedProject } from '@/types/project'

interface Props {
  project: EnrichedProject
  onClose: () => void
}

export default function ProjectDetailOverlay({ project, onClose }: Props) {
  // Back button functionality triggers closes overlay 
  useEffect(() => {
    window.history.pushState({ modal: true }, '', '')
    const handlePopState = () => onClose()
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [onClose])

  const meta = project.meta

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
        <motion.div 
          onClick={e => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white dark:bg-[#131315] rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto border border-black/[0.04] dark:border-white/[0.04] shadow-xl flex flex-col font-sans"
        >
          {/* Header */}
          <div className="p-6 pb-4 border-b border-black/[0.03] dark:border-white/[0.03] flex justify-between items-start">
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.name}</h2>
              <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="text-amber-600 dark:text-amber-400 hover:underline">GitHub →</a>}
                {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-amber-600 dark:text-amber-400 hover:underline">Live Demo →</a>}
              </div>
            </div>
            <button onClick={onClose} className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded-full text-gray-400">✕</button>
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col gap-6">
            {/* ABOUT */}
            <Section title="ABOUT">
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {meta?.shortDescription || project.description || "No description provided."}
              </p>
            </Section>

            <Divider />

            {/* TECH STACK */}
            <Section title="TECH STACK">
              <div className="flex flex-wrap gap-2 mb-1">
                {(meta?.techStack || project.topics).map(topic => (
                  <span key={topic} className="px-2.5 py-1 bg-black/[0.04] dark:bg-white/[0.04] rounded text-xs font-medium text-gray-700 dark:text-gray-200">
                    {topic}
                  </span>
                ))}
              </div>
            </Section>

            <Divider />

            {/* METRICS */}
            <Section title="METRICS">
              <ul className="flex flex-col gap-2 mt-1">
                {(meta?.metrics || []).map((m: any, i: number) => (
                  <li key={i} className="flex justify-between items-center text-sm border-b border-black/[0.02] dark:border-white/[0.02] pb-1.5 last:border-0 last:pb-0">
                    <span className="font-medium text-gray-600 dark:text-gray-300">{m.title}</span>
                    <span className="font-bold text-gray-800 dark:text-gray-100">{m.value}</span>
                  </li>
                ))}
                {(!meta?.metrics || meta.metrics.length === 0) && (
                  <li className="text-sm text-gray-400 dark:text-gray-500 text-xs">
                    No custom metrics added yet.
                  </li>
                )}
              </ul>
            </Section>

            <Divider />

            {/* LISTS SECTIONS */}
            {meta ? (
              <>
                <ListSection title="FLAGSHIP FEATURES" items={meta.flagshipFeatures} />
                <Divider />
                <ListSection title="LEARNINGS & BIG ISSUES" items={meta.learningsIssues} />
              </>
            ) : (
              <div className="text-sm text-gray-400 dark:text-gray-500 text-center py-4">Details coming soon</div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 tracking-wider">{title}</h4>
      {children}
    </div>
  )
}

function ListSection({ title, items }: { title: string; items?: any[] }) {
  return (
    <Section title={title}>
      <ul className="flex flex-col gap-3">
        {items?.map((item, i) => (
          <li key={i} className="flex gap-3 text-sm text-gray-600 dark:text-gray-300 items-start">
            <span className="font-bold text-amber-600 dark:text-amber-400 text-xs pt-0.5">0{i+1}</span>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800 dark:text-gray-200">{item.title}</span>
              <span className="text-gray-500 dark:text-gray-400">{item.description}</span>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Divider() {
  return <hr className="border-black/[0.04] dark:border-white/[0.04]" />
}
