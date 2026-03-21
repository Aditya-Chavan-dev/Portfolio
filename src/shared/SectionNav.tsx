import { useNavigate, useLocation } from 'react-router-dom'
import { ThemeToggle } from '@/shared/ThemeToggle'

const SECTIONS = [
  { label: 'Projects',   route: '/projects'   },
  { label: 'Skills',     route: '/skills'     },
  { label: 'Experience', route: '/experience' },
  { label: 'About',      route: '/about'      },
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
          px-8 py-4
          bg-theme-nav
          backdrop-blur-sm
          border-b border-theme-muted
        "
      >
        <button
          type="button"
          onClick={goToHub}
          aria-label="Back to Hub"
          className="
            text-sm text-theme-secondary
            hover:text-theme-primary
            transition-colors duration-150
          "
        >
          ← Hub
        </button>

        <div role="list" className="flex items-center gap-6">
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
                  relative pb-1 text-sm transition-colors duration-150
                  ${isActive
                    ? 'text-theme-primary font-medium'
                    : 'text-theme-secondary hover:text-theme-primary'
                  }
                `}
              >
                {label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="
                      absolute bottom-0 left-1/2 -translate-x-1/2
                      w-1 h-1 rounded-full
                      bg-theme-primary
                    "
                  />
                )}
              </button>
            )
          })}
        </div>

        <ThemeToggle />
      </nav>

      {/* ── Mobile: fixed bottom bar ─────────────────────────────── */}
      <nav
        aria-label="Section navigation"
        className="
          md:hidden fixed bottom-0 left-0 right-0 z-50
          flex items-center justify-around
          py-3 px-2
          bg-theme-nav
          backdrop-blur-sm
          border-t border-theme-muted
        "
      >
        <button
          type="button"
          onClick={goToHub}
          aria-label="Back to Hub"
          className="flex flex-col items-center gap-0.5 text-xs text-theme-secondary min-w-[44px] py-1"
        >
          <span aria-hidden="true" className="text-base leading-none">←</span>
          <span>Hub</span>
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
                flex flex-col items-center gap-0.5 text-xs
                min-w-[44px] py-1
                transition-colors duration-150
                  ${isActive
                    ? 'text-theme-primary font-medium'
                    : 'text-theme-secondary'
                  }
              `}
            >
              <span
                aria-hidden="true"
                className={`w-1 h-1 rounded-full ${
                  isActive ? 'bg-theme-primary' : 'bg-transparent'
                }`}
              />
              {label}
            </button>
          )
        })}

        <ThemeToggle />
      </nav>
    </>
  )
}
