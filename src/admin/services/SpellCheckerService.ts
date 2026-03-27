export interface QualityIssue {
  docId: string
  field: string
  text: string
  issue: string
  severity: 'low' | 'medium' | 'high'
}

const COMMON_TYPOS: Record<string, string> = {
  'teh': 'the',
  'receive': 'recieve',
  'separate': 'seperate',
  'definitely': 'definately',
  'occurrence': 'occurance'
}

/**
 * Scans content for quality issues.
 */
export function scanContent(docId: string, data: Record<string, any>): QualityIssue[] {
  const issues: QualityIssue[] = []

  Object.entries(data).forEach(([field, value]) => {
    if (typeof value === 'string') {
      // 1. Placeholder detection
      if (value.toLowerCase().includes('lorem ipsum') || value.toLowerCase().includes('[placeholder]')) {
        issues.push({ docId, field, text: value, issue: 'Placeholder text detected', severity: 'high' })
      }

      // 2. Typos
      const words = value.toLowerCase().split(/\s+/)
      words.forEach(word => {
        const cleanWord = word.replace(/[^a-z]/g, '')
        if (COMMON_TYPOS[cleanWord]) {
          issues.push({ 
            docId, 
            field, 
            text: value, 
            issue: `Potential typo: "${cleanWord}" should be "${COMMON_TYPOS[cleanWord]}"`, 
            severity: 'medium' 
          })
        }
      })

      // 3. Length checks (e.g. empty or too short)
      if (value.trim().length < 3 && value.trim().length > 0) {
        issues.push({ docId, field, text: value, issue: 'Text content too brief', severity: 'low' })
      }
    } else if (Array.isArray(value)) {
      // Recursive scan for arrays of strings
      value.forEach((item, index) => {
         if (typeof item === 'string') {
            const subIssues = scanContent(docId, { [`${field}[${index}]`]: item })
            issues.push(...subIssues)
         }
      })
    }
  })

  return issues
}
