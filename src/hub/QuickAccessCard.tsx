import { useNavigate } from 'react-router-dom'

interface QuickAccessCardProps {
  readonly title:       string
  readonly description: string
  readonly route:       string
}

export function QuickAccessCard({ title, description, route }: QuickAccessCardProps) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() => navigate(route)}
      className="
        w-full p-5 text-left rounded-xl
        border border-gray-200 dark:border-gray-800
        bg-white dark:bg-gray-900
        hover:border-gray-400 dark:hover:border-gray-600
        hover:shadow-sm
        transition-all duration-150
        focus-visible:ring-2 focus-visible:ring-gray-400
      "
    >
      <p className="font-semibold text-gray-900 dark:text-gray-100 leading-snug">
        {title}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 leading-snug">
        {description}
      </p>
    </button>
  )
}
