import { CertificationEntry } from '@/common/types/content.types'
import { useFirestoreCollection } from './useFirestoreCollection'

const staticCerts: CertificationEntry[] = [
  { title: "AWS Solutions Architect", issuer: "Amazon Web Services", date: "2023", icon: "https://upload.wikimedia.org/wikipedia/commons/5/5c/Amazon_Web_Services_Logo.svg" },
  { title: "Meta Senior UI Engineer", issuer: "Meta / Coursera", date: "2022", icon: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
  { title: "Professional Google Cloud Dev", issuer: "Google Cloud", date: "2022", icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg" },
  { title: "React Performance Expert", issuer: "Frontend Masters", date: "2021", icon: "https://frontendmasters.com/favicon-32x32.png" },
  { title: "UX Design Specialization", issuer: "Google", date: "2020", icon: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }
];

export function useCertifications() {
  const { data: certifications, loading } = useFirestoreCollection<CertificationEntry>(
    'certifications',
    staticCerts
  )

  return { certifications, loading }
}
