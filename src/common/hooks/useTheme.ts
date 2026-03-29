import { useState, useEffect } from 'react'

type Theme = 'light' | 'dark'
const STORAGE_KEY = 'theme' as const

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Initial read during state setup (Client-side only)
    if (typeof window === 'undefined') return 'dark' // default for SSR 
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark'
    return 'light'
  })

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



