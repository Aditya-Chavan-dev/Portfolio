import { useState } from 'react'
import { SectionNav } from '@/shared/SectionNav'
import { CertificationCard } from './CertificationCard'
import { CertificationModal } from './CertificationModal'
import { useCertificationsContent } from './useCertificationsContent'
import type { CertificationItem } from './certifications.types'

export default function Certifications() {
  const { content, loading } = useCertificationsContent()
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null)

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-theme-primary pb-24 md:pb-0">
        <SectionNav />
        <main className="max-w-4xl mx-auto px-6 md:px-8 py-8 md:py-12">
          {/* Skeleton loading state */}
          <div className="h-7 w-48 rounded-md bg-gray-200 dark:bg-gray-800 mb-2 animate-pulse" />
          <div className="h-4 w-72 rounded-md bg-gray-200 dark:bg-gray-800 mb-10 animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-xl p-5 bg-white dark:bg-[#131315] border border-black/[0.03] dark:border-white/[0.03] animate-pulse flex flex-col h-36 shadow-sm">
                <div className="h-5 w-3/4 rounded-md bg-gray-200 dark:bg-gray-800 mb-2" />
                <div className="h-3 w-1/2 rounded-md bg-gray-200 dark:bg-gray-800 mb-1" />
                <div className="h-3 w-1/3 rounded-md bg-gray-200 dark:bg-gray-800" />
                <div className="flex gap-1.5 mt-auto pt-4">
                  <div className="h-5 w-12 bg-gray-200 dark:bg-gray-800 rounded-md" />
                  <div className="h-5 w-12 bg-gray-200 dark:bg-gray-800 rounded-md" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    )
  }

  // Filter out archived items for public view
  const visibleItems = content.items.filter(item => !item.archived)

  return (
    <div className="min-h-screen bg-theme-primary pb-24 md:pb-0">
      <SectionNav />
      <main className="max-w-4xl mx-auto px-6 md:px-8 py-8 md:py-12">
        <h1 className="text-2xl md:text-3xl font-bold text-theme-primary mb-2 tracking-tight">
          {content.pageTitle}
        </h1>
        <p className="text-sm md:text-base text-theme-secondary mb-10">
          {content.pageSubtitle}
        </p>

        {visibleItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {visibleItems.map((item) => (
              <CertificationCard
                key={item.id}
                item={item}
                onClick={() => setSelectedCert(item)}
              />
            ))}
          </div>
        ) : (
          <p className="text-theme-muted text-sm">Certifications will appear here.</p>
        )}
      </main>

      {selectedCert && (
        <CertificationModal 
          item={selectedCert} 
          onClose={() => setSelectedCert(null)} 
        />
      )}
    </div>
  )
}
