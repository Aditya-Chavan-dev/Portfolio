import { createContext, useContext, type ReactNode } from 'react'
import { useTheme } from '@/common/hooks/useTheme'

interface ThemeContextValue {
  readonly theme:  'light' | 'dark'
  readonly toggle: () => void
  readonly setTheme: (t: 'light' | 'dark') => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { readonly children: ReactNode }) {
  const value = useTheme()
  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (ctx === null) {
    throw new Error('useThemeContext must be used inside <ThemeProvider>')
  }
  return ctx
}



