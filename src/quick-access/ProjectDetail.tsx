import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { onSnapshot, doc } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { incrementLocalCounter } from '@/common/lib/metrics'
import { useFeaturedProjects } from '@/common/hooks/useFeaturedProjects'
import { projectMetadata } from '@/common/lib/projectMetadata'
import { SectionNav } from '@/common/shared/SectionNav'
import EditableText from '@/admin/EditableText'

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>()
  const { projects, loading, error } = useFeaturedProjects()
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
    <div className="h-screen w-full bg-theme-base flex flex-col overflow-hidden font-sans relative theme-transition">
      {/* ── Dynamic Starstruck Background ────────────────────────── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-system-grid opacity-[0.03]" />
        <div className="absolute top-[20%] left-[-10%] w-[60%] h-[60%] starstruck-bg-glow opacity-30" />
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] starstruck-bg-glow opacity-20" />
      </div>
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
                  to="/hub" 
                  className="font-hud !text-theme-accent !opacity-60 hover:!opacity-100 transition-all flex items-center gap-2 mb-4 group !text-[10px]"
                >
                  <span className="group-hover:-translate-x-1 transition-transform">←</span> SYSTEM_HUB_RETURN
                </Link>
            </div>
        </div>

        {/* COMBINED DOSSIER HEADER */}
        <div className="glass-premium p-10 grid grid-cols-1 md:grid-cols-3 gap-12 relative overflow-hidden group">

          
          {/* Left Column (Primary Details) */}
          <div className="md:col-span-1 flex flex-col justify-between gap-8 h-full">
            <div className="space-y-4">
                <h1 className="text-6xl font-black text-theme-primary tracking-tighter leading-none text-bloom">
                {mergedProject.name}
                </h1>
                <div className="flex flex-col gap-1 mono-label !opacity-40 !text-[10px]">
                <span className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-theme-muted/20 rounded-full" />
                    RANGE: {mergedProject.startDate || 'JAN 2024'} // {mergedProject.endDate || 'PRESENT'}
                </span>
                <span className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-theme-muted/20 rounded-full" />
                    THROUGHPUT: 142_COMMITS
                </span>
                </div>
            </div>

            <a 
              href={mergedProject.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group relative w-full py-4 ethereal-glass font-hud text-[10px] !text-theme-accent hover:!bg-theme-accent/20 transition-all duration-300 uppercase tracking-widest flex items-center justify-center gap-3 border-theme-accent/20"
            >
              INIT_REMOTE_ACCESS
              <span className="text-theme-accent opacity-0 group-hover:opacity-100 transition-opacity">↗</span>
            </a>
          </div>

          {/* Right Column (Abstract Narrative) */}
          <div className="md:col-span-2 flex flex-col justify-center border-t md:border-t-0 md:border-l border-theme-accent/10 pt-8 md:pt-0 md:pl-12">
            <span className="font-hud !text-theme-accent !opacity-30 mb-4 !text-[10px]">EXECUTIVE_SUMMARY</span>
            <EditableText 
              id={`projects.${project.name}.description`} 
              value={mergedProject.description || "No description provided."} 
              as="p" 
              className="text-2xl text-theme-secondary font-serif leading-relaxed italic opacity-90" 
            />
          </div>
        </div>

        {/* 2x2 DOSSIER DATA GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 min-h-0 w-full mb-8">
          
          {/* Box 1: TECH STACK (The Hardware) */}
          <div className="ethereal-glass p-8 flex flex-col gap-6 relative overflow-hidden hover:border-theme-accent/20 transition-colors group">
            <div className="flex items-center justify-between">
                <h2 className="font-hud !text-theme-accent !opacity-60 !text-[10px]">01_SYSTEM_COMPONENTS</h2>
                <div className="w-1.5 h-1.5 bg-theme-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(var(--accent-rgb),0.6)]" />
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {(mergedProject.meta?.techStack || mergedProject.topics || []).map((tech: string, i: number) => (
                <span key={i} className="px-4 py-2 ethereal-glass text-[10px] font-hud !text-theme-accent/60 !border-theme-accent/10 hover:!border-theme-accent/40 hover:!text-theme-accent transition-all duration-300">
                  <EditableText id={`projects.${project.name}.techStack.${i}`} value={tech} as="span" />
                </span>
              ))}
            </div>
          </div>

          {/* Box 2: METRICS (The Vital Signs) */}
          <div className="ethereal-glass p-8 flex flex-col gap-6 relative overflow-hidden hover:border-theme-accent/20 transition-colors">
            <h2 className="font-hud !text-theme-accent !opacity-60 !text-[10px]">02_PERFORMANCE_METRICS</h2>
            <ul className="flex flex-col gap-4 mt-2">
              {(mergedProject.meta?.metrics || []).map((m: any, i: number) => (
                <li key={i} className="flex justify-between items-center text-sm border-b border-theme-accent/10 pb-3">
                  <span className="font-hud !text-theme-muted !opacity-40 !text-[9px]">{m.title}</span>
                  <span className="font-black text-theme-accent font-hud !text-[12px] text-bloom">{m.value}</span>
                </li>
              ))}
              {(!mergedProject.meta?.metrics || mergedProject.meta.metrics.length === 0) && (
                <li className="text-[10px] text-theme-muted font-hud opacity-40 italic">NO_CUSTOM_METRICS</li>
              )}
            </ul>
          </div>

          {/* Box 3: FLAGSHIP FEATURES (The Payload) */}
          <div className="ethereal-glass p-8 flex flex-col gap-6 relative overflow-hidden hover:border-theme-accent/20 transition-colors">
            <h2 className="font-hud !text-theme-accent !opacity-60 !text-[10px]">03_CORE_FEATURES</h2>
            <ul className="flex flex-col gap-6 mt-2">
              {(mergedProject.meta?.flagshipFeatures || []).map((feat: any, i: number) => (
                <li key={i} className="flex gap-4 items-start group">
                  <span className="font-hud !text-[10px] text-theme-accent/40 bg-theme-accent/5 w-7 h-7 flex items-center justify-center rounded-full border border-theme-accent/10 transition-colors group-hover:bg-theme-accent/20 group-hover:text-theme-accent">0{i+1}</span>
                  <div className="flex flex-col gap-1">
                    <EditableText id={`projects.${project.name}.flagshipFeatures.${i}.title`} value={feat.title} as="span" className="font-hud !text-theme-primary group-hover:!text-theme-accent transition-colors !text-[12px] !tracking-wider" />
                    <EditableText id={`projects.${project.name}.flagshipFeatures.${i}.description`} value={feat.description} as="span" className="text-theme-secondary text-sm leading-relaxed opacity-80" />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Box 4: LEARNINGS & ISSUES (The Debug Log) */}
          <div className="ethereal-glass p-8 flex flex-col gap-6 relative overflow-hidden hover:border-theme-accent/20 transition-colors">
            <h2 className="font-hud !text-theme-accent !opacity-60 !text-[10px]">04_POST_MORTEM</h2>
            <ul className="flex flex-col gap-6 mt-2">
              {(mergedProject.meta?.learningsIssues || []).map((learn: any, i: number) => (
                <li key={i} className="flex gap-4 items-start group">
                  <span className="font-hud !text-[10px] text-theme-muted bg-theme-muted/5 w-7 h-7 flex items-center justify-center rounded-full border border-theme-accent/5 group-hover:bg-theme-accent/10 group-hover:text-theme-accent transition-colors">0{i+1}</span>
                  <div className="flex flex-col gap-1">
                    <EditableText id={`projects.${project.name}.learningsIssues.${i}.title`} value={learn.title} as="span" className="font-hud !text-theme-secondary !text-[12px] group-hover:!text-theme-primary transition-colors" />
                    <EditableText id={`projects.${project.name}.learningsIssues.${i}.description`} value={learn.description} as="span" className="text-theme-secondary text-sm leading-relaxed opacity-80" />
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


