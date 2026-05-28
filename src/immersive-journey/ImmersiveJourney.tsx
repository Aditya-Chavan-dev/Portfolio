import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useFeaturedProjects } from '@/common/hooks/useFeaturedProjects'
import { useRef } from 'react'
import { ChevronLeft } from 'lucide-react'

export default function ImmersiveJourney() {
  const { projects, loading } = useFeaturedProjects()
  const navigate = useNavigate()
  const containerRef = useRef<HTMLDivElement>(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  // Parallax layers
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const starsY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])

  if (loading) {
    return (
      <div className="h-screen bg-theme-base flex items-center justify-center">
        <div className="font-hud text-theme-accent animate-pulse">INIT_SYSTEM_SCAN...</div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative min-h-[300vh] bg-theme-base selection:bg-theme-accent/30 overflow-x-hidden">
      {/* ── Fixed Perspective Layer ────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div style={{ y: gridY }} className="absolute inset-0 bg-system-grid opacity-[0.05]" />
        <motion.div style={{ y: starsY }} className="absolute inset-0">
           <div className="absolute top-[10%] left-[20%] w-[60%] h-[60%] starstruck-bg-glow opacity-30" />
           <div className="absolute bottom-[20%] right-[30%] w-[50%] h-[50%] starstruck-bg-glow opacity-20" />
        </motion.div>
      </div>

      {/* ── UI Overlay ────────────────────────────────────────── */}
      <div className="fixed top-8 left-8 z-50">
        <button 
          onClick={() => navigate('/hub')}
          className="flex items-center gap-3 font-hud text-[10px] text-theme-accent/60 hover:text-theme-accent transition-all group"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          TERMINAL_RETURN
        </button>
      </div>

      <div className="fixed top-8 right-8 z-50 text-right">
        <div className="font-hud text-[10px] text-theme-accent">SYSTEM_STATUS: ACTIVE</div>
        <div className="font-hud text-[9px] text-theme-muted mt-1 uppercase tracking-widest leading-none">Scanning Immersive_Nodes</div>
      </div>

      {/* ── Scrolling Content ──────────────────────────────────── */}
      <div className="relative z-10 pt-[20vh] pb-[40vh] max-w-4xl mx-auto px-8">
        <div className="mb-32 space-y-4">
           <h1 className="text-6xl font-black text-theme-primary tracking-tighter text-bloom italic">GENESIS_JOURNEY</h1>
           <p className="font-hud text-theme-accent/60 text-[11px] max-w-md">Trace the architectural evolution of the core system modules. Each node represents a validated tactical deployment.</p>
        </div>

        <div className="space-y-[40vh]">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <button
                onClick={() => navigate(`/hub/projects?select=${project.name}`)}
                className="group relative text-left"
              >
                {/* Node Line Connector (Aesthetic) */}
                <div className={`absolute top-1/2 -z-10 h-px w-32 bg-gradient-to-r from-theme-accent/40 to-transparent ${index % 2 === 0 ? 'left-full ml-4' : 'right-full mr-4 rotate-180'}`} />
                
                <div className="ethereal-glass p-8 w-[320px] relative overflow-hidden group-hover:border-theme-accent/40 group-hover:shadow-[0_0_30px_rgba(var(--accent-rgb),0.1)] transition-all duration-500">
                  <div className="absolute top-0 right-0 p-3">
                     <div className="w-1.5 h-1.5 bg-theme-accent rounded-full animate-pulse" />
                  </div>
                  
                  <div className="font-hud text-[9px] text-theme-accent/40 mb-2">NODE_0{index + 1}</div>
                  <h3 className="text-2xl font-black text-theme-primary tracking-tight mb-4 group-hover:text-bloom transition-all">{project.name}</h3>
                  <p className="text-theme-secondary text-sm line-clamp-2 italic mb-6 opacity-70">{project.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-theme-accent/10">
                    <span className="font-hud text-[10px] text-theme-accent">INTEL_ACCESS</span>
                    <span className="group-hover:translate-x-1 transition-transform text-theme-accent">→</span>
                  </div>
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        {/* ── Final Footer ────────────────────────────────────────── */}
        <div className="mt-[40vh] text-center">
           <div className="w-px h-32 bg-gradient-to-b from-theme-accent/40 to-transparent mx-auto mb-12" />
           <button 
             onClick={() => navigate('/hub')}
             className="font-hud text-[11px] text-theme-accent hover:text-bloom transition-all"
           >
              TERMINATE_JOURNEY_AND_RETURN
           </button>
        </div>
      </div>
    </div>
  )
}
