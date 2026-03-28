import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'theme' as const

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light')

  // Read persisted / system preference — client only
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') {
      setTheme(stored)
      return
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setTheme('dark')
    }
  }, [])

  // Apply attribute + persist
  useEffect(() => {
    const root = document.documentElement
    root.setAttribute('data-theme', theme)
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  return { 
    theme, 
    toggle, 
    setTheme: (t: Theme) => setTheme(t) 
  } as const
}



