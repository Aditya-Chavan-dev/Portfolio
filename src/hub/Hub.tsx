import { useIsMobile }    from '@/common/shared/useIsMobile'
import { useHubContent }  from './useHubContent'
import { HubDesktop }     from './Hub.desktop'
import { HubMobile }      from './Hub.mobile'

function LoadingSpinner() {
  console.log('[Hub] Rendering LoadingSpinner');
  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center font-body" role="status" aria-live="polite" aria-busy="true">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-accent-gold/20 border-t-accent-gold rounded-full animate-spin" aria-hidden="true" />
        <span className="text-sm text-accent-gold/60 font-hud tracking-[0.4em]">LOADING SYSTEM…</span>
      </div>
    </div>
  )
}

export default function Hub() {
  const isMobile           = useIsMobile()
  const { content, loading, error } = useHubContent() as any

  console.log('[Hub] Initializing...', { isMobile, loading, hasContent: !!content });
  
  if (error) {
    console.error('[Hub] Content Loading Error:', error);
  }

  if (loading || !content) {
    return <LoadingSpinner />
  }

  console.log('[Hub] Content Loaded. Dispatching to:', isMobile ? 'Mobile' : 'Desktop');

  return isMobile
    ? <HubMobile   content={content} />
    : <HubDesktop  content={content} />
}
