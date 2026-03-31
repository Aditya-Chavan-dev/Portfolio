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

  const background = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(var(--hover-glow-rgb), 0.15), transparent 80%)`

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
        group relative w-full h-full p-8 text-left rounded-2xl
        ethereal-glass overflow-hidden cursor-pointer
        flex flex-col justify-between
      "
    >
      <motion.div 
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        style={{ background, willChange: "background" }}
      />

      <div className="relative z-10 flex flex-col gap-4">
        <div className="flex items-center justify-between">
            {IconComponent && <IconComponent size={24} className="text-theme-accent group-hover:scale-110 transition-transform duration-500 text-bloom" />}
            <span className="font-hud !opacity-40 text-[9px]">RSRC_0{index + 1}</span>
        </div>
        
        <div className="space-y-2">
            <p className="text-2xl font-black text-theme-primary tracking-tighter leading-none group-hover:text-theme-accent transition-colors duration-500">
            {title}
            </p>
            <p className="text-[11px] font-medium text-theme-secondary/60 leading-relaxed max-w-[90%]">
            {description}
            </p>
        </div>
      </div>

      <div className="relative z-10 mt-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-700">
         <span className="font-hud !text-theme-accent text-[9px] text-bloom">ACCESS_GRANTED</span>
         <div className="w-10 h-[1px] bg-theme-accent/20" />
      </div>
    </button>
  )
}
