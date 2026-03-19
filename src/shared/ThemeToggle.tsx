import { useThemeContext } from '@/shared/ThemeProvider'

export function ThemeToggle() {
  const { theme, toggle } = useThemeContext()

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={theme === 'dark'}
      className="
        inline-flex items-center justify-center
        w-9 h-9 rounded-md
        text-gray-600 dark:text-gray-300
        hover:bg-gray-100 dark:hover:bg-gray-800
        transition-colors duration-150
      "
    >
      <span aria-hidden="true" className="text-base leading-none">
        {theme === 'dark' ? '☀' : '☾'}
      </span>
    </button>
  )
}
