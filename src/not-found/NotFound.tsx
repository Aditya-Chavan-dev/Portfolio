import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getNotFoundContent } from '@/shared/firestore.service'

const FALLBACK = { heading: '404', body: 'Page not found.', backLabel: 'Back to Hub' } as const

export default function NotFound() {
  const navigate = useNavigate()
  const [content, setContent] = useState<{ heading: string; body: string; backLabel: string }>(FALLBACK)

  useEffect(() => {
    let cancelled = false
    let didSet = false

    getNotFoundContent()
      .then((data) => {
        if (!cancelled && data) {
          didSet = true
          setContent(data)
        }
      })
      .catch(() => { /* use fallback */ })
      .finally(() => {
        if (!cancelled && !didSet) {
          setContent(FALLBACK)
        }
      })

    return () => { cancelled = true }
  }, [])

  return (
    <div className="min-h-screen bg-theme-primary flex items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-2">{content.heading}</h1>
        <p className="text-theme-secondary mb-8">{content.body}</p>
        <button
          type="button"
          onClick={() => navigate('/hub')}
          className="
            text-sm
            text-theme-secondary
            hover:text-theme-secondary
            transition-colors duration-150
          "
        >
          {content.backLabel}
        </button>
      </div>
    </div>
  )
}
