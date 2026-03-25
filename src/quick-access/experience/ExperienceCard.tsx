import { useState } from 'react'
import type { ExperienceItem } from './experience.types'
import EditableText from '@/admin/components/EditableText'

interface Props {
  readonly item:   ExperienceItem
  readonly itemIndex: number
  readonly isLast: boolean
}

export function ExperienceCard({ item, itemIndex, isLast }: Props) {
  const [expanded, setExpanded] = useState(false)

  const hasBullets = item.bulletPoints && item.bulletPoints.length > 0

  return (
    <article className="relative pl-8 group">
      {/* Timeline line */}
      {!isLast && (
        <div
          aria-hidden="true"
          className="absolute left-[7px] top-[22px] bottom-0 w-px bg-theme-default group-hover:bg-theme-secondary transition-colors"
        />
      )}
      {/* Timeline dot */}
      <div
        aria-hidden="true"
        className={`absolute left-0 top-[6px] w-[15px] h-[15px] rounded-full border-2 border-theme-default bg-theme-primary group-hover:border-theme-secondary transition-colors ${
          expanded ? 'bg-amber-500 border-amber-500' : ''
        }`}
      />

      <div className="pb-8">
        <div 
          className="cursor-pointer select-none" 
          onClick={() => hasBullets && setExpanded(!expanded)}
          role={hasBullets ? 'button' : undefined}
          aria-expanded={hasBullets ? expanded : undefined}
        >
          <h3 className="font-semibold text-theme-primary leading-snug group-hover:text-amber-500 transition-colors flex items-center gap-2">
            <EditableText id={`experience.items.${itemIndex}.role`} value={item.role} as="span" />
            {hasBullets && (
              <span className="text-[10px] text-theme-muted font-normal tracking-wide bg-theme-secondary px-1.5 py-0.5 rounded border border-theme-default">
                {expanded ? '▲ Collapse' : '▼ Expand'}
              </span>
            )}
          </h3>
          <p className="text-sm text-theme-secondary">
            <EditableText id={`experience.items.${itemIndex}.company`} value={item.company} as="span" /> · <EditableText id={`experience.items.${itemIndex}.duration`} value={item.duration} as="span" />
          </p>
          <EditableText id={`experience.items.${itemIndex}.description`} value={item.description} as="p" className="text-sm text-theme-secondary mt-2 leading-relaxed" />
        </div>

        {/* Bullet Points Expansion */}
        {expanded && hasBullets && (
          <div className="mt-3 overflow-hidden">
            <ul className="list-disc pl-4 space-y-2 text-sm text-theme-secondary">
              {item.bulletPoints!.map((point, i) => (
                <li key={i} className="leading-relaxed">
                  <EditableText id={`experience.items.${itemIndex}.bulletPoints.${i}`} value={point} as="span" />
                </li>
              ))}
            </ul>
          </div>
        )}

        {item.tags.length > 0 && (
          <ul aria-label="Skills used" className="flex flex-wrap gap-2 mt-4">
            {item.tags.map((tag) => (
              <li key={tag}>
                <span className="text-xs px-2 py-1 rounded-md tag bg-theme-secondary border border-theme-default text-theme-secondary">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
