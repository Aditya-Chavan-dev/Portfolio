import { useThemeContext } from '@/common/shared/ThemeProvider'

/**
 * Persistent floating theme toggle.
 * Rendered once in App.tsx — visible on every page, every scroll position.
 * Position: fixed bottom-right, above mobile nav bar.
 * z-index: 9999 — floats above all content including overlays.
 */
export function FloatingThemeToggle() {
  const { theme, toggle } = useThemeContext()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={theme === 'dark'}
      className="
        fixed z-[9999]
        top-4 right-4
        md:top-6 md:right-8
        w-10 h-10 rounded-full
        flex items-center justify-center
        bg-theme-secondary
        border border-theme-default
        shadow-md
        hover:scale-105
        transition-all duration-150
        text-theme-secondary
      "
    >
      <span aria-hidden="true" className="text-base leading-none select-none">
        {theme === 'dark' ? '☀' : '☾'}
      </span>
    </button>
  )
}



