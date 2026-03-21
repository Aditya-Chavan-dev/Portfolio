import { useEffect, useRef, useCallback } from 'react'
import type { ProjectItem } from './projects.types'

interface Props {
  readonly project: ProjectItem
  readonly onClose: () => void
}

export function ProjectDetailOverlay({ project, onClose }: Props) {
  const overlayRef     = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previousFocusRef = useRef<HTMLElement | null>(null)
  const originalOverflowRef = useRef('')

  // Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Body scroll lock — save and restore original overflow
  useEffect(() => {
    originalOverflowRef.current = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = originalOverflowRef.current }
  }, [])

  // Focus management — move focus into dialog, restore on close
  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null
    closeButtonRef.current?.focus()
    return () => { previousFocusRef.current?.focus() }
  }, [])

  // Simple focus trap
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab' || !overlayRef.current) return

    const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    if (focusable.length === 0) return

    const first = focusable[0]
    const last  = focusable[focusable.length - 1]

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last.focus()
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first.focus()
    }
  }, [])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.name}
      ref={overlayRef}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />

      <div className="
        relative z-10
        bg-theme-secondary
        rounded-2xl shadow-2xl
        w-full max-w-2xl max-h-[90vh]
        overflow-y-auto
        p-8
      ">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-theme-primary pr-8 leading-tight">
            {project.name}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              shrink-0 w-8 h-8 flex items-center justify-center
              text-theme-muted hover:text-theme-primary
              rounded-lg hover:bg-theme-default
              transition-colors duration-150 text-xl leading-none
            "
          >
            ×
          </button>
        </div>

        <p className="text-theme-secondary leading-relaxed mb-6">
          {project.description}
        </p>

        {project.problem && (
          <div className="mb-5">
            <p className="text-sm font-semibold text-theme-primary mb-1">Problem</p>
            <p className="text-sm text-theme-secondary leading-relaxed">{project.problem}</p>
          </div>
        )}
        {project.approach && (
          <div className="mb-5">
            <p className="text-sm font-semibold text-theme-primary mb-1">Approach</p>
            <p className="text-sm text-theme-secondary leading-relaxed">{project.approach}</p>
          </div>
        )}
        {project.outcome && (
          <div className="mb-5">
            <p className="text-sm font-semibold text-theme-primary mb-1">Outcome</p>
            <p className="text-sm text-theme-secondary leading-relaxed">{project.outcome}</p>
          </div>
        )}

        {project.tags.length > 0 && (
          <ul aria-label="Tech tags" className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <li key={tag}>
                <span className="text-xs px-2 py-1 rounded-md tag">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-sm px-4 py-2 rounded-lg
                border border-theme-default
                text-theme-secondary
                hover:bg-theme-secondary
                transition-colors duration-150
              "
            >
              GitHub →
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                text-sm px-4 py-2 rounded-lg
                bg-gray-900 dark:bg-gray-100
                text-white dark:text-gray-900
                hover:opacity-90 transition-opacity duration-150
              "
            >
              Live Demo →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
