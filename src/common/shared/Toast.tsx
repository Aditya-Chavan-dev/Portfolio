import { createContext, useContext, type ReactNode } from 'react'
import { useToast, type ToastItem, type ToastType } from '@/common/hooks/useToast'

// ─── Context ─────────────────────────────────────────────────────────────────

interface ToastContextType {
  addToast: (message: string, type?: ToastType, duration?: number) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextType>({
  addToast: () => {},
  removeToast: () => {},
})

export const useToastContext = () => useContext(ToastContext)

// ─── Provider ────────────────────────────────────────────────────────────────

interface ToastProviderProps {
  readonly children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const { toasts, addToast, removeToast } = useToast()

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  )
}

// ─── Container (renders all active toasts) ───────────────────────────────────

interface ToastContainerProps {
  readonly toasts: ToastItem[]
  readonly onDismiss: (id: string) => void
}

function ToastContainer({ toasts, onDismiss }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div
      className="fixed bottom-4 right-4 md:right-6 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map(toast => (
        <ToastNotification key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  )
}

// ─── Individual Toast ────────────────────────────────────────────────────────

const typeStyles: Record<ToastType, string> = {
  success: 'bg-emerald-600 text-white',
  error:   'bg-red-600 text-white',
  info:    'bg-blue-600 text-white',
  warning: 'bg-amber-500 text-black',
}

const typeIcons: Record<ToastType, string> = {
  success: '✓',
  error:   '✕',
  info:    'ℹ',
  warning: '⚠',
}

interface ToastNotificationProps {
  readonly toast: ToastItem
  readonly onDismiss: (id: string) => void
}

function ToastNotification({ toast, onDismiss }: ToastNotificationProps) {
  return (
    <div
      role="alert"
      className={`
        pointer-events-auto px-4 py-3 rounded-lg shadow-lg
        flex items-start gap-2 text-sm font-medium
        animate-[slideIn_0.25s_ease-out]
        ${typeStyles[toast.type]}
      `}
    >
      <span className="text-base leading-none mt-px shrink-0" aria-hidden="true">
        {typeIcons[toast.type]}
      </span>
      <span className="flex-1 leading-snug">{toast.message}</span>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="ml-2 opacity-70 hover:opacity-100 transition-opacity text-current shrink-0 cursor-pointer"
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  )
}



