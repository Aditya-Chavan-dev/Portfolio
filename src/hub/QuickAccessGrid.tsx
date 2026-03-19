import { QuickAccessCard } from './QuickAccessCard'
import type { QuickAccessItem } from './hub.types'

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
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <QuickAccessCard key={item.route} {...item} />
        ))}
      </div>
    </section>
  )
}
