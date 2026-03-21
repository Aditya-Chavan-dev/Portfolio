import { useIsMobile }    from '@/shared/useIsMobile'
import { useHubContent }  from './useHubContent'
import { HubDesktop }     from './Hub.desktop'
import { HubMobile }      from './Hub.mobile'

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-theme-primary flex items-center justify-center" role="status" aria-live="polite" aria-busy="true">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-400 rounded-full animate-spin" aria-hidden="true" />
        <span className="text-sm text-gray-400 dark:text-gray-600">Loading…</span>
      </div>
    </div>
  )
}

export default function Hub() {
  const isMobile           = useIsMobile()
  const { content, loading } = useHubContent()

  if (loading || !content) {
    return <LoadingSpinner />
  }

  return isMobile
    ? <HubMobile   content={content} />
    : <HubDesktop  content={content} />
}
