import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ThemeToggle } from '@/common/shared/ThemeToggle'
import { ChevronLeft, Terminal, Activity } from 'lucide-react'

const SECTIONS = [
  { label: 'Projects',       route: '/projects'   },
  { label: 'Skills',         route: '/skills'     },
  { label: 'Experience',     route: '/experience' },
  { label: 'Certifications', route: '/certifications' },
] as const

export function SectionNav() {
  const navigate   = useNavigate()
  const { pathname } = useLocation()
  const currentSection = SECTIONS.find(s => s.route === pathname)?.label || 'SYSTEM'

  const goToHub = () => navigate('/hub')

  return (
    <>
      {/* ── Desktop: OS Top Bar ─────────────────────────────────── */}
      <div className="hidden md:block sticky top-0 z-50 w-full p-4 pointer-events-none">
        <nav
          aria-label="Section navigation"
          className="
            max-w-7xl mx-auto flex items-center justify-between pointer-events-auto
            h-16 px-6 glass-premium rounded-2xl
            border border-theme-default/20 shadow-2xl backdrop-blur-2xl
          "
        >
          {/* Left: HUB_EXIT / Status */}
          <div className="flex items-center gap-6">
            <button
              onClick={goToHub}
              className="flex items-center gap-3 px-4 py-2 rounded-xl bg-theme-base/10 border border-theme-default/20 hover:border-amber-500/40 hover:bg-amber-500/5 transition-all group group/hub"
            >
              <div className="w-6 h-6 rounded-lg bg-theme-base/20 flex items-center justify-center group-hover/hub:bg-amber-500/10 transition-colors">
                <ChevronLeft size={16} className="text-theme-secondary group-hover/hub:text-amber-500 transition-colors" />
              </div>
              <div className="flex flex-col text-left">
                <span className="mono-label !text-[7px] !opacity-30 leading-none mb-0.5">ESTR_HUB_CORE</span>
                <span className="text-[10px] font-black tracking-widest text-theme-primary uppercase">RETURN</span>
              </div>
            </button>

            <div className="h-8 w-[1px] bg-theme-default/10" />

            <div className="flex items-center gap-2 opacity-40">
               <Terminal size={12} className="text-amber-500" />
               <span className="mono-label !text-[8px] uppercase tracking-tighter">OS_SUITE / {currentSection}</span>
            </div>
          </div>

          {/* Center: Floating Links */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center bg-theme-base/10 border border-theme-default/20 p-1 rounded-xl shadow-inner">
            {SECTIONS.map(({ label, route }) => {
              const isActive = pathname === route
              return (
                <button
                  key={route}
                  onClick={() => navigate(route)}
                  className={`
                    relative px-5 py-2 rounded-lg text-[10px] font-mono uppercase tracking-[0.1em] transition-all duration-500
                    ${isActive
                      ? 'text-theme-primary opacity-100'
                      : 'text-theme-secondary opacity-40 hover:opacity-100 hover:text-amber-500'
                    }
                  `}
                >
                  <span className="relative z-10">{label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="navTab"
                      className="absolute inset-0 bg-theme-base/20 rounded-lg shadow-[inset_0_0_10px_rgba(245,158,11,0.05)] border border-amber-500/20"
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right: Meta / Theme */}
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-emerald-500/5 border border-emerald-500/10 h-8">
               <Activity size={10} className="text-emerald-500 animate-pulse" />
               <span className="mono-label !text-emerald-500/80 !text-[8px]">LOCAL_ACTIVE</span>
            </div>
            
            <ThemeToggle />
          </div>
        </nav>
      </div>

      {/* ── Mobile: fixed bottom bar ─────────────────────────────── */}
      <nav
        aria-label="Section navigation"
        className="
          md:hidden fixed bottom-0 left-0 right-0 z-50
          flex items-center justify-around
          py-4 px-2
          glass-premium !rounded-none
          backdrop-blur-xl
          border-t border-theme-default
        "
      >
        <button
          type="button"
          onClick={goToHub}
          aria-label="Back to Hub"
          className="flex flex-col items-center gap-1.5 transition-all group"
        >
          <span aria-hidden="true" className="mono-label !opacity-40 group-hover:!opacity-100 group-hover:text-amber-600 dark:group-hover:text-amber-500">←</span>
          <span className="mono-label !text-[8px] !opacity-20 uppercase">HUB</span>
        </button>

        {SECTIONS.map(({ label, route }) => {
          const isActive = pathname === route
          return (
            <button
              key={route}
              type="button"
              onClick={() => navigate(route)}
              aria-current={isActive ? 'page' : undefined}
              className={`
                flex flex-col items-center gap-1.5 min-w-[60px] py-1 transition-all
                  ${isActive
                    ? 'text-theme-primary'
                    : 'text-theme-secondary/40'
                  }
              `}
            >
              <motion.span
                aria-hidden="true"
                className={`w-1 h-1 rounded-full transition-shadow duration-500 ${
                  isActive ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-transparent'
                }`}
              />
              <span className={`mono-label !text-[9px] uppercase tracking-wider ${isActive ? '!opacity-100' : '!opacity-40'}`}>
                {label.substring(0, 4)}
              </span>
            </button>
          )
        })}

        <div className="scale-75">
            <ThemeToggle />
        </div>
      </nav>
    </>
  )
}



