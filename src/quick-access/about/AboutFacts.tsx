import type { AboutFact } from './about.types'

interface Props {
  readonly facts: AboutFact[]
}

export function AboutFacts({ facts }: Props) {
  return (
    <section aria-label="Quick facts">
      <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Quick Facts</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="
              p-4 rounded-xl
              border border-gray-200 dark:border-gray-800
              bg-white dark:bg-gray-900
            "
          >
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{fact.label}</p>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{fact.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
