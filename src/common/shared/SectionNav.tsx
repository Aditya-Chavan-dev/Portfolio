import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ThemeToggle } from '@/common/shared/ThemeToggle'

const SECTIONS = [
  { label: 'Projects',       route: '/projects'   },
  { label: 'Skills',         route: '/skills'     },
  { label: 'Experience',     route: '/experience' },
  { label: 'Certifications', route: '/certifications' },
] as const

export function SectionNav() {
  const navigate   = useNavigate()
  const { pathname } = useLocation()

  const goToHub = () => navigate('/hub')

  return (
    <>
      {/* ── Desktop: sticky top ─────────────────────────────────── */}
      <nav
        aria-label="Section navigation"
        className="
          hidden md:flex sticky top-0 z-50
          items-center justify-between
          px-12 py-5
          glass-premium !bg-white/5 !rounded-none
          backdrop-blur-xl
          border-b border-white/5
        "
      >
        <button
          type="button"
          onClick={goToHub}
          aria-label="Back to Hub"
          className="mono-label !opacity-40 hover:!opacity-100 hover:text-amber-500 transition-all flex items-center gap-2 group"
        >
          <span className="group-hover:-translate-x-1 transition-transform">←</span> SYSTEM_HUB
        </button>

        <div role="list" className="flex items-center gap-10">
          {SECTIONS.map(({ label, route }) => {
            const isActive = pathname === route
            return (
              <button
                key={route}
                type="button"
                role="listitem"
                onClick={() => navigate(route)}
                aria-current={isActive ? 'page' : undefined}
                className={`
                  relative pb-1 text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-300
                  ${isActive
                    ? 'text-white opacity-100'
                    : 'text-white/30 hover:text-amber-500/80'
                  }
                `}
              >
                {label}
                {isActive && (
                  <motion.span
                    layoutId="activeTab"
                    aria-hidden="true"
                    className="
                      absolute -bottom-2 left-0 right-0
                      h-[1px] bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]
                    "
                  />
                )}
              </button>
            )
          })}
        </div>

        <div className="scale-75 origin-right">
            <ThemeToggle />
        </div>
      </nav>

      {/* ── Mobile: fixed bottom bar ─────────────────────────────── */}
      <nav
        aria-label="Section navigation"
        className="
          md:hidden fixed bottom-0 left-0 right-0 z-50
          flex items-center justify-around
          py-4 px-2
          glass-premium !bg-white/5 !rounded-none
          backdrop-blur-xl
          border-t border-white/5
        "
      >
        <button
          type="button"
          onClick={goToHub}
          aria-label="Back to Hub"
          className="flex flex-col items-center gap-1.5 transition-all group"
        >
          <span aria-hidden="true" className="mono-label !opacity-40 group-hover:!opacity-100 group-hover:text-amber-500">←</span>
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
                    ? 'text-white'
                    : 'text-white/20'
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



