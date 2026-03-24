import { useEditMode } from '@/admin/EditModeContext'

interface EditableAddButtonProps {
  /** Label for the button, e.g., 'Job', 'Project', 'Skill' */
  label: string
  /** Function to execute when clicked (e.g., append placeholder onto the array list) */
  onClick: () => void
  /** Optional styling overrides */
  className?: string
}

/**
 * EditableAddButton.
 * A subtle dashed button that only appears when `mode === 'edit'`.
 * Used for adding new items to list arrays like Experience or Projects.
 */
export default function EditableAddButton({
  label,
  onClick,
  className = '',
}: EditableAddButtonProps) {
  const { mode } = useEditMode()

  if (mode !== 'edit') return null

  return (
    <button
      onClick={onClick}
      className={`
        w-full py-4 border-2 border-dashed border-amber-500/30 hover:border-amber-500/60 
        hover:bg-amber-500/5 rounded-xl text-sm font-semibold text-amber-600 dark:text-amber-400 
        transition-all duration-200 cursor-pointer flex items-center justify-center gap-2
        ${className}
      `}
    >
      <span className="text-base">＋</span>
      Add New {label}
    </button>
  )
}
