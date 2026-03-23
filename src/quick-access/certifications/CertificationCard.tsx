import type { CertificationItem } from './certifications.types'

interface Props {
  readonly item: CertificationItem
  readonly onClick: () => void
}

export function CertificationCard({ item, onClick }: Props) {
  return (
    <article 
      className="bg-white dark:bg-[#131315] rounded-xl p-5 border border-black/[0.03] dark:border-white/[0.03] shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between h-full"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <div>
        <h3 className="font-semibold text-theme-primary leading-snug group-hover:text-amber-500 transition-colors">
          {item.name}
        </h3>
        <p className="text-xs text-theme-muted mt-1">
          {item.issuer}
        </p>
        <p className="text-xs text-theme-secondary mt-1">
          {item.date}
        </p>
      </div>

      {item.tags.length > 0 && (
        <ul aria-label="Skills learned" className="flex flex-wrap gap-1.5 mt-4">
          {item.tags.map((tag) => (
            <li key={tag}>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-theme-secondary text-theme-secondary border border-theme-default">
                {tag}
              </span>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}
