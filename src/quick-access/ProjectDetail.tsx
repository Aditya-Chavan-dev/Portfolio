import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { incrementLocalCounter } from '@/common/lib/metrics'
import { useGithubProjects } from '@/common/hooks/useGithubProjects'
import { projectMetadata } from '@/common/lib/projectMetadata'
import { SectionNav } from '@/common/shared/SectionNav'
import EditableText from '@/admin/EditableText'

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>()
  const { projects, loading, error } = useGithubProjects()
  const [firestoreOverrides, setFirestoreOverrides] = useState<Record<string, any>>({})

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'live', 'projects'), (snap) => {
      incrementLocalCounter('reads')
      if (snap.exists()) {
        setFirestoreOverrides(snap.data() || {})
      }
    })
    return unsub
  }, [])

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
  const fsOverrides = firestoreOverrides[project.name] || {}
  // Merge: GitHub base → local metadata → Firestore overrides (highest priority)
  const mergedProject = { ...project, ...meta, ...fsOverrides } as any

  return (
    <div className="h-screen w-full bg-transparent flex flex-col overflow-hidden font-sans relative">
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-system-grid" />
      <SectionNav />

      <motion.main 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 flex flex-col gap-6 max-w-7xl mx-auto w-full px-12 pb-12 mt-4 min-h-0 relative z-10 overflow-y-auto scrollbar-hide"
      >
        {/* Header Metadata Section */}
        <div className="flex items-end justify-between mb-2">
            <div className="flex flex-col gap-1">
                <Link 
                  to="/projects" 
                  className="mono-label !opacity-40 hover:!opacity-100 hover:text-amber-500 transition-all flex items-center gap-2 mb-4 group"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> RETURN_TO_GALLERY
                </Link>
                <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
                    <span className="mono-label !text-amber-500 !opacity-100">DATA_REPORTS // PRJ_{mergedProject.name.substring(0,3).toUpperCase()}</span>
                </div>
            </div>
            <div className="flex flex-col items-end opacity-20 mono-label text-[8px]">
                <span>REF_ID: {Math.random().toString(16).substring(2, 8).toUpperCase()}</span>
                <span>LEVEL: SEC_04</span>
            </div>
        </div>

        {/* COMBINED DOSSIER HEADER */}
        <div className="glass-premium p-10 grid grid-cols-1 md:grid-cols-3 gap-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 mono-label !opacity-10">MOD_DESC_0x1</div>
          
          {/* Left Column (Primary Details) */}
          <div className="md:col-span-1 flex flex-col justify-between gap-8 h-full">
            <div className="space-y-4">
                <h1 className="text-5xl font-black text-white tracking-tighter leading-none">
                {mergedProject.name}
                </h1>
                <div className="flex flex-col gap-1 mono-label !opacity-40 !text-[10px]">
                <span className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                    RANGE: {mergedProject.startDate || 'JAN 2024'} // {mergedProject.endDate || 'PRESENT'}
                </span>
                <span className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-white/20 rounded-full" />
                    THROUGHPUT: 142_COMMITS
                </span>
                </div>
            </div>

            <a 
              href={mergedProject.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative w-full py-4 glass-premium !bg-white/5 border border-white/10 text-[10px] font-mono text-white/40 hover:text-amber-500 hover:border-amber-500/40 transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-3"
            >
              INIT_REMOTE_ACCESS
              <span className="text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </a>
          </div>

          {/* Right Column (Abstract Narrative) */}
          <div className="md:col-span-2 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/5 pt-8 md:pt-0 md:pl-12">
            <span className="mono-label !opacity-30 mb-4 tracking-[0.3em]">EXECUTIVE_SUMMARY</span>
            <EditableText 
              id={`projects.${project.name}.description`} 
              value={mergedProject.description || "No description provided."} 
              as="p" 
              className="text-xl text-white/50 font-serif leading-relaxed italic" 
            />
          </div>
        </div>

        {/* 2x2 DOSSIER DATA GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0 w-full mb-8">
          
          {/* Box 1: TECH STACK (The Hardware) */}
          <div className="glass-premium p-8 flex flex-col gap-6 relative overflow-hidden hover:border-white/20 transition-colors group">
            <div className="absolute top-0 right-0 p-4 mono-label !opacity-10">MOD_STACK_0x2</div>
            <div className="flex items-center justify-between">
                <h2 className="mono-label !opacity-60 tracking-[0.2em]">01_SYSTEM_COMPONENTS</h2>
                <div className="w-2 h-2 bg-amber-500/20 rounded-full" />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {(mergedProject.meta?.techStack || mergedProject.topics || []).map((tech: string, i: number) => (
                <span key={i} className="px-4 py-2 glass-premium !bg-white/5 text-[10px] font-mono text-white/60 border border-white/5 hover:border-amber-500/30 hover:text-amber-500 transition-all duration-300">
                  <EditableText id={`projects.${project.name}.techStack.${i}`} value={tech} as="span" />
                </span>
              ))}
            </div>
          </div>

          {/* Box 2: METRICS (The Vital Signs) */}
          <div className="glass-premium p-8 flex flex-col gap-6 relative overflow-hidden hover:border-white/20 transition-colors">
            <div className="absolute top-0 right-0 p-4 mono-label !opacity-10">MOD_SIG_0x3</div>
            <h2 className="mono-label !opacity-60 tracking-[0.2em]">02_PERFORMANCE_METRICS</h2>
            <ul className="flex flex-col gap-4 mt-2">
              {(mergedProject.meta?.metrics || []).map((m: any, i: number) => (
                <li key={i} className="flex justify-between items-center text-sm border-b border-white/5 pb-3">
                  <span className="text-[11px] font-mono text-white/40 uppercase tracking-widest">{m.title}</span>
                  <span className="font-bold text-amber-500 font-mono tracking-tighter">{m.value}</span>
                </li>
              ))}
              {(!mergedProject.meta?.metrics || mergedProject.meta.metrics.length === 0) && (
                <li className="text-[10px] text-white/20 font-mono italic">NO_CUSTOM_METRICS_LOGGED</li>
              )}
            </ul>
          </div>

          {/* Box 3: FLAGSHIP FEATURES (The Payload) */}
          <div className="glass-premium p-8 flex flex-col gap-6 relative overflow-hidden hover:border-white/20 transition-colors">
            <div className="absolute top-0 right-0 p-4 mono-label !opacity-10">MOD_PAYLOAD_0x4</div>
            <h2 className="mono-label !opacity-60 tracking-[0.2em]">03_CORE_FEATURES</h2>
            <ul className="flex flex-col gap-6 mt-2">
              {(mergedProject.meta?.flagshipFeatures || []).map((feat: any, i: number) => (
                <li key={i} className="flex gap-4 items-start group">
                  <span className="text-[8px] font-mono text-amber-500/40 bg-amber-500/5 w-6 h-6 flex items-center justify-center rounded-full border border-amber-500/10 transition-colors group-hover:bg-amber-500/20 group-hover:text-amber-500">0{i+1}</span>
                  <div className="flex flex-col gap-1">
                    <EditableText id={`projects.${project.name}.flagshipFeatures.${i}.title`} value={feat.title} as="span" className="font-bold text-white group-hover:text-amber-500 transition-colors text-sm uppercase tracking-wider" />
                    <EditableText id={`projects.${project.name}.flagshipFeatures.${i}.description`} value={feat.description} as="span" className="text-white/30 text-xs leading-relaxed" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Box 4: LEARNINGS & ISSUES (The Debug Log) */}
          <div className="glass-premium p-8 flex flex-col gap-6 relative overflow-hidden hover:border-white/20 transition-colors">
            <div className="absolute top-0 right-0 p-4 mono-label !opacity-10">MOD_LOG_0x5</div>
            <h2 className="mono-label !opacity-60 tracking-[0.2em]">04_POST_MORTEM</h2>
            <ul className="flex flex-col gap-6 mt-2">
              {(mergedProject.meta?.learningsIssues || []).map((learn: any, i: number) => (
                <li key={i} className="flex gap-4 items-start group">
                  <span className="text-[8px] font-mono text-white/20 bg-white/5 w-6 h-6 flex items-center justify-center rounded-full border border-white/10 group-hover:bg-amber-500/10 group-hover:text-amber-500/60 transition-colors">0{i+1}</span>
                  <div className="flex flex-col gap-1">
                    <EditableText id={`projects.${project.name}.learningsIssues.${i}.title`} value={learn.title} as="span" className="font-bold text-white/70 text-sm uppercase tracking-wider group-hover:text-white transition-colors" />
                    <EditableText id={`projects.${project.name}.learningsIssues.${i}.description`} value={learn.description} as="span" className="text-white/30 text-xs leading-relaxed" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.main>
    </div>

  )
}


