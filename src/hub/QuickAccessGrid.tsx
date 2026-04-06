import { QuickAccessCard } from './QuickAccessCard'
import type { QuickAccessItem } from './hub.types'
import { motion, useReducedMotion } from 'framer-motion'

export function QuickAccessGrid({ items }: { items: QuickAccessItem[] }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6 w-full">
      {items.map((item, index) => (
        <motion.div
          key={item.route}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full w-full"
        >
          <QuickAccessCard 
            title={item.title}
            label={item.label}
            icon={item.icon}
            onClick={item.onClick || (() => {})} 
            className="w-full h-full"
          />
        </motion.div>
      ))}
    </div>
  )
}
