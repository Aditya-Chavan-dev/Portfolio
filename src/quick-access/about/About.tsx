import { SectionNav }      from '@/shared/SectionNav'
import { useAboutContent } from './useAboutContent'
import { AboutBio }        from './AboutBio'
import { AboutFacts }      from './AboutFacts'

export default function About() {
  const { content, loading } = useAboutContent()

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center" role="status" aria-live="polite" aria-busy="true">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-gray-300 dark:border-gray-700 border-t-gray-600 dark:border-t-gray-400 rounded-full animate-spin" aria-hidden="true" />
          <span className="text-sm text-gray-400 dark:text-gray-600">Loading…</span>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pb-24 md:pb-0">
      <SectionNav />
      <main className="max-w-3xl mx-auto px-6 md:px-8 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight">
          {content.pageTitle}
        </h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-10">
          {content.pageSubtitle}
        </p>

        <AboutBio content={content} />
        {content.facts.length > 0 && <AboutFacts facts={content.facts} />}
      </main>
    </div>
  )
}
