import { useState } from 'react'
import { useIsMobile }          from '@/shared/useIsMobile'
import { useProjectsContent }   from './useProjectsContent'
import { useGitHubRepos }       from './useGitHubRepos'
import { ProjectDetailOverlay } from './ProjectDetailOverlay'
import { ProjectsDesktop }      from './Projects.desktop'
import { ProjectsMobile }       from './Projects.mobile'
import type { ProjectItem }     from './projects.types'

export default function Projects() {
  const isMobile                             = useIsMobile()
  const { content, loading: contentLoading } = useProjectsContent()
  const { repos,   loading: reposLoading   } = useGitHubRepos()
  const [selected, setSelected             ] = useState<ProjectItem | null>(null)

  if (contentLoading || !content) {
    return (
      <div className="min-h-screen bg-theme-primary flex items-center justify-center" role="status" aria-live="polite">
        <span className="sr-only">Loading projects…</span>
        <div className="w-6 h-6 border-2 border-theme-default border-t-theme-primary rounded-full animate-spin" aria-hidden="true" />
      </div>
    )
  }

  const layoutProps = {
    content,
    repos,
    reposLoading,
    onSelectProject: setSelected,
  }

  return (
    <>
      {isMobile
        ? <ProjectsMobile  {...layoutProps} />
        : <ProjectsDesktop {...layoutProps} />
      }
      {selected !== null && (
        <ProjectDetailOverlay
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  )
}
