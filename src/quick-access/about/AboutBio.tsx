import type { AboutContent } from './about.types'

interface Props {
  readonly content: AboutContent
}

export function AboutBio({ content }: Props) {
  return (
    <section aria-label="Bio" className="mb-10">
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
        {content.bio}
      </p>
    </section>
  )
}
