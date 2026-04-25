import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '@/common/lib/firebase'
import { ExperienceEntry } from '@/common/types/content.types'

const staticExperience: ExperienceEntry[] = [
  {
    company: "Future Logic Systems",
    role: "Lead UI Architect",
    date: "2024 — Present",
    bullets: [
      "Directing the visual evolution of spatial computing interfaces using low-paint budget strategies.",
      "Architecting design systems for 100dvh dashboard applications across distributed teams.",
      "Reduced CSS payload size by 40% through atomic token migration."
    ]
  },
  {
    company: "Midnight Nexus",
    role: "Senior Creative Developer",
    date: "2021 — 2024",
    bullets: [
      "Developed immersive React experiences with zero layout shift (CLS) for high-traffic portfolios.",
      "Engineered a custom motion library using spring-based easing for cinematic interactions.",
      "Collaborated with ITF designers to implement typographic specifications for Satoshi branding."
    ]
  },
  {
    company: "Void Creative",
    role: "Frontend Developer",
    date: "2019 — 2021",
    bullets: [
      "Built responsive web applications focused on performance and WCAG 2.1 accessibility.",
      "Implemented dark-mode architectures with localStorage persistence and CSS variable mapping.",
      "Optimized rendering pipelines for low-end mobile devices."
    ]
  }
];

export function useExperience() {
  const [experience, setExperience] = useState<ExperienceEntry[]>(staticExperience)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const q = query(collection(db, 'experience'), orderBy('date', 'desc'))
        const querySnapshot = await getDocs(q)
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ExperienceEntry))
        
        if (data && data.length > 0) {
          setExperience(data)
        }
      } catch (err) {
        console.error('Failed to fetch experience:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { experience, loading }
}
