import { QuickAccessCard } from './QuickAccessCard'
import type { QuickAccessItem } from './hub.types'
import { motion, useReducedMotion } from 'framer-motion'

interface QuickAccessGridProps {
  readonly label: string
  readonly items: QuickAccessItem[]
}

export function QuickAccessGrid({ label, items }: QuickAccessGridProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section aria-label={label}>
      <p className="text-sm font-medium font-serif text-gray-500 dark:text-gray-400 mb-3">
        {label}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item.route}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
          >
            <QuickAccessCard {...item} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
