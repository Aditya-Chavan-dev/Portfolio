import type { AboutFact } from './about.types'

interface Props {
  readonly facts: AboutFact[]
}

export function AboutFacts({ facts }: Props) {
  return (
    <section aria-label="Quick facts">
      <h2 className="text-sm font-medium text-theme-secondary mb-4">Quick Facts</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="
              p-4 rounded-xl
              border border-theme-default
              bg-theme-secondary
            "
          >
            <p className="text-xs text-theme-secondary mb-1">{fact.label}</p>
            <p className="text-sm font-semibold text-theme-primary">{fact.value}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
