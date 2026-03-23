import { useState } from 'react'
import { SectionNav } from '@/shared/SectionNav'
import { CertificationCard } from './CertificationCard'
import { CertificationModal } from './CertificationModal'
import content from './content.json'
import type { CertificationItem } from './certifications.types'

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState<CertificationItem | null>(null)

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

        {content.items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {content.items.map((item) => (
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
