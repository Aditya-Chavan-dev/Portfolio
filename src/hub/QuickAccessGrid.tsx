import { QuickAccessCard } from './QuickAccessCard'
import type { QuickAccessItem } from './hub.types'
import { motion } from 'framer-motion'

interface QuickAccessGridProps {
  readonly label: string
  readonly items: QuickAccessItem[]
}

export function QuickAccessGrid({ label, items }: QuickAccessGridProps) {
  return (
    <section aria-label={label}>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-4">
        {items.map((item, index) => (
          <motion.div
            key={item.route}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1, ease: "easeOut" }}
          >
            <QuickAccessCard {...item} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
