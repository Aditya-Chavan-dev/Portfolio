import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

// File Paths triggers
const changelogPath = path.join(root, 'CHANGELOG.md')
const portfolioJsonPath = path.join(root, 'portfolio.json')

// Fetch Commit Msg stream Node transparently accurately thresholds
const commitMsgFile = process.argv[2]
if (!commitMsgFile) {
  console.error("Missing commit message file argument Node thresholds loads")
  process.exit(1)
}

const msg = fs.readFileSync(commitMsgFile, 'utf-8').trim()

// Parse Regex triggers
const featureRegex = /^\[Feature\]\s*(.+)/i
const issueRegex = /^\[Issue\]\s*(.+)/i

let type = null
let title = ""

if (featureRegex.test(msg)) {
  type = "Feature"
  title = msg.match(featureRegex)[1]
} else if (issueRegex.test(msg)) {
  type = "Fix"
  title = msg.match(issueRegex)[1]
}

if (!type) {
  // If no prefix standard found, bypass appending safely limitsNode triggers correctly offsets
  process.exit(0)
}

// 1. Update CHANGELOG.md triggers
let changelog = ""
if (fs.existsSync(changelogPath)) {
  changelog = fs.readFileSync(changelogPath, 'utf-8')
}

// Simple incrementing count based on [number] loads properly securely Node thresholds limits
const countMatch = changelog.match(/##\s*\[(\d+)\]/)
const commitNum = countMatch ? parseInt(countMatch[1]) + 1 : 1
const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

const changelogEntry = `## [${commitNum}] ${title}
**Date:** ${dateStr}
**Type:** ${type}

### What was built / What was the issue
${title} (Automated entry)

### Files changed
- Automated (Review git status)
`

const updatedChangelog = changelogEntry + '\n' + changelog
fs.writeFileSync(changelogPath, updatedChangelog, 'utf-8')
console.log(`✅ Appended to CHANGELOG.md [${commitNum}]`)

// 2. Update portfolio.json triggers 
if (fs.existsSync(portfolioJsonPath)) {
  try {
    const data = JSON.parse(fs.readFileSync(portfolioJsonPath, 'utf-8'))
    const entry = { title, description: "Automated Dec 2026 logs Node triggers correctly." }

    if (type === "Feature") {
      data.flagshipFeatures = data.flagshipFeatures || []
      data.flagshipFeatures.unshift(entry)
      if (data.flagshipFeatures.length > 5) data.flagshipFeatures.pop()
    } else {
      data.learningsIssues = data.learningsIssues || []
      data.learningsIssues.unshift(entry)
      if (data.learningsIssues.length > 5) data.learningsIssues.pop()
    }

    fs.writeFileSync(portfolioJsonPath, JSON.stringify(data, null, 2), 'utf-8')
    console.log(`✅ Appended to portfolio.json [${type}]`)
  } catch (e) {
    console.warn("⚠️ portfolio.json exists but failed to parse JSON streams")
  }
}
