import { useNavigate } from 'react-router-dom'
import { logMetric } from '@/admin/MetricsOrchestrator'
import { Folder, Diamond, Briefcase, User, Award } from 'lucide-react'

import { motion, useMotionValue, useMotionTemplate } from 'framer-motion'

interface QuickAccessCardProps {
  readonly title:       string
  readonly description: string
  readonly route:       string
  readonly icon?:        string
  readonly index:       number
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

export function QuickAccessCard({ title, description, route, icon, index }: QuickAccessCardProps) {
  const navigate = useNavigate()
  const IconComponent = icon ? iconMap[icon] : (fallbackIconMap[title] || null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(245, 158, 11, 0.1), transparent 80%)`

  const handleClick = () => {
    logMetric('click', { target: title, route })
    navigate(route)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      className="
        group relative w-full h-full p-5 text-left rounded-2xl
        glass-premium hover:border-amber-500/40
        transition-all duration-500 overflow-hidden cursor-pointer
        flex flex-col justify-between
      "
    >
      <motion.div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background }}
      />

      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center justify-between">
            {IconComponent && <IconComponent size={20} className="text-amber-500 group-hover:scale-110 transition-transform duration-500" />}
            <span className="mono-label !opacity-30 text-[8px]">RSRC_0{index + 1}</span>
        </div>
        
        <div className="space-y-1">
            <p className="font-black text-lg font-serif text-theme-primary leading-tight tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors">
            {title}
            </p>
            <p className="text-[10px] font-medium text-theme-secondary leading-relaxed">
            {description}
            </p>
        </div>
      </div>

      <div className="relative z-10 mt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-500">
         <span className="mono-label !text-amber-600 dark:!text-amber-500/60 font-black text-[8px]">ACCESS_GRANTED</span>
         <div className="w-8 h-[1px] bg-amber-500/20" />
      </div>
    </button>
  )
}
