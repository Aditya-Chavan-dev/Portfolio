# Admin Workflow Specification — Interactive Developer Portfolio
**Version:** 1.3  
**Status:** Draft — All Cross-Doc Conflicts Resolved, Push Notifications v1 Confirmed  
**Last Updated:** 2026-03-14  
**Depends on:** PRD v1.3  
**Author:** Portfolio Owner

---

## Table of Contents

1. [Overview](#1-overview)
2. [Authentication & Session Management](#2-authentication--session-management)
3. [Admin Panel Entry & Layout](#3-admin-panel-entry--layout)
4. [Edit Mode — How In-Place Editing Works](#4-edit-mode--how-in-place-editing-works)
5. [Draft System — Temporary Storage](#5-draft-system--temporary-storage)
6. [Deploy Flow — Review, Approve & Publish](#6-deploy-flow--review-approve--publish)
7. [Secret Question — Deploy Confirmation](#7-secret-question--deploy-confirmation)
8. [Live Site Update Banner — User Experience](#8-live-site-update-banner--user-experience)
9. [Rollback System](#9-rollback-system)
10. [Editing During a Rollback Window](#10-editing-during-a-rollback-window)
11. [Notifications & Reminders](#11-notifications--reminders)
12. [Audit Logging](#12-audit-logging)
13. [Security Rules & Constraints](#13-security-rules--constraints)
14. [Firestore Data Architecture](#14-firestore-data-architecture)
15. [Edge Cases & How Each Is Handled](#15-edge-cases--how-each-is-handled)
16. [Out of Scope for Admin v1](#16-out-of-scope-for-admin-v1)

---

## 1. Overview

The admin panel gives the portfolio owner the ability to **edit all visible text content on the live portfolio, review changes before publishing, and deploy with a single confirmed action** — without ever touching code or running a deployment pipeline.

The admin experience is built on four core principles:

1. **In-place editing** — the admin sees the portfolio exactly as visitors do, with edit controls layered on top. There is no separate form-based CMS dashboard.
2. **Draft-first, deploy intentionally** — all edits are saved to a Firestore draft before anything goes live. Nothing is published until the admin explicitly reviews and deploys.
3. **Selective deployment** — the admin can approve individual page changes and deploy only those, keeping unfinished edits in draft.
4. **Recoverable by design** — every deploy creates a snapshot, and the admin has an 8-hour window to roll back to the previous version with a single click.

### What the Admin Can Edit in v1
Text content only — any piece of text visible on the public portfolio:
- Hero: name, title, tagline, CTA button labels
- About Me: bio paragraph, key facts
- Work Experience: role titles, company names, durations, descriptions, tech tags
- Projects: names, descriptions, tech tags, links
- Skills: skill names, proficiency labels
- Testimonials: approve / reject submitted testimonials
- Contact: section heading, intro text
- Resume: upload a new PDF (file management, not text editing)

### What the Admin Cannot Edit in v1
- Images (profile photo, project screenshots) — v2
- Layout, colours, fonts, spacing — v2
- Component structure or section order — v2

---

## 2. Authentication & Session Management

### Login
- Route: `/admin` — not linked from anywhere on the public site.
- Method: **Email + password** via Firebase Authentication.
- Only one authorised email address is registered. No sign-up flow exists — the account is created once during initial setup.
- On successful login, the admin is taken directly into Edit Mode on the portfolio.

### Session Rules
- Session persists across page refreshes (Firebase Auth handles token refresh automatically).
- **Auto-logout after 30 minutes of inactivity.** A 2-minute warning toast appears before expiry: *"Your session will expire in 2 minutes due to inactivity."*
- On auto-logout, any unsaved in-progress field edits are written to Firestore drafts before the session is cleared, so no work is lost.
- Manually logging out clears the session immediately. Unsaved field edits are preserved in drafts.

### Concurrent Session Prevention
- Multiple devices can be logged in simultaneously and access read-only features (metrics, messages, testimonial review) without restriction.
- **Edit mode is exclusively locked** — only one active edit session is permitted at a time across all devices and surfaces (web admin + PWA).
- When a device enters edit mode (clicks "Edit This Page"), a `editSession` document is written to Firestore with the device identifier and timestamp. All other devices detect this lock via a real-time listener.
- If a second device attempts to enter edit mode while the lock is active, it is blocked with: *"An edit session is active on another device. End it there before editing here."*
- The active editing device receives a notification: *"Another device attempted to start an edit session."*
- The edit lock is released when the editing device exits edit mode, saves all drafts, or its session expires.
- This prevents two simultaneous edit sessions from creating conflicting drafts while allowing free read-only access across devices.

### Account Recovery
- If the admin forgets their password: standard Firebase "Forgot Password" email reset flow.
- This is separate from the deploy PIN recovery (covered in Section 7).

---

## 3. Admin Panel Entry & Layout

### What the Admin Sees
When logged in, the admin sees the **exact public portfolio** — same layout, same design, same content — with one difference: a persistent **Admin Control Bar** fixed at the top of the screen.

The Admin Control Bar contains:
- Left: "Admin Mode" label + current session indicator (green dot)
- Centre: Current page name being viewed (e.g., "Hero", "Projects")
- Right: "Edit This Page" button, "View Drafts" button, "Deploy" button, "Log Out" link

No sidebar. No dashboard. No separate CMS interface. The portfolio IS the editing interface.

### Navigation
The admin navigates between portfolio sections exactly as a visitor would — by scrolling or using the nav links. The Control Bar persists across all sections. Each section has its own "Edit This Page" scope.

### Draft Indicator
If a section has unsaved or undeployed draft changes, a subtle **amber dot** appears next to that section's nav link and on the Control Bar's "View Drafts" button showing the count: *"3 pages with drafts."*

---

## 4. Edit Mode — How In-Place Editing Works

### Entering Edit Mode
The admin clicks **"Edit This Page"** in the Control Bar while viewing any section. Edit mode activates for that section only.

What changes visually when edit mode is active for a section:
- All editable text elements on that section get a subtle **dashed blue outline** indicating they are clickable.
- The Control Bar centre changes to: *"Editing: Projects — unsaved changes"*
- "Edit This Page" button changes to **"Save This Page"** and **"Discard Changes"** buttons.
- A dim overlay appears on all OTHER sections to communicate that only the current section is in edit scope.

### Clicking an Editable Element
- The admin clicks any outlined text element (e.g., a project description).
- That element becomes an **inline contenteditable field** — the text is editable in-place, exactly where it sits on the page.
- No modal, no form, no separate panel. The text is edited directly on the portfolio layout.
- Character limits are enforced per field (defined in Section 14) with a live counter shown below the field.
- Pressing `Escape` cancels the edit on that field and restores the previous value.

### Saving a Page to Draft
- Admin clicks **"Save This Page"** in the Control Bar.
- All edited fields on that section are written to the `drafts` Firestore collection atomically.
- A success toast appears: *"Projects page saved to draft. Not yet live."*
- The amber draft indicator appears on the Projects nav link.
- Edit mode is exited. The portfolio resumes normal display with the **draft content now shown** (so the admin sees exactly what will go live, not the old live content).

### Discarding Changes
- Admin clicks **"Discard Changes"** before saving.
- A confirmation prompt appears: *"Discard all edits to this page? This cannot be undone."*
- If confirmed, all in-progress field edits are cleared and the section reverts to either the current draft (if one exists) or the current live content.

### Unsaved Changes Warning
- If the admin tries to scroll away, navigate to another section, or close the browser tab while edit mode is active and there are unsaved field edits, a browser-native warning appears: *"You have unsaved changes. Leave anyway?"*
- This is implemented via the `beforeunload` browser event.
- If they leave anyway, the in-progress field edits are lost. Saved drafts are never affected.

---

## 5. Draft System — Temporary Storage

### Where Drafts Live
All draft content is stored in a **`drafts` Firestore collection**, structured per section (see Section 14 for schema). Drafts persist across:
- Browser tab closes
- Browser crashes
- Device switches (admin can start editing on laptop, continue on phone)
- Session expiry (drafts are never cleared on logout)

### Draft Lifecycle
```
Field edited → "Save This Page" clicked → Written to drafts/
    ↓
Admin reviews drafts → Approves pages → Deploy confirmed
    ↓
Approved draft content written to live/ collection → Drafts cleared for deployed pages
    ↓
Unapproved pages remain in drafts/ untouched
```

### Draft Visibility
- Drafts are **only visible to the authenticated admin**. Firestore security rules deny all reads on the `drafts` collection to unauthenticated users.
- The public site reads exclusively from the `live` collection — it never touches `drafts`.
- The admin panel reads from `drafts` first (if a draft exists for a section), then falls back to `live`. This ensures the admin always sees their latest edits while previewing.

### Draft Conflicts
Since edit mode is exclusively locked to one device at a time via the `editSession/current` Firestore document (Section 2), draft conflicts between devices cannot occur. Only the device holding the edit lock can write to `drafts` — all other devices are blocked from entering edit mode until the lock is released. Each "Save This Page" action overwrites the previous draft for that section — there is no version branching within drafts.

---

## 6. Deploy Flow — Review, Approve & Publish

This is the most critical flow in the admin panel. It is intentionally multi-step to prevent accidental deploys.

### Step 1 — Initiate Deploy
Admin clicks **"Deploy"** in the Control Bar. This is only enabled if at least one page has a saved draft.

### Step 2 — Diff Review Screen
A full-screen review modal opens showing every page that has a draft. For each page:

```
┌─────────────────────────────────────────────────────┐
│  PROJECTS PAGE                           ✅ Approve  │
│  ─────────────────────────────────────────────────  │
│  Project: Portfolio Site                            │
│  BEFORE: "A personal site built with React"         │
│  AFTER:  "A CMS-driven portfolio built with React,  │
│           Firebase and Framer Motion"               │
│                                                     │
│  Project: Weather App                               │
│  BEFORE: "Displays weather data"                    │
│  AFTER:  "Real-time weather dashboard using         │
│           OpenWeather API and Chart.js"             │
└─────────────────────────────────────────────────────┘
```

- Every changed field is shown as a **before / after diff** — old text in red strikethrough, new text in green.
- Unchanged fields are not shown (only the delta).
- Each page has an individual **"Approve" toggle** (default: off). The admin must explicitly toggle each page on to include it in the deploy.
- A **"Approve All"** button is available for convenience.
- Pages that are not approved remain in drafts and are not deployed.

### Step 3 — Deploy Summary
After approving pages, a summary bar at the bottom of the modal shows:
*"Deploying 3 of 5 drafted pages. 2 pages will remain in draft."*

Admin clicks **"Confirm & Deploy"** to proceed to the secret question step.

### Step 4 — Secret Question (Section 7)

### Step 5 — Deploy Execution
On PIN success:
- Approved draft content is written to the `live` Firestore collection atomically (all approved pages in a single batch write — either all succeed or none do).
- A `snapshot` is created of the pre-deploy `live` content (Section 9).
- Approved pages are cleared from `drafts`.
- A deploy record is written to `auditLog`.
- The admin sees: *"Deployed successfully. Rollback available for the next 8 hours."*
- The rollback countdown timer starts.

### Partial Deploy Failure
If the batch write fails mid-way (network error, Firestore outage):
- The entire batch is rolled back by Firestore's atomic write guarantee.
- The live site remains unchanged.
- The admin sees: *"Deploy failed. Your drafts are safe. Try again."*
- No partial state is ever written to `live`.

---

## 7. Secret Question — Deploy Confirmation

### Concept
The secret question is a deceptive confirmation mechanism. The question appears straightforward and has an "obvious" answer — but the admin has set a completely different answer during onboarding. Only the admin knows the real answer.

**Example:**
> *Question: "What is 2 + 2?"*
> *Obvious answer: 4*
> *Admin's actual answer: "zero" (set during onboarding — anything the admin chooses)*

This works because the question itself is a red herring. An intruder who somehow reaches the deploy screen sees a question with an obvious answer — but the obvious answer is wrong.

### Setup (Onboarding)
During initial admin setup, the admin:
1. Writes their custom question (any string).
2. Types their secret answer (case-insensitive, trimmed of whitespace before comparison).
3. The answer is stored as a **bcrypt hash** in Firestore — the plaintext answer is never stored.

### Attempt Rules
- **3 attempts** allowed per deploy action.
- Each wrong attempt shows: *"Incorrect. X attempts remaining."*
- After 3 wrong attempts:
  - The deploy action is **cancelled** — drafts remain intact, nothing is deployed.
  - A **15-minute lockout** is enforced on the deploy action (edit mode still works normally).
  - An **email alert** is sent: *"3 failed deploy attempts at [timestamp]. If this wasn't you, your account may be compromised."*
  - The failed attempt is written to `auditLog`.

### Recovery Path (Forgot Answer)
If the admin forgets their secret answer:
- A **"Forgot my answer"** link appears after the first failed attempt.
- Clicking it triggers a **Google OAuth sign-in** using the admin's registered Google account.
- On successful Google sign-in, the deploy PIN lockout is lifted and the deploy proceeds without re-entering the answer.
- The admin is prompted immediately after to reset their secret question and answer.
- This recovery event is logged in `auditLog`.

### Changing the Secret Question
The admin can change the question and answer anytime from the Admin Settings page (accessible from the Control Bar). Requires the current answer to be verified before the new one is saved.

---

## 8. Live Site Update Banner — User Experience

### The Problem
When the admin deploys changes, visitors who are currently on the site are viewing stale content. A hard browser refresh would fix this, but it's jarring — it reloads the entire page, loses scroll position, and interrupts the visitor's reading flow.

### The Solution — Soft Content Update
The public site maintains a **Firestore real-time listener** on a `meta/lastDeployed` document that contains a timestamp. When the admin deploys, this timestamp is updated.

**Visitor experience on deploy:**
1. A non-intrusive banner slides down from the top of the page:
   *"✨ This portfolio was just updated. Click to load new content."*
2. The banner has a single **"Refresh"** button and a dismiss (×) button.
3. If the visitor clicks **"Refresh"**: the page content is hot-swapped via the Firestore listener — only changed data is re-fetched and re-rendered in place. The visitor's scroll position is preserved. No full page reload.
4. If the visitor clicks **×** (dismiss): the banner disappears. The visitor continues seeing the old content for their current session. No forced update.
5. If the visitor does nothing: the banner stays visible but does not auto-refresh. The visitor is never force-updated.

### Why Not Auto-Refresh?
Forcing a refresh mid-session on a recruiter who is reading project details is disruptive and could cost an application. The banner is informative, not coercive. The visitor is always in control.

### Banner Design Rules
- Appears at the top of the page, above the nav — not a modal, not a full overlay.
- Stays visible until dismissed or acted on.
- Does not appear more than once per deploy event per visitor.
- Does not show if the visitor landed after the deploy (they're already seeing new content).

---

## 9. Rollback System

### What a Snapshot Is
Before every deploy, the current `live` Firestore content is copied into a `snapshots/{deployId}` document. This snapshot is the "undo" point for that deploy.

### Rollback Window
- The admin has **8 hours** from the moment of deploy to roll back.
- A countdown is shown in the Control Bar: *"Rollback available: 5h 32m remaining."*
- After 8 hours, the rollback option disappears and the snapshot is archived (kept for reference but the rollback button is removed).

### How Rollback Works
1. Admin clicks **"Rollback"** in the Control Bar (visible only within the 8-hour window).
2. A confirmation screen shows: *"This will revert all content to the version before your last deploy. Continue?"*
3. The secret question is shown again for confirmation (same rules — 3 attempts, lockout on failure).
4. On confirmation: the snapshot content is written back to `live` atomically.
5. The rollback is **instantaneous from the visitor's perspective** — Firestore listeners on the public site pick up the change in real time.
6. The live site update banner appears for any active visitors (same mechanism as Section 8).
7. The rolled-back deploy is kept in `snapshots` as a **soft-deleted record** labelled *"Deploy #N — rolled back"* for audit reference.
8. A rollback event is written to `auditLog`.

### What Rollback Does NOT Do
- Rollback does not affect active drafts. Any drafts in progress are untouched.
- Rollback does not roll back resume file uploads (Firebase Storage files are not version-controlled in v1).
- Rollback only reverts text content in the `live` collection.

---

## 10. Editing During a Rollback Window

### The Scenario
The admin deployed v1 at 9:00am. The 8-hour rollback window for v1 is open until 5:00pm. At 11:00am, the admin wants to make more edits and deploy v2.

### The Rule
**Deploying v2 closes the v1 rollback window.** The new 8-hour window belongs to v2 only.

Rationale: deploying again is an implicit signal that v1 is acceptable as the base state. The v1 snapshot is retained in `snapshots` as a historical record but the rollback button no longer points to it.

### The Guard Rail
When the admin clicks "Deploy" while a rollback window is still active, the deploy flow shows a warning at the top of the diff review screen:

> *"⚠️ You deployed 2 hours ago. A rollback window for that deploy is still open (6h remaining). Deploying now will close that rollback window permanently. Your drafts will still be deployable — this only affects your ability to undo the previous deploy."*

The admin must check a checkbox: *"I understand the previous rollback window will close"* before the "Confirm & Deploy" button becomes active.

### Snapshot Stack
At any point, the last **3 deploy snapshots** are retained in Firestore:

```
snapshots/deploy-001  → archived (no rollback button, reference only)
snapshots/deploy-002  → archived (no rollback button, reference only)
snapshots/deploy-003  → ACTIVE rollback target (button visible for 8hrs)
```

Snapshots older than the last 3 are deleted automatically by a scheduled Cloud Function.

---

## 11. Notifications & Reminders

### 7-Hour Rollback Reminder
- Triggered by a Firebase Cloud Function scheduled 7 hours after every deploy.
- Sent via **both** channels simultaneously:
  - **Email** to the admin's registered email: *"Reminder: Your rollback window closes in 1 hour. Review your recent deploy and roll back if needed."*
  - **Push notification** to the admin's registered device(s) via FCM: same message. Full push notification implementation is specified in the Admin PWA App Spec v1.2 Section 10.
- If the admin has already rolled back before the 7-hour mark, the reminder is cancelled (Cloud Function checks rollback status before sending).

### Contact Form Submission Alert
- When a visitor submits the contact form, an email is sent to the admin via Firebase Cloud Function + Nodemailer.
- Email contains: visitor's name, email, subject, and message.
- Sent immediately on submission.

### Testimonial Submission Alert
- When a new testimonial is submitted via `/testimonial`, an email notification is sent to the admin.
- Email contains: submitter's name, relationship, and message.
- Admin can click a deep link in the email that takes them directly to the testimonials approval queue in the admin panel.

### Failed Deploy Attempt Alert
- Triggered immediately on the 3rd failed secret question attempt.
- Email subject: *"Security Alert — Failed Deploy Attempts on Your Portfolio"*
- Contains: timestamp, browser info (user agent), and a reminder to check account security.

### Session Expiry Warning
- In-app toast, 2 minutes before the 30-minute inactivity timeout.
- Moving the mouse or clicking any element resets the inactivity timer.

---

## 12. Audit Logging

Every significant admin action is written to a `auditLog` Firestore collection. The admin can view this log from the Admin Settings page.

### Logged Events

| Event | Data Recorded |
|---|---|
| Login success | Timestamp, device info |
| Login failure | Timestamp, device info |
| Concurrent login attempt blocked | Timestamp, device of new attempt |
| Page saved to draft | Timestamp, section name, fields changed |
| Draft discarded | Timestamp, section name |
| Deploy initiated | Timestamp, pages approved |
| Deploy success | Timestamp, deploy ID, pages deployed |
| Deploy failed (technical) | Timestamp, error details |
| Secret question — wrong attempt | Timestamp, attempt number |
| Secret question — lockout triggered | Timestamp |
| Google OAuth recovery used | Timestamp |
| Rollback initiated | Timestamp, deploy ID being rolled back |
| Rollback success | Timestamp |
| Rollback window expired | Timestamp, deploy ID |
| Session auto-expired | Timestamp |
| Testimonial approved | Timestamp, testimonial ID |
| Testimonial rejected | Timestamp, testimonial ID |
| Resume uploaded | Timestamp, file name |
| Secret question changed | Timestamp |

### Log Retention
- Logs are retained for **90 days** then automatically deleted by a scheduled Cloud Function.
- The admin cannot delete audit logs manually — they are append-only.

---

## 13. Security Rules & Constraints

### Firestore Security Rules Summary

```
/live/**              → Public READ allowed. Write: admin only (authenticated).
/drafts/**            → NO public read. Read + Write: admin only.
/snapshots/**         → NO public read. Read: admin only. Write: Cloud Functions only.
/auditLog/**          → NO public read. Read: admin only. Write: Cloud Functions only.
/testimonials/**      → Public WRITE (submit form). Read: admin only.
/contactMessages/**   → Public WRITE (submit form). Read: admin only.
/meta/**              → Public READ (lastDeployed timestamp only). Write: Cloud Functions only.
/analytics/**         → NO public read. Read: admin only. Write: Cloud Functions only.
/adminConfig/**       → NO public read. Read: admin only. Write: admin only (initial setup) + Cloud Functions (setupComplete flag).
/adminDevices/**      → NO public read. Read + Write: admin only (FCM token registration from authenticated client).
/adminNotifications/**→ NO public read. Read: admin only. Write: Cloud Functions only.
/editSession/**       → NO public read. Read: admin only. Write: admin only (edit lock acquire/release).
```

### Additional Security Constraints
- The `/admin` route is not linked from the public site's navigation or sitemap.
- `robots.txt` disallows crawling of `/admin`.
- All Cloud Functions validate Firebase Auth tokens before executing any write operations.
- The deploy PIN answer is stored as a bcrypt hash — never plaintext.
- Environment variables (Firebase config, email credentials) are stored in Firebase environment config — never in the client bundle.
- CORS on Cloud Functions is restricted to the portfolio's own domain.
- Contact form and testimonial form submissions are rate-limited: max 5 submissions per IP per hour via Cloud Function middleware.

---

## 14. Firestore Data Architecture

### Collections

```
/live/
  hero          → { name, title, tagline, ctaPrimary, ctaSecondary }
  about         → { bio, facts: [{ label, value }] }
  experience    → { items: [{ company, role, duration, description, tags }] }
  projects      → { items: [{ name, description, tags, githubUrl, liveUrl }] }
  skills        → { categories: [{ name, items: [{ name, level }] }] }
  contact       → { heading, intro }

/drafts/
  (same schema as /live — only sections with active drafts exist here)

/snapshots/
  {deployId}    → { timestamp, deployedBy, pages: { hero: {...}, about: {...}, ... }, status: "active"|"rolled-back"|"archived" }

/meta/
  lastDeployed  → { timestamp, deployId }

/analytics/
  daily         → { date: "YYYY-MM-DD", visits: 0, resumeDownloads: 0, resetAt: timestamp }
  weekly        → { days: [ { date: "YYYY-MM-DD", visits: 0 }, ... ] }  // last 7 daily entries, newest first

/testimonials/
  {id}          → { name, relationship, message, email, consent: true, status: "pending"|"approved"|"rejected", submittedAt }

/contactMessages/
  {id}          → { name, email, subject, message, submittedAt, read: false }

/auditLog/
  {id}          → { event, timestamp, details: {...} }

/adminConfig/
  auth          → { secretQuestion, secretAnswerHash, setupComplete: true }

/adminDevices/
  {tokenId}     → { fcmToken, registeredAt, lastSeen }

/adminNotifications/
  {id}          → { event, title, body, targetScreen, sentAt, read: false }

/editSession/
  current       → { deviceId, startedAt, surface: "web"|"pwa" }  // null if no active edit session
```

### Analytics Reset Logic
- **`analytics/daily`** resets to zero at **midnight IST** via a scheduled Firebase Cloud Function (`0 0 * * * Asia/Kolkata`). Before resetting, the Cloud Function appends the day's `visits` count to `analytics/weekly.days` and trims the array to the last 7 entries.
- **`analytics/weekly`** is never reset — it is a rolling 7-day window maintained by the daily reset function.
- Visit counts are incremented by a Cloud Function triggered on each portfolio page load. Resume downloads are incremented by a Cloud Function triggered on each Storage download event.
- Both documents are single aggregated records — not per-visit documents — to keep Firestore read counts minimal on the free tier.

### Character Limits Per Field

| Field | Limit |
|---|---|
| Hero name | 60 chars |
| Hero title | 80 chars |
| Hero tagline | 120 chars |
| About bio | 600 chars |
| Experience description (per role) | 400 chars |
| Project description | 300 chars |
| Skill name | 40 chars |
| Testimonial message | 300 chars |
| Contact intro | 200 chars |

---

## 15. Edge Cases & How Each Is Handled

| Edge Case | Handling |
|---|---|
| Admin closes browser mid-edit without saving | `beforeunload` warning fires. If ignored, in-progress field edits are lost. Saved drafts are always preserved. |
| Network drops during "Save to Draft" | Firestore SDK retries automatically. If it ultimately fails, a toast shows: *"Draft save failed. Check your connection and try again."* The field remains editable. |
| Network drops during Deploy batch write | Firestore atomic batch — either all pages write or none. Live site is never in a partial state. Admin sees a retry prompt. |
| Two deploy attempts in quick succession (double-click) | The "Confirm & Deploy" button is disabled immediately on first click and shows a spinner. Second click is ignored. |
| Admin deploys while rollback window is active | Warning shown in diff review screen. Admin must check acknowledgement checkbox before proceeding. Previous rollback window is closed on deploy. |
| Rollback attempted after 8-hour window expires | Rollback button is removed from the UI. Even if the API is called directly, a Cloud Function checks the timestamp and rejects the request. |
| Secret question answer forgotten | "Forgot my answer" link → Google OAuth flow → deploy proceeds → forced to reset question immediately after. |
| 3 wrong secret question attempts | Deploy cancelled. 15-min lockout. Email security alert sent. Drafts preserved. |
| Testimonial submitted with consent box unchecked | Form submission is blocked client-side. The submit button remains disabled until consent is checked. Cloud Function also validates consent server-side before writing to Firestore. |
| Admin approves zero pages and clicks deploy | "Confirm & Deploy" button is disabled. A message shows: *"Select at least one page to deploy."* |
| Visitor is mid-read when admin deploys | Soft banner appears. Visitor is never force-refreshed. Content only updates if they click the banner's Refresh button. |
| Admin session expires mid-edit | Fields are read-only. Toast: *"Session expired. Log in again to continue."* All saved drafts are intact. Unsaved field edits in the currently active contenteditable are lost. |
| Concurrent login attempt while session is active | Login is no longer blocked — multiple devices can be logged in simultaneously. Only edit mode is locked. If a second device tries to enter edit mode while another device holds the edit lock, it is blocked with a message: *"An edit session is active on another device."* The editing device receives an in-app alert. |
| Resume PDF upload fails | Error toast with retry option. Previous resume file is untouched in Firebase Storage. |
| Firestore `live` collection is empty (first-time setup) | Admin panel detects empty `live` collection and enters "Initial Setup Mode" — prompts admin to fill each section and deploy as the first publish. |

---

## 16. Out of Scope for Admin v1

- **Image editing** — profile photo, project screenshots, company logos. These are set during development and not editable from the admin panel in v1.
- **Section reordering** — the order of portfolio sections is fixed in v1.
- **Rich text formatting** — bold, italic, links within text fields. All text is plain text in v1.
- **Multi-admin access** — only one admin account exists. Team access is out of scope.
- **Deploy scheduling** — all deploys are immediate. Scheduled future deploys are v2.
- **A/B content testing** — one version of content only.
- **Analytics dashboard inside admin panel** — use Firebase Analytics or Google Analytics externally.
- **Bulk import** — importing experience or projects from LinkedIn or JSON. V2 consideration.

> **Note:** Push notifications (rollback reminders, contact alerts, testimonial alerts, security alerts) are **in scope for v1** and are fully specified in the Admin PWA App Spec v1.2. Email notifications serve as the fallback channel for all events.

---

*Related documents:*
- *PRD v1.3 — Interactive Developer Portfolio*
- *Admin PWA App Spec v1.2*
- *Next: Firestore Security Rules — Full Implementation Spec (to be written)*
