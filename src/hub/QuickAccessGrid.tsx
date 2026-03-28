import { QuickAccessCard } from './QuickAccessCard'
import type { QuickAccessItem } from './hub.types'
import { motion, useReducedMotion } from 'framer-motion'

export function QuickAccessGrid({ items }: { items: QuickAccessItem[] }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1">
      {items.map((item, index) => (
        <motion.div
          key={item.route}
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.2 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-full"
        >
          <QuickAccessCard {...item} index={index} />
        </motion.div>
      ))}
    </div>
  )
}
