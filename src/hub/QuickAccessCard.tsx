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
        w-full p-6 text-left rounded-2xl
        glass-card premium-hover cursor-pointer
      "
    >
      <p className="font-bold text-lg text-theme-primary leading-snug tracking-tight">
        {title}
      </p>
      <p className="text-sm font-medium text-theme-secondary mt-1.5 leading-relaxed">
        {description}
      </p>
    </button>
  )
}
