import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface QuickAccessCardProps {
  icon: string
  label: string
  sublabel: string
  path: string
  delay: number
}

export const QuickAccessCard = ({ icon, label, sublabel, path, delay }: QuickAccessCardProps) => {
  const navigate = useNavigate()
  // @ts-ignore
  const Icon = LucideIcons[icon] || LucideIcons.HelpCircle

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        backgroundColor: 'rgba(22, 22, 22, 1)',
        scale: 1.01,
        transition: { duration: 0.2 }
      }}
      onClick={() => navigate(path)}
      className="group relative flex flex-col items-center justify-center h-full w-full bg-bg-card cursor-pointer border border-border-dim hover:border-border-hover overflow-hidden"
    >
      {/* GLOW EFFECT */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-accent/20 group-hover:bg-accent/40 transition-colors" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
           style={{ boxShadow: 'inset 0 0 40px rgba(201, 169, 110, 0.08)' }} />

      <motion.div
        whileHover={{ color: '#C9A96E', scale: 1.1 }}
        className="text-text-muted mb-4 transition-colors"
      >
        <Icon size={28} />
      </motion.div>

      <h3 className="font-body text-lg font-medium text-text-primary mb-1">
        {label}
      </h3>
      
      <p className="font-body text-[11px] uppercase tracking-[0.14em] text-text-faint">
        {sublabel}
      </p>
    </motion.div>
  )
}
