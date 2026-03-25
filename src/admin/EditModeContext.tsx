import { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { SESSION_KEYS, ADMIN_ROUTES } from '@/shared/constants'

type EditMode = 'idle' | 'edit' | 'preview'

interface EditModeContextType {
  mode: EditMode
  setMode: (mode: EditMode) => void
  hasUnsavedChanges: boolean
  setHasUnsavedChanges: (val: boolean) => void
  exitEditSession: () => void
  draftData: Record<string, any>
  updateDraft: (id: string, value: any) => void
  clearDraft: () => void
}

const EditModeContext = createContext<EditModeContextType>({
  mode: 'idle',
  setMode: () => {},
  hasUnsavedChanges: false,
  setHasUnsavedChanges: () => {},
  exitEditSession: () => {},
  draftData: {},
  updateDraft: () => {},
  clearDraft: () => {},
})

export const useEditMode = () => useContext(EditModeContext)

interface Props {
  readonly children: ReactNode
}

export function EditModeProvider({ children }: Props) {
  const [mode, setMode] = useState<EditMode>('idle')
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [draftData, setDraftData] = useState<Record<string, any>>({})

  const updateDraft = useCallback((id: string, value: any) => {
    setDraftData((prev) => ({ ...prev, [id]: value }))
    setHasUnsavedChanges(true)
  }, [])

  const clearDraft = useCallback(() => {
    setDraftData({})
    setHasUnsavedChanges(false)
  }, [])

  const exitEditSession = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEYS.ADMIN_EDIT_SESSION)
    setMode('idle')
    clearDraft()
    window.location.href = ADMIN_ROUTES.PANEL // Force reload to clear any local draft states
  }, [clearDraft])

  return (
    <EditModeContext.Provider
      value={{
        mode,
        setMode,
        hasUnsavedChanges,
        setHasUnsavedChanges,
        exitEditSession,
        draftData,
        updateDraft,
        clearDraft,
      }}
    >
      {children}
    </EditModeContext.Provider>
  )
}
