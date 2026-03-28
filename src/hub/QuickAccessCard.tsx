import { useNavigate } from 'react-router-dom'
import { logMetric } from '@/admin/MetricsOrchestrator'
import { Folder, Diamond, Briefcase, User, Award } from 'lucide-react'

interface QuickAccessCardProps {
  readonly title:       string
  readonly description: string
  readonly route:       string
  readonly icon?:        string
}

const iconMap: Record<string, any> = {
  Folder,
  Diamond,
  Briefcase,
  User,
  Award
}

const fallbackIconMap: Record<string, any> = {
  Projects: Folder,
  Skills: Diamond,
  Experience: Briefcase,
  About: User,
  Certifications: Award
}

export function QuickAccessCard({ title, description, route, icon }: QuickAccessCardProps) {
  const navigate = useNavigate()
  const IconComponent = icon ? iconMap[icon] : (fallbackIconMap[title] || null)

  const handleClick = () => {
    logMetric('click', { target: title, route })
    navigate(route)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="
        w-full p-4 text-left rounded-xl
        bg-theme-secondary dark:bg-[#090909] border border-theme-default hover:border-theme-hover
        transition-all duration-300 premium-hover cursor-pointer
      "
    >
      {IconComponent && <IconComponent size={18} className="text-theme-primary dark:text-white mb-2.5" />}
      <p className="font-bold text-base font-serif text-theme-primary dark:text-white leading-snug tracking-tight">
        {title}
      </p>
      <p className="text-xs font-medium text-theme-secondary dark:text-gray-400 mt-1 leading-relaxed">
        {description}
      </p>
    </button>
  )
}
