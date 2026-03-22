import type { Project } from '@/types/project'

export const projectMetadata: Record<string, Partial<Project>> = {
  'Portfolio': {
    startDate: 'Jan 2024',
    endDate: 'Mar 2024',
    features: [
      'Cinematic Ambient Particle Effects (Canvas 2D)',
      'Global dark/light theme persistence and tokens presets',
      'Dynamic components with Framer motion transitions limits'
    ],
    learnings: [
      'Optimising frame rendering loops to deliver 60fps buffers',
      'Absolute Layout sizing across fluid Viewport breakpoints'
    ]
  },
  'ATLAS': {
    startDate: 'Oct 2023',
    endDate: 'Dec 2023',
    features: [
      'Architecture Integrity Audit engine streams node locks',
      'Dockerized build Sandboxing coordinates securely',
      'Graph Differ visualization with Tree structures node limits'
    ],
    learnings: [
      'Transactional Isolation levels handling lock concurrency limits',
      'Grid layout algorithms for rendering cyclic Nodes correctly'
    ]
  }
}
