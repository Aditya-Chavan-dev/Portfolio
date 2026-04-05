import { useIsMobile }    from '@/common/shared/useIsMobile'
import { useHubContent }  from './useHubContent'
import { HubDesktop }     from './Hub.desktop'
import { HubMobile }      from './Hub.mobile'

function LoadingSpinner() {
  console.log('[Hub] Rendering LoadingSpinner');
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center" role="status" aria-live="polite" aria-busy="true">
      <div className="flex flex-col items-center gap-3">
        <div className="w-6 h-6 border-2 border-accent/20 border-t-accent rounded-full animate-spin" aria-hidden="true" />
        <span className="text-sm text-accent/60 font-hud tracking-widest text-[#F8FAFC]">LOADING SYSTEM…</span>
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
