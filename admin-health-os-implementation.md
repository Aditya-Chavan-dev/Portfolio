# Admin Health & Monitoring OS — Complete Implementation Prompt

> **Stack:** Next.js + React, Firebase/Firestore (Spark plan), Firebase Hosting, Firebase Auth (Google, single-admin email gate), GitHub REST API.
> **Constraint:** No Cloud Functions, no GCP Console access, no GA4 (yet), no Blaze plan. Every solution runs client-side inside the protected `/admin` route.
> **Goal:** Build all 7 modules of the Portfolio Admin Command Center end-to-end, in the exact order described below.

---

## Pre-flight Checklist

Before writing a single line of code, verify the following are already in place:

- [ ] Firebase project initialised and connected to the Next.js app via `firebase/app`
- [ ] Firestore enabled in the Firebase Console
- [ ] Firebase Auth enabled with Google provider
- [ ] Auth guard on `/admin` route — middleware checks `user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL` and redirects unauthorized users to `/`
- [ ] Firebase Storage enabled (needed for Module 7)
- [ ] GitHub Personal Access Token stored in `.env.local` as `NEXT_PUBLIC_GITHUB_TOKEN` (increases rate limit from 60 to 5000 req/hour)
- [ ] All portfolio content lives under a `live/` Firestore collection tree (e.g. `live/projects`, `live/blog`, `live/config`)

---

## Firestore Collection Schema (establish before building any module)

Create these collections/documents up front. They are the shared data layer for all 7 modules.

```
admin_metrics/
  performance        → { calls: [{label, latency, status, ts}], updatedAt }
  fcp                → { value: Number, recordedAt: Timestamp }
  github             → { repo: Object, fetchedAt: Timestamp }
  github_rate        → { remaining: Number, limit: Number, reset: Timestamp, fetchedAt: Timestamp }
  ratelimits         → { hits: [{label, ts, code}], updatedAt }

admin_sessions/
  {uid}              → { loginAt, lastSeen, userAgent }

admin_compliance/
  last_report        → { passed: Number, failed: [{id, issues:[]}], runAt: Timestamp }
  assets             → { flagged: [{path, reason}], scannedAt: Timestamp, totalScanned: Number }

admin_metadata/
  stats              → { projects: Number, blog: Number, config: Number, updatedAt }

snapshots/
  {timestamp-slug}/
    meta             → { createdAt, author, hash, label, collections:[] }
    payload/
      projects       → { docs: [...] }
      blog           → { docs: [...] }
      config         → { doc: Object }

presence/
  {sessionId}        → { path, connectedAt, lastPing, userAgent }

pageviews/
  {auto-id}          → { path, ts, sessionId }

analytics/
  clicks             → { events: [{projectId, ts}], updatedAt }
```

---

## Phase 1 — Foundation Layer

> Build this first. Every other module depends on it.

### Step 1.1 — Create `lib/firebase.js`

Initialise Firebase once and export all service instances:

```js
// lib/firebase.js
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)
export default app
```

### Step 1.2 — Create `lib/metrics.js` (the `tracedCall` wrapper)

This is the single most important file. Every Firestore and GitHub API call in your entire app must pass through this wrapper.

```js
// lib/metrics.js
import { db } from './firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

const buffer = []
let flushTimer = null

export async function tracedCall(label, fn) {
  const t0 = performance.now()
  try {
    const result = await fn()
    const latency = Math.round(performance.now() - t0)
    pushToBuffer({ label, latency, status: 'ok', ts: Date.now() })
    incrementLocalCounter('reads')
    return result
  } catch (e) {
    const latency = Math.round(performance.now() - t0)
    pushToBuffer({ label, latency, status: 'error', ts: Date.now() })
    if (e?.code === 'resource-exhausted' || e?.status === 429) {
      logRateLimit(label, e?.status || 429)
    }
    throw e
  }
}

export function tracedWrite(label, fn) {
  incrementLocalCounter('writes')
  return fn()
}

function pushToBuffer(entry) {
  buffer.push(entry)
  if (!flushTimer) {
    flushTimer = setTimeout(flushBuffer, 60_000)
  }
}

async function flushBuffer() {
  flushTimer = null
  if (!buffer.length) return
  const payload = [...buffer]
  buffer.length = 0
  try {
    await setDoc(doc(db, 'admin_metrics', 'performance'), {
      calls: payload.slice(-200), // keep last 200 entries max
      updatedAt: serverTimestamp(),
    })
  } catch (_) {
    // silent fail — metrics must never break the app
  }
}

async function logRateLimit(label, code) {
  try {
    const ref = doc(db, 'admin_metrics', 'ratelimits')
    const existing = window.__rateLimitHits || []
    existing.push({ label, ts: Date.now(), code })
    window.__rateLimitHits = existing
    await setDoc(ref, { hits: existing.slice(-50), updatedAt: serverTimestamp() })
  } catch (_) {}
}

// localStorage-based daily usage counters (resets at midnight)
export function incrementLocalCounter(type) {
  const today = new Date().toDateString()
  const stored = JSON.parse(localStorage.getItem('admin_usage') || '{}')
  if (stored.date !== today) {
    localStorage.setItem('admin_usage', JSON.stringify({ date: today, reads: 0, writes: 0, deletes: 0 }))
  }
  const updated = JSON.parse(localStorage.getItem('admin_usage'))
  updated[type] = (updated[type] || 0) + 1
  localStorage.setItem('admin_usage', JSON.stringify(updated))
}

export function getLocalCounters() {
  const today = new Date().toDateString()
  const stored = JSON.parse(localStorage.getItem('admin_usage') || '{}')
  if (stored.date !== today) return { reads: 0, writes: 0, deletes: 0 }
  return stored
}
```

### Step 1.3 — Wrap all existing content service calls

Go through every file that calls Firestore (e.g. `getProjects()`, `getBlogPosts()`, `getConfig()`). Wrap the Firestore call in `tracedCall`:

```js
// Before
const snap = await getDocs(collection(db, 'live/projects'))

// After
import { tracedCall } from '../lib/metrics'
const snap = await tracedCall('firestore/getProjects', () => getDocs(collection(db, 'live/projects')))
```

Do the same for all `addDoc`, `setDoc`, `updateDoc`, `deleteDoc` calls — wrap them in `tracedWrite`.

### Step 1.4 — Establish `admin_metadata/stats` with counters

Every time you create or delete a document in `live/projects` or `live/blog`, update the stats counter atomically:

```js
import { doc, increment, updateDoc } from 'firebase/firestore'

// After creating a project doc:
await updateDoc(doc(db, 'admin_metadata', 'stats'), { projects: increment(1) })

// After deleting a project doc:
await updateDoc(doc(db, 'admin_metadata', 'stats'), { projects: increment(-1) })
```

Initialise the stats doc once manually in the Firebase Console with `{ projects: N, blog: N, config: 1 }` to match your current counts.

---

## Phase 2 — Module 1: The Pulse (Live Performance)

### Step 2.1 — FCP instrumentation in `_app.js`

Measure First Contentful Paint on the public portfolio and write to Firestore:

```js
// pages/_app.js  (public portfolio app, not admin)
import { useEffect } from 'react'
import { db } from '../lib/firebase'
import { doc, setDoc } from 'firebase/firestore'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const observer = new PerformanceObserver((list) => {
      const entry = list.getEntriesByName('first-contentful-paint')[0]
      if (entry) {
        setDoc(doc(db, 'admin_metrics', 'fcp'), {
          value: Math.round(entry.startTime),
          recordedAt: new Date().toISOString(),
        }).catch(() => {})
        observer.disconnect()
      }
    })
    observer.observe({ type: 'paint', buffered: true })
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
```

### Step 2.2 — Build the Pulse admin panel component

Create `components/admin/PulsePanel.jsx`:

```jsx
// components/admin/PulsePanel.jsx
import { useEffect, useState } from 'react'
import { db } from '../../lib/firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export default function PulsePanel() {
  const [calls, setCalls] = useState([])
  const [fcp, setFcp] = useState(null)

  useEffect(() => {
    const unsub1 = onSnapshot(doc(db, 'admin_metrics', 'performance'), (snap) => {
      if (snap.exists()) {
        const data = snap.data().calls || []
        // Group by minute bucket for chart
        const bucketed = bucketByMinute(data)
        setCalls(bucketed)
      }
    })
    const unsub2 = onSnapshot(doc(db, 'admin_metrics', 'fcp'), (snap) => {
      if (snap.exists()) setFcp(snap.data().value)
    })
    return () => { unsub1(); unsub2() }
  }, [])

  return (
    <div>
      <h2>The Pulse — Live Performance</h2>

      <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
        <StatCard label="FCP (last visitor)" value={fcp ? `${fcp}ms` : '—'} status={fcpStatus(fcp)} />
        <StatCard label="Calls tracked" value={calls.length} />
        <StatCard label="Error rate" value={calcErrorRate(calls)} />
      </div>

      <h3>API Latency — Last Hour</h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={calls}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="minute" tick={{ fontSize: 11 }} />
          <YAxis unit="ms" tick={{ fontSize: 11 }} />
          <Tooltip />
          <Line type="monotone" dataKey="avgLatency" stroke="#3B8BD4" dot={false} name="Avg latency" />
          <Line type="monotone" dataKey="errors" stroke="#E24B4A" dot={false} name="Errors" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

function bucketByMinute(calls) {
  const buckets = {}
  calls.forEach(c => {
    const minute = new Date(c.ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    if (!buckets[minute]) buckets[minute] = { minute, latencies: [], errors: 0 }
    buckets[minute].latencies.push(c.latency)
    if (c.status === 'error') buckets[minute].errors++
  })
  return Object.values(buckets).map(b => ({
    ...b,
    avgLatency: Math.round(b.latencies.reduce((a, v) => a + v, 0) / b.latencies.length),
  }))
}

function calcErrorRate(calls) {
  if (!calls.length) return '0%'
  const errors = calls.reduce((a, b) => a + (b.errors || 0), 0)
  const total = calls.reduce((a, b) => a + (b.latencies?.length || 0), 0)
  return total ? `${((errors / total) * 100).toFixed(1)}%` : '0%'
}

function fcpStatus(fcp) {
  if (!fcp) return 'neutral'
  if (fcp < 1800) return 'good'
  if (fcp < 3000) return 'warn'
  return 'bad'
}

function StatCard({ label, value, status }) {
  const colors = { good: '#1D9E75', warn: '#BA7517', bad: '#E24B4A', neutral: '#888780' }
  return (
    <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 8, minWidth: 120 }}>
      <div style={{ fontSize: 12, color: '#888' }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 500, color: status ? colors[status] : 'inherit' }}>{value}</div>
    </div>
  )
}
```

---

## Phase 3 — Module 2: The Shield (Security & Compliance)

### Step 3.1 — Auth session logger

Call this function immediately after successful Google sign-in:

```js
// lib/sessionLogger.js
import { db } from './firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

export async function logSession(user) {
  await setDoc(doc(db, 'admin_sessions', user.uid), {
    loginAt: serverTimestamp(),
    lastSeen: serverTimestamp(),
    userAgent: navigator.userAgent,
    email: user.email,
  })
}

export async function heartbeatSession(uid) {
  await setDoc(doc(db, 'admin_sessions', uid), {
    lastSeen: serverTimestamp(),
  }, { merge: true })
}
```

In your admin layout component, call `logSession(user)` on mount and start a heartbeat:

```js
// Inside admin layout useEffect
logSession(user)
const hb = setInterval(() => heartbeatSession(user.uid), 5 * 60 * 1000)
return () => clearInterval(hb)
```

### Step 3.2 — Schema integrity guard (on-demand, client-side)

Install Zod: `npm install zod`

Define your schemas:

```js
// lib/schemas.js
import { z } from 'zod'

export const ProjectSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
  tags: z.array(z.string()),
  status: z.enum(['draft', 'published']),
  createdAt: z.any(),
})

export const BlogSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  content: z.string().min(1),
  status: z.enum(['draft', 'published']),
  createdAt: z.any(),
})

// Add schemas for every collection you have
```

Build the compliance runner:

```js
// lib/complianceRunner.js
import { db } from './firebase'
import { collection, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { tracedCall } from './metrics'
import { ProjectSchema, BlogSchema } from './schemas'

const SCHEMA_MAP = {
  'live/projects': ProjectSchema,
  'live/blog': BlogSchema,
}

export async function runComplianceCheck() {
  const results = { passed: 0, failed: [], runAt: new Date().toISOString() }

  for (const [collPath, schema] of Object.entries(SCHEMA_MAP)) {
    const snap = await tracedCall(`compliance/${collPath}`, () =>
      getDocs(collection(db, collPath))
    )
    snap.forEach(docSnap => {
      const result = schema.safeParse({ id: docSnap.id, ...docSnap.data() })
      if (result.success) {
        results.passed++
      } else {
        results.failed.push({
          id: docSnap.id,
          collection: collPath,
          issues: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
        })
      }
    })
  }

  await setDoc(doc(db, 'admin_compliance', 'last_report'), results)
  return results
}
```

### Step 3.3 — CORS header checker

```js
// lib/corsChecker.js
export async function checkCors(url = window.location.origin) {
  try {
    const res = await fetch(url, { method: 'HEAD', mode: 'cors' })
    return {
      ok: res.ok,
      headers: {
        'access-control-allow-origin': res.headers.get('access-control-allow-origin'),
        'x-content-type-options': res.headers.get('x-content-type-options'),
        'x-frame-options': res.headers.get('x-frame-options'),
      }
    }
  } catch (e) {
    return { ok: false, error: e.message }
  }
}
```

### Step 3.4 — Build Shield panel component

Create `components/admin/ShieldPanel.jsx` with:
- Session info card showing login time and time since last heartbeat
- "Run Compliance Check" button that calls `runComplianceCheck()` and shows a results table
- "Check CORS Headers" button that calls `checkCors()` and shows pass/fail badges per header
- Rate limit hits counter (reads from `admin_metrics/ratelimits`)

---

## Phase 4 — Module 3: The Hive (Traffic & Engagement)

### Step 4.1 — Presence system (add to public portfolio)

```js
// lib/presence.js  (imported in portfolio's _app.js)
import { db } from './firebase'
import { doc, setDoc, deleteDoc, serverTimestamp } from 'firebase/firestore'

let sessionId = null
let pingInterval = null

export function initPresence(path) {
  sessionId = crypto.randomUUID()
  const ref = doc(db, 'presence', sessionId)

  setDoc(ref, {
    path,
    connectedAt: serverTimestamp(),
    lastPing: serverTimestamp(),
    userAgent: navigator.userAgent,
  }).catch(() => {})

  pingInterval = setInterval(() => {
    setDoc(ref, { lastPing: serverTimestamp() }, { merge: true }).catch(() => {})
  }, 30_000)

  const cleanup = () => {
    clearInterval(pingInterval)
    deleteDoc(ref).catch(() => {})
  }

  window.addEventListener('beforeunload', cleanup)
  return cleanup
}
```

Call `initPresence(router.pathname)` in your portfolio's `_app.js` inside a `useEffect` that re-fires on route changes.

### Step 4.2 — Page view tracking (add to public portfolio)

```js
// lib/pageTracker.js
import { db } from './firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export async function trackPageView(path, sessionId) {
  try {
    await addDoc(collection(db, 'pageviews'), {
      path,
      ts: serverTimestamp(),
      sessionId: sessionId || 'unknown',
    })
  } catch (_) {}
}
```

Call on every route change in `_app.js`.

### Step 4.3 — Project click tracking (add to portfolio project grid)

```js
// Inside your project card onClick handler
import { db } from '../../lib/firebase'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

async function trackProjectClick(projectId) {
  const existing = JSON.parse(localStorage.getItem('click_events') || '[]')
  existing.push({ projectId, ts: Date.now() })
  localStorage.setItem('click_events', JSON.stringify(existing.slice(-500)))

  // Batch-flush to Firestore every 10 clicks or on page unload
  if (existing.length % 10 === 0) {
    await setDoc(doc(db, 'analytics', 'clicks'), {
      events: existing.slice(-500),
      updatedAt: serverTimestamp(),
    })
  }
}
```

### Step 4.4 — Pageview cleanup utility (run from admin manually)

```js
// lib/cleanupPageviews.js
import { db } from './firebase'
import { collection, query, where, getDocs, writeBatch, Timestamp } from 'firebase/firestore'

export async function cleanOldPageviews() {
  const cutoff = Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
  const q = query(collection(db, 'pageviews'), where('ts', '<', cutoff))
  const snap = await getDocs(q)
  const batch = writeBatch(db)
  snap.forEach(d => batch.delete(d.ref))
  await batch.commit()
  return snap.size
}
```

### Step 4.5 — Build Hive panel component

Create `components/admin/HivePanel.jsx` with:
- Live visitor count: query `presence` where `lastPing > now - 90s` using `onSnapshot`
- Top pages table: aggregate `pageviews` from last 24h, group by `path`, sort by count
- Project click bar chart: read `analytics/clicks`, group by `projectId`, render with Recharts `BarChart`
- "Clean old pageviews" button that calls `cleanOldPageviews()`
- GA4 setup prompt card: a dismissable card explaining how to add `gtag.js` for historical analytics

### Step 4.6 — Add GA4 (30-minute task, do this now)

In `pages/_document.js`, add:

```jsx
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`} />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');
        `}} />
      </Head>
      <body><Main /><NextScript /></body>
    </Html>
  )
}
```

Set `NEXT_PUBLIC_GA4_ID` in `.env.local`. GA4 dashboard in Google Analytics gives you historical sessions, bounce rate, and demographics with zero additional code.

---

## Phase 5 — Module 4: The Engine (Infra & Resources)

### Step 5.1 — GitHub repo health fetcher

```js
// lib/githubHealth.js
import { db } from './firebase'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { tracedCall } from './metrics'

const OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER
const REPO = process.env.NEXT_PUBLIC_GITHUB_REPO
const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

export async function getGithubHealth() {
  const cacheDoc = await tracedCall('firestore/github_cache', () =>
    getDoc(doc(db, 'admin_metrics', 'github'))
  )

  if (cacheDoc.exists()) {
    const cached = cacheDoc.data()
    if (Date.now() - cached.fetchedAt?.toMillis() < CACHE_TTL) {
      return cached.repo
    }
  }

  const res = await tracedCall('github/repo', () =>
    fetch(`https://api.github.com/repos/${OWNER}/${REPO}`, {
      headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
    }).then(r => r.json())
  )

  const payload = {
    name: res.name,
    pushedAt: res.pushed_at,
    openIssues: res.open_issues_count,
    stars: res.stargazers_count,
    diskUsageKb: res.size,
    defaultBranch: res.default_branch,
  }

  await setDoc(doc(db, 'admin_metrics', 'github'), {
    repo: payload,
    fetchedAt: serverTimestamp(),
  })

  return payload
}

export async function getGithubRateLimit() {
  const cacheDoc = await getDoc(doc(db, 'admin_metrics', 'github_rate'))
  if (cacheDoc.exists()) {
    const c = cacheDoc.data()
    if (Date.now() - c.fetchedAt?.toMillis() < 60_000) return c
  }

  const res = await fetch('https://api.github.com/rate_limit', {
    headers: TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {},
  }).then(r => r.json())

  const payload = {
    remaining: res.rate.remaining,
    limit: res.rate.limit,
    reset: new Date(res.rate.reset * 1000).toISOString(),
    fetchedAt: serverTimestamp(),
  }

  await setDoc(doc(db, 'admin_metrics', 'github_rate'), payload)
  return payload
}
```

### Step 5.2 — Build Engine panel component

Create `components/admin/EnginePanel.jsx` with:
- Firestore document count cards (reads from `admin_metadata/stats`)
- GitHub repo card: last push date, open issues, stars, disk usage
- GitHub API rate limit progress bar: remaining/limit with reset countdown
- Client-side query latency chart: re-uses data from `admin_metrics/performance`, filtered to Firestore calls only
- Firebase Hosting bandwidth: honest "View in Firebase Console" button with direct deep-link `https://console.firebase.google.com/project/{PROJECT_ID}/usage`

---

## Phase 6 — Module 5: The Time Machine (Snapshots & Rollback)

### Step 6.1 — SnapshotService

```js
// lib/snapshotService.js
import { db } from './firebase'
import {
  collection, doc, getDocs, setDoc, writeBatch,
  serverTimestamp, query, orderBy, limit, deleteDoc
} from 'firebase/firestore'
import { tracedCall } from './metrics'

const MAX_SNAPSHOTS = 10
const COLLECTIONS = ['live/projects', 'live/blog', 'live/config']

async function hashPayload(payload) {
  const text = JSON.stringify(payload)
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text))
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function createSnapshot(label, authorEmail) {
  // 1. Read all live collections
  const payload = {}
  for (const collPath of COLLECTIONS) {
    const snap = await tracedCall(`snapshot/read/${collPath}`, () =>
      getDocs(collection(db, collPath))
    )
    payload[collPath.replace('live/', '')] = snap.docs.map(d => ({ id: d.id, ...d.data() }))
  }

  // 2. Hash the payload
  const hash = await hashPayload(payload)
  const slug = `${Date.now()}`

  // 3. Write snapshot in a batch
  const batch = writeBatch(db)
  const metaRef = doc(db, 'snapshots', slug, 'meta', 'info')
  batch.set(metaRef, {
    createdAt: serverTimestamp(),
    author: authorEmail,
    hash,
    label,
    collections: COLLECTIONS,
  })

  for (const [key, docs] of Object.entries(payload)) {
    const payloadRef = doc(db, 'snapshots', slug, 'payload', key)
    batch.set(payloadRef, { docs })
  }

  await batch.commit()

  // 4. Enforce retention limit
  await enforceRetentionLimit()

  return { slug, hash }
}

async function enforceRetentionLimit() {
  const snap = await getDocs(
    query(collection(db, 'snapshots'), orderBy('meta.createdAt'), limit(100))
  )
  const slugs = snap.docs.map(d => d.id)
  if (slugs.length > MAX_SNAPSHOTS) {
    const toDelete = slugs.slice(0, slugs.length - MAX_SNAPSHOTS)
    for (const slug of toDelete) {
      // Delete meta and all payload sub-documents
      const metaRef = doc(db, 'snapshots', slug, 'meta', 'info')
      await deleteDoc(metaRef)
      for (const key of ['projects', 'blog', 'config']) {
        await deleteDoc(doc(db, 'snapshots', slug, 'payload', key))
      }
    }
  }
}

export async function listSnapshots() {
  const snap = await tracedCall('snapshot/list', () =>
    getDocs(collection(db, 'snapshots'))
  )
  const results = []
  for (const d of snap.docs) {
    const metaSnap = await getDocs(collection(db, 'snapshots', d.id, 'meta'))
    if (!metaSnap.empty) {
      results.push({ slug: d.id, ...metaSnap.docs[0].data() })
    }
  }
  return results.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis())
}

export async function restoreSnapshot(slug) {
  // 1. Read snapshot payload
  const payload = {}
  for (const key of ['projects', 'blog', 'config']) {
    const snap = await tracedCall(`snapshot/readPayload/${key}`, () =>
      getDocs(collection(db, 'snapshots', slug, 'payload'))
    )
    snap.forEach(d => { payload[d.id] = d.data() })
  }

  // 2. Atomic batch restore
  const batch = writeBatch(db)

  if (payload.projects?.docs) {
    for (const item of payload.projects.docs) {
      const { id, ...data } = item
      batch.set(doc(db, 'live/projects', id), data)
    }
  }

  if (payload.blog?.docs) {
    for (const item of payload.blog.docs) {
      const { id, ...data } = item
      batch.set(doc(db, 'live/blog', id), data)
    }
  }

  if (payload.config?.doc) {
    batch.set(doc(db, 'live/config', 'main'), payload.config.doc)
  }

  await batch.commit()
  return true
}

export async function loadSnapshotPreview(slug) {
  const payload = {}
  for (const key of ['projects', 'blog', 'config']) {
    const snap = await getDocs(collection(db, 'snapshots', slug, 'payload'))
    snap.forEach(d => { payload[d.id] = d.data() })
  }
  return payload // Return in-memory only — never write to live
}
```

### Step 6.2 — Preview context

```js
// context/PreviewContext.js
import { createContext, useContext, useState } from 'react'

const PreviewContext = createContext(null)

export function PreviewProvider({ children }) {
  const [preview, setPreview] = useState(null) // null = live mode

  return (
    <PreviewContext.Provider value={{ preview, setPreview, isPreview: !!preview }}>
      {children}
    </PreviewContext.Provider>
  )
}

export const usePreview = () => useContext(PreviewContext)
```

Wrap your admin layout with `<PreviewProvider>`. In every content hook, check:

```js
const { preview } = usePreview()
const projects = preview ? preview.projects?.docs : await getLiveProjects()
```

### Step 6.3 — Build Time Machine panel component

Create `components/admin/TimeMachinePanel.jsx` with:
- Snapshot list table: label, author, date, hash (truncated), restore button
- "Create Snapshot" form with a label text input and submit button
- Restore confirmation modal (native `window.confirm` is fine) before calling `restoreSnapshot()`
- "Preview" button that calls `loadSnapshotPreview()` and activates `PreviewContext`
- Active preview banner: sticky bar at top of admin showing "Previewing snapshot from [date] — Exit Preview"

---

## Phase 7 — Module 6: The Budget (Firebase Usage Monitor)

### Step 7.1 — Budget panel component

Create `components/admin/BudgetPanel.jsx`:

```jsx
// components/admin/BudgetPanel.jsx
import { useEffect, useState } from 'react'
import { getLocalCounters } from '../../lib/metrics'
import { getGithubRateLimit } from '../../lib/githubHealth'

const SPARK_LIMITS = {
  reads: 50_000,
  writes: 20_000,
  deletes: 20_000,
}

export default function BudgetPanel() {
  const [counters, setCounters] = useState({ reads: 0, writes: 0, deletes: 0 })
  const [githubRate, setGithubRate] = useState(null)

  useEffect(() => {
    setCounters(getLocalCounters())
    getGithubRateLimit().then(setGithubRate)
    const interval = setInterval(() => setCounters(getLocalCounters()), 10_000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <h2>The Budget — Firebase Usage</h2>
      <p style={{ fontSize: 12, color: '#888', marginBottom: 16 }}>
        ⚠️ Read/write counts are approximate (client-side instrumented, not official Firebase billing data).
        For exact numbers, open the Firebase Console.
      </p>

      <div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
        {Object.entries(SPARK_LIMITS).map(([type, limit]) => (
          <UsageBar
            key={type}
            label={`Firestore ${type} today`}
            used={counters[type] || 0}
            limit={limit}
          />
        ))}

        {githubRate && (
          <UsageBar
            label="GitHub API calls remaining"
            used={githubRate.limit - githubRate.remaining}
            limit={githubRate.limit}
            resetLabel={`Resets at ${new Date(githubRate.reset).toLocaleTimeString()}`}
            invertColor
          />
        )}
      </div>

      <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
        <a
          href={`https://console.firebase.google.com/project/${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}/usage`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ padding: '8px 16px', background: '#f0a500', color: '#fff', borderRadius: 6, textDecoration: 'none' }}
        >
          Open Firebase Console (official usage)
        </a>
      </div>
    </div>
  )
}

function UsageBar({ label, used, limit, resetLabel, invertColor }) {
  const pct = Math.min((used / limit) * 100, 100)
  const color = invertColor
    ? pct > 85 ? '#E24B4A' : pct > 60 ? '#BA7517' : '#1D9E75'
    : pct > 85 ? '#E24B4A' : pct > 60 ? '#BA7517' : '#1D9E75'

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
        <span>{label}</span>
        <span>{used.toLocaleString()} / {limit.toLocaleString()}</span>
      </div>
      <div style={{ height: 8, background: '#eee', borderRadius: 4, marginTop: 4 }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 4, transition: 'width 0.5s' }} />
      </div>
      {resetLabel && <div style={{ fontSize: 11, color: '#aaa', marginTop: 2 }}>{resetLabel}</div>}
    </div>
  )
}
```

---

## Phase 8 — Module 7: The Editor (Spell Check & Asset Quality)

### Step 8.1 — Spell checker using LanguageTool free API

```js
// lib/spellChecker.js
import { db } from './firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { tracedCall } from './metrics'

const LT_API = 'https://api.languagetool.org/v2/check'
const RATE_LIMIT_MS = 3000 // 20 req/min = 1 per 3s

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function checkText(text, language = 'en-US') {
  const body = new URLSearchParams({ text, language })
  const res = await fetch(LT_API, { method: 'POST', body })
  const data = await res.json()
  return data.matches || []
}

export async function runSpellCheck() {
  const results = []

  // Only scan draft documents
  const collectionsToCheck = [
    { path: 'live/projects', fields: ['title', 'description'] },
    { path: 'live/blog', fields: ['title', 'content'] },
  ]

  for (const { path, fields } of collectionsToCheck) {
    const snap = await tracedCall(`spellcheck/read/${path}`, () =>
      getDocs(query(collection(db, path), where('status', '==', 'draft')))
    )

    for (const docSnap of snap.docs) {
      const data = docSnap.data()
      for (const field of fields) {
        if (!data[field]) continue
        await sleep(RATE_LIMIT_MS)
        const matches = await checkText(data[field])
        if (matches.length) {
          results.push({
            docId: docSnap.id,
            collection: path,
            field,
            issues: matches.map(m => ({
              message: m.message,
              offset: m.offset,
              length: m.length,
              suggestions: m.replacements.slice(0, 3).map(r => r.value),
              context: m.context.text,
            })),
          })
        }
      }
    }
  }

  return results
}
```

### Step 8.2 — Asset quality inspector

```js
// lib/assetInspector.js
import { storage, db } from './firebase'
import { ref, listAll, getMetadata } from 'firebase/storage'
import { doc, setDoc, serverTimestamp } from 'firebase/firestore'

const SIZE_LIMIT_BYTES = 500_000 // 500KB

export async function runAssetInspection() {
  const rootRef = ref(storage)
  const listing = await listAll(rootRef)
  const flagged = []
  let totalScanned = 0

  for (const itemRef of listing.items) {
    const metadata = await getMetadata(itemRef)
    totalScanned++

    const issues = []
    if (metadata.size > SIZE_LIMIT_BYTES) {
      issues.push(`File is ${(metadata.size / 1024).toFixed(0)}KB — over 500KB limit`)
    }
    if (!metadata.customMetadata?.alt) {
      issues.push('Missing alt text (add customMetadata.alt in Firebase Storage)')
    }

    if (issues.length) {
      flagged.push({
        path: itemRef.fullPath,
        name: itemRef.name,
        sizeKb: Math.round(metadata.size / 1024),
        issues,
      })
    }
  }

  const report = { flagged, scannedAt: serverTimestamp(), totalScanned }
  await setDoc(doc(db, 'admin_compliance', 'assets'), report)
  return report
}
```

### Step 8.3 — Build Editor panel component

Create `components/admin/EditorPanel.jsx` with:
- "Run Spell Check" button that calls `runSpellCheck()` with a loading spinner
- Results list: grouped by document, showing each flagged field, the issue message, context, and suggested replacements
- "Run Asset Inspection" button that calls `runAssetInspection()` with a loading spinner
- Flagged assets list: file path, size, list of issues, with a direct link to Firebase Storage Console
- "Last scanned" timestamp displayed for both checkers
- Draft-only disclaimer: "Only scanning documents with status: draft"

---

## Phase 9 — Admin Dashboard Shell

### Step 9.1 — Admin layout with tab navigation

Create `pages/admin/index.jsx` as the main dashboard. Use tab navigation to switch between modules:

```jsx
// pages/admin/index.jsx
import { useState, useEffect } from 'react'
import { auth, db } from '../../lib/firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'next/router'
import { logSession, heartbeatSession } from '../../lib/sessionLogger'
import { PreviewProvider, usePreview } from '../../context/PreviewContext'

import PulsePanel from '../../components/admin/PulsePanel'
import ShieldPanel from '../../components/admin/ShieldPanel'
import HivePanel from '../../components/admin/HivePanel'
import EnginePanel from '../../components/admin/EnginePanel'
import TimeMachinePanel from '../../components/admin/TimeMachinePanel'
import BudgetPanel from '../../components/admin/BudgetPanel'
import EditorPanel from '../../components/admin/EditorPanel'

const TABS = [
  { id: 'pulse',       label: '⚡ The Pulse'        },
  { id: 'shield',      label: '🛡 The Shield'        },
  { id: 'hive',        label: '🐝 The Hive'          },
  { id: 'engine',      label: '⚙️ The Engine'        },
  { id: 'timemachine', label: '⏱ Time Machine'      },
  { id: 'budget',      label: '💰 The Budget'        },
  { id: 'editor',      label: '✏️ The Editor'        },
]

const PANEL_MAP = {
  pulse: PulsePanel,
  shield: ShieldPanel,
  hive: HivePanel,
  engine: EnginePanel,
  timemachine: TimeMachinePanel,
  budget: BudgetPanel,
  editor: EditorPanel,
}

export default function AdminDashboard() {
  const [user, setUser] = useState(null)
  const [activeTab, setActiveTab] = useState('pulse')
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      if (!u || u.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        router.push('/')
        return
      }
      setUser(u)
      setLoading(false)
      logSession(u)
    })
  }, [])

  useEffect(() => {
    if (!user) return
    const hb = setInterval(() => heartbeatSession(user.uid), 5 * 60 * 1000)
    return () => clearInterval(hb)
  }, [user])

  if (loading) return <div style={{ padding: 40 }}>Loading...</div>

  const ActivePanel = PANEL_MAP[activeTab]

  return (
    <PreviewProvider>
      <PreviewBanner />
      <div style={{ display: 'flex', minHeight: '100vh' }}>
        {/* Sidebar */}
        <nav style={{ width: 220, borderRight: '1px solid #eee', padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontWeight: 600, marginBottom: 16 }}>Admin Center</div>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                textAlign: 'left', padding: '8px 12px', borderRadius: 6, border: 'none',
                background: activeTab === tab.id ? '#f0f4ff' : 'transparent',
                color: activeTab === tab.id ? '#3B5BDB' : 'inherit',
                cursor: 'pointer', fontSize: 14,
              }}
            >
              {tab.label}
            </button>
          ))}
          <div style={{ marginTop: 'auto' }}>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>{user.email}</div>
            <button onClick={() => signOut(auth)} style={{ fontSize: 12, color: '#888', background: 'none', border: 'none', cursor: 'pointer' }}>
              Sign out
            </button>
          </div>
        </nav>

        {/* Main content */}
        <main style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
          <ActivePanel user={user} />
        </main>
      </div>
    </PreviewProvider>
  )
}

function PreviewBanner() {
  const { preview, setPreview, isPreview } = usePreview()
  if (!isPreview) return null
  return (
    <div style={{ background: '#f0a500', padding: '8px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 13 }}>
      <span>👁 Previewing snapshot from {new Date(preview.createdAt?.toMillis()).toLocaleString()} — changes are read-only</span>
      <button onClick={() => setPreview(null)} style={{ background: 'none', border: '1px solid currentColor', borderRadius: 4, padding: '2px 10px', cursor: 'pointer' }}>
        Exit Preview
      </button>
    </div>
  )
}
```

### Step 9.2 — Add Firestore security rules

In Firebase Console → Firestore → Rules, update to protect the admin collections:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Public portfolio content — read only
    match /live/{document=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.email == 'YOUR_ADMIN_EMAIL';
    }

    // Presence — any authenticated or unauthenticated user can write their own session
    match /presence/{sessionId} {
      allow read, write: if true;
    }

    // Pageviews — append only from portfolio visitors
    match /pageviews/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth.token.email == 'YOUR_ADMIN_EMAIL';
    }

    // Analytics — portfolio visitors can append clicks
    match /analytics/{docId} {
      allow read, write: if true;
    }

    // All admin collections — admin email only
    match /admin_metrics/{document=**} {
      allow read, write: if request.auth != null && request.auth.token.email == 'YOUR_ADMIN_EMAIL';
    }
    match /admin_sessions/{document=**} {
      allow read, write: if request.auth != null && request.auth.token.email == 'YOUR_ADMIN_EMAIL';
    }
    match /admin_compliance/{document=**} {
      allow read, write: if request.auth != null && request.auth.token.email == 'YOUR_ADMIN_EMAIL';
    }
    match /admin_metadata/{document=**} {
      allow read, write: if request.auth != null && request.auth.token.email == 'YOUR_ADMIN_EMAIL';
    }
    match /snapshots/{document=**} {
      allow read, write: if request.auth != null && request.auth.token.email == 'YOUR_ADMIN_EMAIL';
    }
  }
}
```

Replace `YOUR_ADMIN_EMAIL` with your actual admin Gmail address.

---

## Package Dependencies

Install everything needed up front:

```bash
npm install zod recharts firebase
```

That's it. No other new dependencies required. All other functionality uses native browser APIs (`performance`, `crypto.subtle`, `PerformanceObserver`, `localStorage`, `fetch`).

---

## Environment Variables

Ensure your `.env.local` contains all of the following:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_ADMIN_EMAIL=your-admin@gmail.com
NEXT_PUBLIC_GITHUB_OWNER=your-github-username
NEXT_PUBLIC_GITHUB_REPO=your-portfolio-repo-name
NEXT_PUBLIC_GITHUB_TOKEN=ghp_xxxxxxxxxxxx
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX
```

---

## Final Build Checklist

Complete these in order:

**Phase 1 — Foundation**
- [ ] `lib/firebase.js` created and all existing imports updated
- [ ] `lib/metrics.js` created with `tracedCall`, `tracedWrite`, `incrementLocalCounter`, `getLocalCounters`
- [ ] All existing Firestore reads wrapped in `tracedCall`
- [ ] All existing Firestore writes wrapped in `tracedWrite`
- [ ] `admin_metadata/stats` document initialised in Firebase Console with current doc counts
- [ ] `admin_metrics/performance` document initialised (empty, will auto-populate)

**Phase 2 — Module 1: Pulse**
- [ ] FCP observer added to public portfolio `_app.js`
- [ ] `PulsePanel.jsx` component built with `onSnapshot` listener and Recharts line chart

**Phase 3 — Module 2: Shield**
- [ ] `lib/sessionLogger.js` created
- [ ] `logSession()` called on admin login, `heartbeatSession()` on interval
- [ ] `lib/schemas.js` created with Zod schemas for all collections
- [ ] `lib/complianceRunner.js` created
- [ ] `lib/corsChecker.js` created
- [ ] `ShieldPanel.jsx` built with session card, compliance runner, CORS checker, rate limit display

**Phase 4 — Module 3: Hive**
- [ ] `lib/presence.js` added to public portfolio
- [ ] `lib/pageTracker.js` added to public portfolio
- [ ] Project click tracking added to portfolio project grid
- [ ] `lib/cleanupPageviews.js` created
- [ ] `HivePanel.jsx` built with live visitor count, top pages table, project click chart
- [ ] GA4 added to `_document.js`

**Phase 5 — Module 4: Engine**
- [ ] `lib/githubHealth.js` created with caching
- [ ] `EnginePanel.jsx` built with Firestore stats, GitHub health card, rate limit bar

**Phase 6 — Module 5: Time Machine**
- [ ] `lib/snapshotService.js` created with `createSnapshot`, `listSnapshots`, `restoreSnapshot`, `loadSnapshotPreview`
- [ ] `context/PreviewContext.js` created
- [ ] `usePreview()` hook added to all content fetching hooks
- [ ] `TimeMachinePanel.jsx` built with snapshot list, create form, restore flow, preview mode

**Phase 7 — Module 6: Budget**
- [ ] `BudgetPanel.jsx` built with progress bars for all Spark limits and GitHub rate limit

**Phase 8 — Module 7: Editor**
- [ ] `lib/spellChecker.js` created with rate-limited LanguageTool integration
- [ ] `lib/assetInspector.js` created with Firebase Storage scan
- [ ] `EditorPanel.jsx` built with spell check and asset inspection flows

**Phase 9 — Shell**
- [ ] `pages/admin/index.jsx` built with sidebar navigation and all panels wired in
- [ ] `PreviewBanner` component added to admin layout
- [ ] Firestore security rules updated and deployed
- [ ] All environment variables set in `.env.local` and in Firebase Hosting environment config

---

## Known Honest Limitations (Spark Plan)

| Feature | Status | Reason |
|---|---|---|
| Official Firestore read/write counts | ❌ Not available | Requires Firebase Billing API (Blaze only) |
| Firebase Hosting bandwidth (programmatic) | ❌ Not available | Requires GCP Billing API (Blaze only) |
| Firestore CPU & server-side query latency | ❌ Not available | Requires Cloud Monitoring API (GCP Console access) |
| App Check attestation stats (programmatic) | ❌ Not available | Requires backend/Cloud Function |
| Scheduled nightly compliance checks | ❌ Not available | Requires Cloud Functions (Blaze) |
| Read/write counters in this dashboard | ✅ Approximate | Client-side instrumented via `tracedCall` |
| All 7 modules | ✅ Fully functional | Within Spark constraints as described above |

> If you upgrade to Blaze in the future, the three items marked ❌ can be unlocked by adding Cloud Functions and the GCP Monitoring API — the rest of this architecture remains unchanged.
