import { useIsMobile }    from '@/common/hooks/useIsMobile'
import { useHubContent }  from './useHubContent'
import { HubDesktop }     from './Hub.desktop'
import { HubMobile }      from './Hub.mobile'
import { LoadingSpinner } from '@/common/components/LoadingSpinner'

export default function Hub() {
  const isMobile           = useIsMobile()
  const { content, loading } = useHubContent()

  if (loading || !content) {
    return <LoadingSpinner fullScreen label="INITIALIZING HUB…" />
  }

  return isMobile
    ? <HubMobile   content={content} />
    : <HubDesktop  content={content} />
}
