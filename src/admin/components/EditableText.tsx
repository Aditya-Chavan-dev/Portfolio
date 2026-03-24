import { useRef, useEffect } from 'react'
import { useEditMode } from '@/admin/EditModeContext'

interface EditableTextProps {
  /** Unique ID for the text field (e.g., 'hub.ownerName') */
  id: string
  /** The fallback or current value from the live database */
  value: string
  /** HTML Element to render as (default: span) */
  as?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div'
  /** Tailwind classes */
  className?: string
  /** Whether to allow multi-line breaks (Enter key) */
  multiLine?: boolean
}

/**
 * EditableText wrapper.
 * Renders as contenteditable when `mode === 'edit'`.
 * Serves live view or preview view transparently using Draft state.
 */
export default function EditableText({
  id,
  value,
  as: Component = 'span',
  className = '',
  multiLine = false,
}: EditableTextProps) {
  const { mode, updateDraft, draftData } = useEditMode()
  const elementRef = useRef<HTMLElement>(null)

  const isEditing = mode === 'edit'
  const isPreview = mode === 'preview'

  // Determine current display value: Draft wins over Live fallback
  const displayValue = draftData[id] !== undefined ? draftData[id] : value

  // Update DOM content to match displayValue when not editing directly
  useEffect(() => {
    if (elementRef.current && document.activeElement !== elementRef.current) {
      elementRef.current.innerText = displayValue
    }
  }, [displayValue])

  function handleInput(e: React.FormEvent<HTMLElement>) {
    const text = e.currentTarget.innerText
    updateDraft(id, text)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLElement>) {
    if (!multiLine && e.key === 'Enter') {
      e.preventDefault()
      elementRef.current?.blur()
    }
  }

  return (
    <Component
      ref={elementRef as any}
      contentEditable={isEditing}
      suppressContentEditableWarning={true}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      onClick={(e) => isEditing && e.stopPropagation()}
      className={`
        ${className} 
        ${isEditing ? 'select-text cursor-text outline-none focus:ring-2 focus:ring-amber-500/50 rounded-sm' : ''} 
        ${isEditing ? 'border border-dashed border-amber-500/40 hover:border-amber-500/80 px-1 -mx-1' : ''} 
        ${isPreview ? 'transition-all duration-300' : ''}
      `}
      style={isEditing ? { minHeight: '1em', minWidth: '1ch', display: 'inline-block' } : undefined}
    />
  )
}
