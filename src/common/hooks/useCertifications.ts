import { useState, useEffect } from 'react'
import { getCollection } from '@/common/shared/firestore.service'
import { CertificationEntry } from '@/common/types/content.types'

const staticCerts: CertificationEntry[] = [
  { title: "AWS Solutions Architect", issuer: "Amazon Web Services", date: "2023", icon: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Amazon_Web_Services_Logo.svg" },
  { title: "Meta Senior UI Engineer", issuer: "Meta / Coursera", date: "2022", icon: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { title: "Professional Google Cloud Dev", issuer: "Google Cloud", date: "2022", icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
  { title: "React Performance Expert", issuer: "Frontend Masters", date: "2021", icon: "https://frontendmasters.com/favicon-32x32.png" },
  { title: "UX Design Specialization", issuer: "Google", date: "2020", icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }
];

export function useCertifications() {
  const [certifications, setCertifications] = useState<CertificationEntry[]>(staticCerts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await getCollection<CertificationEntry>('certifications')
        if (data && data.length > 0) {
          setCertifications(data)
        }
      } catch (err) {
        console.error('Failed to fetch certifications:', err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { certifications, loading }
}
