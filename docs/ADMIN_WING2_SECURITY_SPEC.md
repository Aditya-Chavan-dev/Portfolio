# Admin OS — Deep Dive: Wing 2 & Security

This document outlines the detailed capabilities, architecture, and exact functions of **Wing 2 (Health & Monitoring OS)** and the underlying **Security Model** of your portfolio.

---

## Part 1: Wing 2 — The Health & Monitoring OS

Wing 2 is designed to be the operational command center of your portfolio. While Wing 1 controls the *data*, Wing 2 monitors the *system*. It proves to technical visitors and recruiters that you understand production telemetry, observability, and devops principles.

Based on the existing `src/admin` files and the PRD, Wing 2 is composed of **five specialised telemetry panels**, orchestrated by `MetricsOrchestrator.ts` and visualised in `MetricsDashboard.tsx`.

### 1. Pulse Panel (`PulsePanel.tsx`)
**Purpose:** Heartbeat and Uptime Monitoring.
- **API Health Checks:** Monitors the up/down status of any Cloud Functions or external API endpoints your portfolio hits.
- **Latency Tracking:** Measures average response times (in milliseconds) for API requests and Firestore queries (`P50` and `P95` latency).
- **Error Rates:** Tracks the percentage of failed requests (4xx and 5xx errors) over a rolling 24-hour window.
- **Component Render Health:** Monitors the React frontend's First Contentful Paint (FCP) and Time to Interactive (TTI) metrics, proving you care about Core Web Vitals.

### 2. Time Machine (`TimeMachinePanel.tsx` & `SnapshotService.ts`)
**Purpose:** Version Control & Atomic Rollbacks for Content.
- **Snapshot Creation:** Before you make a massive edit to your projects or bio, you can capture the exact current state of your Firestore database. The `SnapshotService` copies the production content into a timestamped, locked archive.
- **Live Restore:** If an edit breaks the site or looks wrong on production, you can browse past snapshots and click "Restore". This overwrites the live Firestore data with the snapshot, meaning your public site reverts to the old state in under 1 second without a Git rollback or a redeploy.

### 3. Hive Panel (`HivePanel.tsx`)
**Purpose:** Traffic and User Presence.
- **Live Visitor Count:** Utilizes the Firebase Realtime Database "Presence" pattern to show exactly how many people are looking at your portfolio *right now*.
- **Traffic Spikes:** Graphing incoming requests per minute (RPM).
- **Concurrent Connections:** Monitoring how many active connections are currently hitting your Firestore instance to ensure you stay within the free-tier connection limits.

### 4. Engine Panel (`EnginePanel.tsx` & `EngineService.ts`)
**Purpose:** Infrastructure and Resource Utilization.
- **Cloud Function Execution:** Tracks the total invocations and execution duration of your serverless logic (like the Contact Form mailer or Testimonial rate-limiter).
- **Database Load:** Monitors Firestore Read, Write, and Delete quotas so you can see your billing tier status visually.

### 5. Quality Panel (`QualityPanel.tsx` & `SpellCheckerService.ts`)
**Purpose:** Output Integrity.
- **Link Auditing:** Checks all dynamic links in your project showcase to ensure none of them return a 404.
- **Spell Check:** The `SpellCheckerService` scans text changes for critical typos before they are saved to the public database.

---

## Part 2: The Security Model

Because the Admin OS shares the same domain as the public portfolio, the security boundary must be absolute. The following controls ensure no recruiter, bot, or malicious user can access your CMS or Monitoring tools.

### 1. Authentication & Authorization (`AdminLogin.tsx` & `AuthProvider.tsx`)
- **Single-User Whitelist:** The system does not allow sign-ups. Authentication is firmly restricted to the owner's specific email address.
- **Firebase Auth (JWT):** The frontend relies on secure JSON Web Tokens. Access to `/admin` routes requires a valid, unexpired token.
- **Inactivity Lifecycle (`useInactivityLogout.ts`):** If the owner leaves the admin panel open and stops moving the mouse or typing for a set threshold (e.g., 15 minutes), the session is aggressively terminated to prevent unauthorized physical access.

### 2. The Shield Panel (`ShieldPanel.tsx`)
This is a dedicated panel inside Wing 2 that visualizes active security threats:
- **Auth Attempts:** Logs failed login attempts to detect brute-force bots guessing the admin URL.
- **Rate Limit Triggers:** Shows how many times the Contact Form or Testimonial API has temporarily blocked an IP address for spamming.
- **Anomalies:** Flags unexpected spikes in Firestore reads that might indicate a bot scraping the database.

### 3. Database Rules (`firestore.rules` & `database.rules.json`)
The ultimate line of defense. Even if someone bypassed the React frontend routing, they cannot touch the data.
- **Public Sandbox:** The public can only `read` specific collections (like approved projects, timeline, and approved testimonials) and can only `write` to pending queues (like contact form submits).
- **Admin Root:** Only a user whose `request.auth.uid` matches your specific admin UUID can execute deep `write`, `update`, or `delete` operations on the live content or snapshot archives.

### 4. Client-Side Guards
- **Edit Session Locking (`useEditSessionLock.ts`):** Prevents concurrent or conflicting background edits.
- **Unlisted Routes:** The `/admin` routes are lazy-loaded and omitted from the public `sitemap.xml` and standard React Router public paths. They are only fetched if a user deliberately navigates to the exact URL.
