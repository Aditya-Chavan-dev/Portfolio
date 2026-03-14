# Admin PWA App Specification — Interactive Developer Portfolio
**Version:** 1.2  
**Status:** Draft — All Cross-Doc Conflicts Resolved, Fully Synced  
**Last Updated:** 2026-03-14  
**Depends on:** PRD v1.3, Admin Workflow Spec v1.3  
**Author:** Portfolio Owner

---

## Table of Contents

1. [Overview](#1-overview)
2. [Platform & Tech Stack](#2-platform--tech-stack)
3. [Authentication](#3-authentication)
4. [App Structure & Navigation](#4-app-structure--navigation)
5. [Home Screen — Metrics Dashboard](#5-home-screen--metrics-dashboard)
6. [Contact Messages Screen](#6-contact-messages-screen)
7. [Testimonials Screen](#7-testimonials-screen)
8. [Deploy & Rollback Screen](#8-deploy--rollback-screen)
9. [Edit Portfolio Flow](#9-edit-portfolio-flow)
10. [Push Notifications](#10-push-notifications)
11. [PWA Installation & Offline Behaviour](#11-pwa-installation--offline-behaviour)
12. [Real-Time Data Strategy](#12-real-time-data-strategy)
13. [Security Constraints](#13-security-constraints)
14. [Edge Cases & How Each Is Handled](#14-edge-cases--how-each-is-handled)
15. [Out of Scope for App v1](#15-out-of-scope-for-app-v1)

---

## 1. Overview

The Admin PWA is a **mobile-first, installable web application** that gives the portfolio owner a dedicated interface to:

- Monitor live portfolio metrics from anywhere — visitor count, contact messages, testimonial submissions, resume downloads.
- Receive push notifications for all critical events without opening the app.
- Approve or reject testimonials on the go.
- Read and mark contact messages as read.
- Initiate a portfolio edit session or execute a rollback — both of which follow the exact same workflow defined in the Admin Workflow Spec v1.3.

The PWA is **not a separate product** — it shares the same Firebase backend, Firestore collections, and authentication system as the web admin panel. It is the same admin, on a different surface.

### Two Access Points, One System

| Surface | Primary Use | URL |
|---|---|---|
| Web Admin (desktop) | Full editing sessions, detailed diff review, deploy | `yourportfolio.dev/admin` |
| Admin PWA (mobile + web) | Metrics monitoring, notifications, quick actions, edit on the go | `yourportfolio.dev/app` or installed as PWA |

Both surfaces can perform all actions. The PWA is optimised for mobile — larger tap targets, bottom navigation, thumb-friendly layout — but works identically on desktop via the browser.

---

## 2. Platform & Tech Stack

### Platform
- **Primary:** Android (installed as PWA via Chrome "Add to Home Screen")
- **Secondary:** Any modern browser on any device — the same URL works as a responsive web app without installation

### Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Framework | React (same codebase as portfolio) | No new framework to learn or maintain |
| PWA Layer | Vite PWA Plugin (vite-plugin-pwa) | Service worker + manifest generation |
| Styling | Tailwind CSS | Consistent with portfolio codebase |
| Realtime data | Firebase Firestore (onSnapshot listeners) | Same as portfolio backend |
| Auth | Firebase Authentication | Same credentials as web admin |
| Push notifications | Firebase Cloud Messaging (FCM) | Native Android push support via PWA |
| Charts / metrics | Recharts | Lightweight, React-native charting |
| Hosting | Firebase Hosting | Same host as portfolio, separate route |

### PWA Manifest Requirements
- `display: standalone` — app opens without browser chrome (address bar hidden)
- `theme_color` — matches portfolio brand colour
- `background_color` — matches app loading screen
- App icon: 192×192 and 512×512 PNG (admin-specific icon, visually distinct from portfolio favicon)
- `start_url: /app` — opens directly to the app home screen, not the portfolio

### Service Worker Strategy
- **Network-first** for all Firestore data (always fetch live, fall back to cache)
- **Cache-first** for static assets (JS, CSS, icons)
- **No caching** for auth state — always verified against Firebase on load

---

## 3. Authentication

### Login Flow
- The app opens at `/app/login` for unauthenticated users.
- Login form: Email + Password — identical credentials to the web admin panel.
- Firebase Authentication handles the session. The same Firebase Auth token works across both the web admin and the PWA — logging in on one does not log out the other.
- On successful login, the admin is taken to the Home Screen (metrics dashboard).

### Session Behaviour on Mobile
- Firebase Auth persists the session in IndexedDB — the admin stays logged in even after closing the app or restarting the phone.
- **No automatic logout on mobile** — the 30-minute inactivity timeout that applies to the web admin panel does NOT apply to the PWA. Rationale: mobile users lock their screen frequently; an inactivity timeout would require re-login constantly, which is friction without meaningful security gain on a personal device.
- Manual logout is available from the app's Settings screen.
- If the Firebase token expires (after 1 hour of no network), Firebase silently refreshes it in the background when connectivity resumes. No re-login required.

### Concurrent Session Rule
Multiple devices can be logged in simultaneously and access all read-only features — metrics, messages, testimonials — without any restriction. The session lock only applies to **edit mode**. When one device enters edit mode, a lock is written to `editSession/current` in Firestore. All other devices detect this via a real-time listener and their "Edit Portfolio" button is disabled with the message: *"An edit session is active on another device."* The lock releases when the editing device exits edit mode or its session expires.

### First Launch & Onboarding State
When the admin opens the PWA for the very first time — before any portfolio content has been deployed and before the secret question has been configured — the app detects an incomplete setup state by checking `adminConfig/auth.setupComplete` in Firestore.

If `setupComplete` is `false` or the document does not exist, the app enters **Setup Pending Mode**:
- The Home screen shows a full-screen prompt: *"Complete setup on the web admin panel first. Open your portfolio's `/admin` route on a desktop browser to configure your secret question and publish your initial content."*
- All metric cards show `—` (dash) placeholders.
- The Messages, Testimonials, and Deploy tabs are visible but show empty states with the same setup prompt.
- The Edit Portfolio button is disabled with the label: *"Setup required — complete on web admin first."*
- Push notification registration is deferred until setup is complete.

Once `adminConfig/auth.setupComplete` is set to `true` (written by the web admin on first deploy), the PWA detects the change via its real-time Firestore listener and exits Setup Pending Mode automatically — no app restart required.

---

## 4. App Structure & Navigation

### Navigation Pattern
Bottom tab bar with 4 tabs — always visible, thumb-accessible.

```
┌─────────────────────────────────────┐
│                                     │
│         [Screen Content]            │
│                                     │
│                                     │
├─────────────────────────────────────┤
│  🏠 Home  │ 💬 Messages │ 🌟 Testimonials │ ⚙️ More  │
└─────────────────────────────────────┘
```

| Tab | Screen | Badge |
|---|---|---|
| 🏠 Home | Metrics dashboard | Rollback timer indicator if active |
| 💬 Messages | Contact form submissions | Unread count |
| 🌟 Testimonials | Pending approvals + approved list | Pending count |
| ⚙️ More | Deploy, Edit Portfolio, Settings, Logout | Draft count badge if drafts exist |

### More Tab — Screen Layout
The More tab is a simple vertical menu list with the following items in order:

- **Review & Deploy** — navigates to the Deploy & Rollback screen. Shows a draft count badge (e.g. "3 drafts") if any pages have saved drafts.
- **Edit Portfolio** — enters the in-place edit flow.
- **Settings** — navigates to the Settings screen (see below).
- **Log Out** — logs the admin out immediately. Read-only sessions on other devices are unaffected.

### Settings Screen
The Settings screen contains:
- **Notifications** — toggle per-event notification preferences (contact messages, testimonials, rollback reminder, security alerts, visitor spike). Each toggle is on by default.
- **Visitor Spike Threshold** — number input to set the live visitor count that triggers a spike notification. Default: 3. Range: 1–50.
- **Change Secret Question** — navigates to a form to update the secret question and answer. Requires the current answer to be verified first.
- **Notification History** — a chronological list of the last 30 notifications sent, each showing title, body, and timestamp. Tapping a notification navigates to its target screen.
- **Audit Log** — a read-only list of the last 50 audit events pulled from `auditLog` in Firestore. Shows event name, timestamp, and details. No editing or deletion allowed.
- **App Version** — displays the current PWA version string.
- **Open Web Admin** — a link that opens `yourportfolio.dev/admin` in the device browser for actions that are easier on desktop.

### Header
Each screen has a simple top header with:
- Screen title (left)
- Notification bell icon (right) — tapping opens the notification history list in Settings

### Skeleton Loading States
Every screen that fetches data shows skeleton placeholder UI during the initial load — not a blank screen or a spinner. This is critical for a PWA that opens from the Android home screen with no browser chrome, where a blank flash looks like a crash.

- **Home screen** — four metric cards render as grey shimmer rectangles. The chart area shows a single shimmer block. The status strip shows a single shimmer line.
- **Messages screen** — three shimmer list items (name + subject line + timestamp placeholders).
- **Testimonials screen** — two shimmer cards per tab.
- **Deploy screen** — shimmer for the draft count and deploy history list.

Skeleton states are shown for a maximum of 3 seconds. If data has not loaded within 3 seconds, skeletons are replaced with an error state: *"Couldn't load data. Check your connection and pull down to retry."*

---

## 5. Home Screen — Metrics Dashboard

The home screen is a live metrics dashboard. All values update in real time via Firestore listeners — no pull-to-refresh needed.

### Metric Cards (Top Section)
Four cards arranged in a 2×2 grid:

```
┌─────────────────┬─────────────────┐
│  👁 Live Now     │  📈 Today        │
│      12          │      47          │
│  visitors        │  visits          │
├─────────────────┼─────────────────┤
│  📄 Resumes      │  💬 Messages     │
│       8          │       3          │
│  downloaded      │  unread          │
└─────────────────┴─────────────────┘
```

**Live Now** — current active visitors on the portfolio. Powered by Firebase Realtime Database presence tracking (Firestore is not suitable for presence — RTDB is used specifically for this metric). Updates in real time.

**Today** — total unique sessions today. Sourced from a `analytics/daily` Firestore document updated by a Cloud Function on each visit.

**Resumes Downloaded** — total resume PDF downloads today. Sourced from a `analytics/daily` Firestore document incremented by a Cloud Function on each download.

**Messages Unread** — count of contact form submissions with `read: false` in the `contactMessages` collection.

### Visitor Trend Chart (Middle Section)
A simple line chart showing visitor count over the **last 7 days**. Data sourced from `analytics/weekly` Firestore document. Built with Recharts. Tapping a data point shows the exact count for that day in a tooltip.

If fewer than 3 daily data points exist (e.g. the portfolio launched recently), the chart is replaced with a placeholder state:
```
📊 Not enough data yet
Check back in a few days — your visitor trend
will appear here once data starts building up.
```
This prevents a near-empty chart from looking broken in the first week after launch.

### Status Strip (Bottom of Home Screen)
A contextual status strip that shows the most time-sensitive piece of information:

- **If rollback window is active:**
  ```
  🔄 Rollback available — 5h 32m remaining   [Rollback →]
  ```
  Tapping "Rollback →" navigates to the Deploy & Rollback screen.

- **If no rollback window is active:**
  ```
  ✅ Last deployed: Today at 2:34 PM
  ```

- **If there are pending testimonials:**
  ```
  ⭐ 3 testimonials awaiting your approval   [Review →]
  ```
  If both rollback and pending testimonials exist, rollback takes priority (more time-sensitive).

### Live Visitor Spike Alert
If live visitor count crosses the **spike threshold** (default: 3, configurable in Settings → Visitor Spike Threshold), an in-app banner appears at the top of the home screen:
```
🔥 5 people are viewing your portfolio right now
```
This banner auto-dismisses when the count drops below the threshold. The default is set to 3 rather than a higher number — for a fresher portfolio that has just launched, even 3–5 simultaneous visitors is a meaningful signal worth knowing about.

---

## 6. Contact Messages Screen

### Message List
- Chronological list of all contact form submissions, newest first.
- Each list item shows: sender name, subject, time received, and a preview of the first line of the message.
- Unread messages have a blue left border and bold name. Read messages are visually subdued.
- Tapping a message opens the full message detail view.

### Message Detail View
Displays:
- Sender name and email (tapping email opens the device's default mail app with the address pre-filled — one tap to reply)
- Subject
- Full message body
- Timestamp
- "Mark as Read" button (primary action — always visible)
- "Reply via Email" button (opens mail app)

Auto-mark as read is triggered only if **both** conditions are met: the admin has been on the detail screen for at least 5 seconds AND has scrolled past the first line of the message body. This prevents accidental read-marking when the admin opens a message by mistake and immediately swipes back. If neither condition is met, the message remains unread until the admin taps "Mark as Read" manually.

### Bulk Actions
Long-pressing a message in the list enters selection mode. The admin can select multiple messages and mark all as read at once.

### Empty State
If no messages exist: *"No messages yet. When recruiters reach out via your portfolio, they'll appear here."*

---

## 7. Testimonials Screen

### Two Tabs Within This Screen
- **Pending** — submissions awaiting approval
- **Approved** — live testimonials currently shown on the portfolio

### Pending Tab
Each pending testimonial card shows:
- Submitter name and relationship (e.g., "Hackathon teammate")
- Full message
- Submission timestamp
- Two action buttons: **Approve** (green) and **Reject** (red)

On **Approve:**
- Firestore `testimonials/{id}` status is updated to `approved` — the testimonial goes live on the portfolio immediately.
- The card moves to the Approved tab with a smooth animation.
- Toast: *"Testimonial approved and now live."*

On **Reject:**
- A confirmation bottom sheet appears: *"Reject this testimonial? It will be hidden but not deleted."*
- On confirm: status updated to `rejected`. Card is removed from the pending list.
- Toast: *"Testimonial rejected."*

### Approved Tab
- List of all live testimonials with name, relationship, message, and approval date.
- Each card has a **"Remove from site"** button — sets status back to `pending` (not deleted, can be re-approved later).
- No permanent deletion in v1 — all testimonials are soft-managed via status field.

### Empty States
- Pending empty: *"No pending testimonials. Share your testimonial link to collect some."* with a copy-link button for `yourportfolio.dev/testimonial`.
- Approved empty: *"No approved testimonials yet."*

---

## 8. Deploy & Rollback Screen

Accessible from the **More** tab → "Deploy & Rollback."

### Deploy Section
- Shows count of pages with active drafts: *"3 pages have unsaved drafts."*
- **"Review & Deploy"** button — tapping this launches the full deploy flow from the Admin Workflow Spec (diff review → per-page approval → secret question → deploy). This flow is rendered as a series of full-screen modal steps optimised for mobile (large tap targets, scrollable diff view per page).
- If no drafts exist: button is disabled with label *"No drafts to deploy."*

### Rollback Section
Only visible if a rollback window is currently active.

```
┌─────────────────────────────────────────┐
│  🔄 Rollback Available                  │
│  Last deployed: Today at 2:34 PM        │
│  Window closes in: 05:32:14             │
│                                         │
│  [  Roll Back to Previous Version  ]    │
└─────────────────────────────────────────┘
```

- The countdown timer ticks in real time.
- Tapping **"Roll Back to Previous Version"** opens the rollback confirmation flow: confirmation screen → secret question → rollback executed.
- After the 8-hour window expires, this section is replaced with: *"Rollback window expired. Last deploy: Today at 2:34 PM."*

### Deploy History
A simple list of the last 3 deploys:
- Deploy timestamp
- Pages deployed
- Status: `live`, `rolled-back`, or `archived`

---

## 9. Edit Portfolio Flow

Accessible from the **More** tab → "Edit Portfolio."

### What Happens When Tapped
The admin is taken to a **mobile-optimised version of the portfolio** with the Admin Control Bar rendered at the top — exactly as described in the Admin Workflow Spec Section 3.

The entire edit flow — Edit This Page → inline contenteditable fields → Save to Draft → Deploy → Secret Question — works identically to the web admin panel. No separate mobile editing logic. The same React components, the same Firestore draft system, the same deploy pipeline.

### Mobile-Specific Adaptations
The following UI adjustments are made when the edit flow is accessed from a mobile viewport:

- The Admin Control Bar stacks vertically on small screens — "Edit This Page" and "Save This Page" buttons are full-width for easy tapping.
- Inline contenteditable fields show a **mobile keyboard-friendly toolbar** above the keyboard with: Done (saves the field), Cancel (discards the field edit), and a character counter.
- The diff review screen (pre-deploy) renders each page diff as a vertically scrollable card — one page at a time, with swipe navigation between pages.
- The secret question input is a standard text field with `autocomplete="off"`, `autocorrect="off"`, `autocapitalize="none"`, and `spellcheck="false"` — prevents the keyboard from suggesting, replacing, or silently capitalising the secret answer, which would cause every first attempt to fail.

### Unsaved Changes on App Backgrounding
If the admin backgrounds the app (presses home button) mid-edit with unsaved field edits, the app detects the `visibilitychange` event and auto-saves the current field to a temporary `sessionDraft` in localStorage. When the app is foregrounded again, the field is restored. This is in addition to the standard "Save This Page → Firestore drafts" flow.

---

## 10. Push Notifications

Push notifications are delivered via **Firebase Cloud Messaging (FCM)**. The PWA registers a service worker that listens for FCM messages and displays them as native Android notifications even when the app is closed.

### Notification Permission
On first app load after login, the app requests notification permission with a contextual prompt:
*"Enable notifications to get alerts for new messages, testimonials, and deploy reminders."*

If the admin denies permission, all notification features degrade gracefully — in-app badges and indicators still work, but no system notifications are sent.

### Notification Events & Content

| Event | Notification Title | Body | Tap Action |
|---|---|---|---|
| New contact form message | 💬 New Message | "{Name} sent you a message: {subject}" | Opens Messages screen → message detail |
| New testimonial submitted | ⭐ New Testimonial | "{Name} ({relationship}) left a testimonial" | Opens Testimonials → Pending tab |
| Rollback reminder (7hr mark) | 🔄 Rollback Reminder | "Your rollback window closes in 1 hour. Review your last deploy." | Opens Deploy & Rollback screen |
| Deploy success | ✅ Deploy Successful | "{N} pages are now live on your portfolio" | Opens Deploy & Rollback screen |
| Failed deploy attempt | 🚨 Security Alert | "3 failed deploy attempts detected. Tap to review." | Opens Audit Log in Settings |
| Live visitor spike (threshold crossed) | 🔥 Portfolio Traffic | "{N} people are viewing your portfolio right now" | Opens Home screen |

### Notification Behaviour Rules
- **Rollback reminder** is cancelled automatically if the admin has already rolled back or the window has expired before the 7-hour mark.
- **Visitor spike** notifications are rate-limited — maximum one per hour regardless of how many times the count crosses the threshold. Prevents spam if traffic fluctuates around the threshold. The threshold value is read from the admin's Settings preference (default: 3).
- **Contact and testimonial** notifications are sent once per submission — no repeat alerts for the same item.
- All notifications are stored in a **notification history list** accessible via the bell icon in the app header. The last 30 notifications are retained.

---

## 11. PWA Installation & Offline Behaviour

### Installation (Android Chrome)
1. Admin visits `yourportfolio.dev/app` in Chrome on Android.
2. After the second visit (or via the manual menu), Chrome shows the "Add to Home Screen" prompt.
3. Admin taps "Add" — the PWA is installed with its own icon, splash screen, and standalone window.
4. The installed app opens directly to `/app` with no browser address bar.

### Splash Screen
- Background: matches app `background_color` in manifest.
- Centred app icon (512×512).
- Shown for ~1 second while the service worker and Firebase Auth initialise.

### Offline Behaviour
The app has **limited offline functionality** by design — meaningful metrics require a live connection.

| Feature | Offline Behaviour |
|---|---|
| Home screen metrics | Shows last cached values with a *"Last updated: X minutes ago"* label and an offline banner |
| Contact messages list | Shows cached messages from last session |
| Testimonials list | Shows cached approved testimonials |
| Edit Portfolio | Blocked — a banner shows: *"Editing requires an internet connection."* |
| Deploy / Rollback | Blocked — same banner |
| Push notifications | Queued by FCM — delivered when connection resumes |

A persistent **"You're offline"** banner is shown at the top of every screen when there is no network connection.

---

## 12. Real-Time Data Strategy

All metrics and content on the app update in real time via Firestore `onSnapshot` listeners. Here is exactly what each screen listens to:

| Screen | Firestore Listener | Update Trigger |
|---|---|---|
| Home — Live Now | Firebase RTDB `/presence` | Every visitor connect / disconnect |
| Home — Today visits | `analytics/daily` document | Cloud Function on each visit |
| Home — Resume downloads | `analytics/daily` document | Cloud Function on each download |
| Home — Unread messages | `contactMessages` where `read == false`, count | On each new submission or read action |
| Home — Rollback timer | `meta/lastDeployed` document | On each deploy |
| Home — Pending testimonials | `testimonials` where `status == pending`, count | On each new submission or approval |
| Home — Edit lock indicator | `editSession/current` document | On each edit mode enter / exit |
| Messages screen | `contactMessages` collection, ordered by time | On each new message or read update |
| Testimonials screen | `testimonials` collection, ordered by status + time | On each approval / rejection / new submission |
| Deploy screen | `drafts` collection, page count | On each draft save or deploy |
| Settings — Notification history | `adminNotifications` collection, last 30 by sentAt | On each new notification sent by Cloud Function |
| Settings — Audit log | `auditLog` collection, last 50 by timestamp | On each new audit event |

### Listener Lifecycle
- Listeners are attached when their screen is mounted and detached when the screen is unmounted (React `useEffect` cleanup).
- The Home screen listener stays active as long as the app is in the foreground — it is the always-on metrics view.
- When the app is backgrounded, all Firestore listeners are detached to conserve battery and data. They are re-attached when the app is foregrounded.

### Firestore Cost Consideration
On the free Spark plan, Firestore allows 50,000 reads/day. With real-time listeners, each document update counts as one read per connected client. For a single admin user checking metrics throughout the day, this is well within the free tier. The analytics documents are designed as single aggregated documents (not per-visit documents) to minimise read counts.

---

## 13. Security Constraints

All security rules from the Admin Workflow Spec apply without exception. App-specific additions:

- The PWA at `/app` is not linked from the public portfolio site or sitemap.
- `robots.txt` disallows crawling of `/app`.
- The FCM device token is stored in a `adminDevices/{tokenId}` Firestore collection with write access restricted to authenticated admin only. Cloud Functions use this token to send targeted push notifications — the token is never exposed to the public site.
- Push notification payloads never contain sensitive data (no message content in the notification payload itself — the app fetches the full message from Firestore when the notification is tapped).
- Service worker scope is restricted to `/app` — it does not intercept requests for the public portfolio.
- All Firestore reads from the app go through the same security rules as the web admin. There are no relaxed rules for the PWA.

---

## 14. Edge Cases & How Each Is Handled

| Edge Case | Handling |
|---|---|
| Admin denies push notification permission | All in-app badges and indicators still work normally. A soft prompt appears once per week in Settings: *"Enable notifications to get real-time alerts."* Never forced. |
| FCM token expires or rotates | Firebase SDK auto-refreshes the FCM token. A Cloud Function listener on token refresh updates `adminDevices/{tokenId}` automatically. |
| App backgrounded mid-edit with unsaved field | `visibilitychange` event triggers auto-save of current field to localStorage `sessionDraft`. Restored on foreground. |
| Visitor spike notification received while already on home screen | In-app banner shown. System notification is suppressed — no need to notify when the admin is already watching the metric live. |
| Edit Portfolio tapped while another device holds the edit lock | Button is disabled. Message: *"An edit session is active on another device. End it there before editing here."* The lock status is read from `editSession/current` in real time. |
| Deploy initiated from app while another device holds the edit lock | Deploy is blocked with the same message. Admin cannot deploy while an edit session is open on another device — unsaved changes could overwrite the draft being reviewed. |
| Rollback timer reaches zero while admin is on the Deploy screen | The rollback section animates out and is replaced with the expired state. No action required from the admin. |
| App opened via notification tap while logged out | The app stores the notification's target screen in sessionStorage. After login completes, the admin is deep-linked to the intended screen. |
| Network drops during testimonial approval | Firestore SDK queues the write and retries when connectivity resumes. The UI shows an optimistic update (card moves to Approved tab) with a subtle syncing indicator. If the write ultimately fails, the card is moved back to Pending with an error toast. |
| Live Now count shows stale data after network drop | Firebase RTDB presence tracking detects disconnection and zeroes out the presence entry after a heartbeat timeout (~60 seconds). The displayed count corrects itself automatically. |
| Admin installs PWA on a second Android device | Both devices share the same Firebase Auth session. Both receive push notifications. Both can view metrics simultaneously. Edit mode lock applies if either device initiates editing. |
| Admin opens app before completing first-time setup on web admin | App enters Setup Pending Mode — all editing and deploy features are disabled. Metric cards show dash placeholders. A prompt directs the admin to complete setup at `/admin` on desktop. The app exits this mode automatically once `adminConfig/auth.setupComplete` is detected as `true`. |
| Admin opens message detail and immediately swipes back | Message remains unread. Auto-mark only fires after 5 seconds on screen AND scroll past first line. Manual "Mark as Read" button is always available. |
| Portfolio launched recently — fewer than 3 days of analytics data | Visitor trend chart is replaced with a "Not enough data yet" placeholder. Metric cards still show today's real counts. |
| Spike threshold set to 1 and admin is the only visitor | Cloud Function checks if the presence count change was caused by a known admin session before sending a spike notification. If the only visitor is the admin themselves (identified via auth token in RTDB presence record), the spike notification is suppressed. |

---

## 15. Out of Scope for App v1

- **iOS support** — PWA push notifications on iOS require iOS 16.4+ and have significant limitations. iOS support is deferred to v2 once the Android experience is validated.
- **Biometric / PIN app lock** — the app uses Firebase Auth session persistence. A biometric lock layer over the app (separate from Firebase Auth) is a v2 security enhancement.
- **Analytics charts beyond 7-day visitor trend** — deeper analytics (traffic sources, geography, session duration) are deferred to v2, likely powered by Google Analytics rather than custom Firestore tracking.
- **Editing images from the app** — in-app image upload and replacement is v2 (depends on image editing being added to the admin panel first).
- **Multiple device management** — the `adminDevices` collection supports multiple FCM tokens but there is no UI to manage or remove registered devices in v1.
- **Scheduled deploys** — deploying at a future time is v2.
- **Dark mode for the app** — the app respects the system `prefers-color-scheme` media query but a manual toggle within the app is v2.

---

*Related documents:*
- *PRD v1.3 — Interactive Developer Portfolio*
- *Admin Workflow Spec v1.3*
- *Next: Firestore Security Rules — Full Implementation Spec (to be written)*
