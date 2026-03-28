# PRD — Interactive Developer Portfolio with Admin OS
**Version:** 2.0
**Status:** Draft — Admin Panel Fully Specced, Open Questions Flagged
**Last Updated:** 2026-03-28

---

## Table of Contents

1. [Overview](#1-overview)
2. [Problem Statement & Goals](#2-problem-statement--goals)
3. [User Personas & Stories](#3-user-personas--stories)
4. [Functional Requirements](#4-functional-requirements)
   - 4.1 Public Portfolio
   - 4.2 Admin Panel — Wing 1: Headless CMS
   - 4.3 Admin Panel — Wing 2: Health & Monitoring OS
   - 4.4 Testimonial Submission Flow
   - 4.5 Global UX
5. [Non-Functional Requirements & Tech Stack](#5-non-functional-requirements--tech-stack)
6. [Architecture Decision](#6-architecture-decision)
7. [Open Questions](#7-open-questions)
8. [Out of Scope — v1](#8-out-of-scope--v1)
9. [Success Metrics & KPIs](#9-success-metrics--kpis)
10. [Timeline & Milestones](#10-timeline--milestones)

---

## 1. Overview

This document defines the full requirements for a **fully interactive, CMS-driven developer portfolio** — a digital resume that narrates the owner's professional journey in a visually engaging, recruiter-friendly experience, backed by a powerful admin panel that doubles as a live demonstration of devops and system awareness.

The product has two surfaces:

| Surface | Audience | Purpose |
|---|---|---|
| **Public Portfolio** | Recruiters, hiring managers, anyone with the link | Communicate skills, projects, and professional arc. Convert a scan into a conversation. |
| **Admin Panel** | Owner only (authenticated) | Control all public content without touching code. Monitor system health. Prove operational maturity to technical evaluators. |

---

## 2. Problem Statement & Goals

### Problem Statement

Traditional resumes and static portfolio sites fail to communicate the depth of a developer's skills, personality, and professional arc. Recruiters spend an average of 6–10 seconds scanning a resume. A compelling interactive experience demands attention, builds trust, and converts that scan into a conversation.

For a fresher developer, there is an additional challenge: no work experience to speak of. The portfolio must compensate by making projects undeniable, making the design itself a proof point, and making it trivially easy for a recruiter to take the next step.

### Primary Goals

- Present the owner's full professional journey — projects, skills, experience — in an interactive, story-driven format.
- Give recruiters a clear, confusion-free path from landing to contact.
- Demonstrate frontend craftsmanship, backend integration, devops awareness, and UI/UX sensibility through the portfolio itself — **the product is the proof**.
- Allow the owner to edit all content live via an admin panel, with changes reflecting on the public site instantly after save — zero re-deploys.
- Collect and display genuine testimonials from the owner's network with explicit user consent.
- Give the owner a live health monitoring command center — proving system architecture understanding to technical evaluators who look beyond the UI.

### Non-Goals (v1)

- Job board or marketplace features.
- Multi-user / team portfolio support.
- Paid plans or monetisation.
- Public-facing PWA (admin PWA is in scope; public site is online-only).

---

## 3. User Personas & Stories

### Persona 1 — Priya, The Technical Recruiter (Primary)

**Role:** Technical Recruiter / Talent Acquisition  
**Device:** Desktop at office, mobile during commute  
**Time on portfolio:** 8–12 seconds before deciding to stay or leave

Priya receives a portfolio link from a referral or job application. She is not a developer — she cannot read code — but she has a sharp instinct for quality signal: clean layout, clear role identity, real projects, easy contact.

**She immediately leaves if:**
- Page takes more than 3 seconds to load.
- No role title on the hero — she can't tell what this person does.
- No projects, or fewer than 2–3.
- Resume download is missing, hidden, or broken.
- The design looks like 2009.
- Social links lead to empty profiles.

**She hits Contact when:**
1. Role is clear within 5 seconds.
2. At least 2–3 solid projects are visible with stack tags.
3. Stack matches her open role.
4. The portfolio itself looks polished and intentional.

**User Stories:**
- As Priya, I want to see the candidate's name, role, and value proposition within 3 seconds of landing, so I can immediately decide if this profile is relevant.
- As Priya, I want a persistent "Download Resume" button always visible, so I can grab the PDF without hunting for it.
- As Priya, I want project cards with tech stack tags, so I can do a stack-match without reading full descriptions.
- As Priya, I want the contact form reachable within one click from anywhere on the page.
- As Priya, I want the site to load and be fully usable on my phone in under 3 seconds.
- As Priya, I want all external links to open in a new tab and actually work.

---

### Persona 2 — Arjun, The Hiring Manager (Secondary)

**Role:** Engineering Manager / Tech Lead / CTO at a startup  
**Device:** Desktop, methodical, 5–15 minutes on a shortlisted profile  
**Context:** Received the link from Priya with a note: "Strong fresher, React + Node stack, check him out."

Arjun is technical. He will click GitHub links, read READMEs, check commit history. For a fresher, he evaluates potential, problem-solving approach, and communication quality — not production-scale systems.

**He rejects if:**
- Project cards have only a name and tech tags — no explanation of what was built or why.
- GitHub links lead to empty repos, single commits, or no README.
- Claimed "expert" proficiency in tech that doesn't appear in any project.
- Skills list has 25+ technologies — signals lack of focus or dishonesty.
- No backend integration despite claiming full stack.
- Testimonials are vague ("great person to work with!") with no relationship context.

**Per project, he looks for:**
- The problem — what were you trying to solve and for whom?
- Your role — solo or team? What specifically did you do?
- Tech decisions — why this stack? Were there trade-offs?
- Outcome — does it work? Live link? What would you do differently?
- Code quality signal — a readable README is enough.

**User Stories:**
- As Arjun, I want each project card to have a structured detail view (problem → approach → outcome), so I can assess how the candidate thinks.
- As Arjun, I want a direct GitHub link on every project, so I can inspect code quality without asking.
- As Arjun, I want testimonials to show the giver's name and relationship to the candidate, so I can weigh credibility.
- As Arjun, I want the skills section to show honest proficiency levels, so I can trust the self-assessment.
- As Arjun, I want the About Me section to communicate focus and ambition in plain language.
- As Arjun, I want the portfolio to have zero broken elements — the site itself must confirm frontend competence.

---

### Persona 3 — The Portfolio Owner (Admin)

**Role:** Fresher developer, active job seeker  
**Tech comfort:** High — React, Node.js, Firebase. Does not want to open VS Code for a content change.

**Typical edit session:**
1. Finishes a new side project → opens `/admin`, logs in.
2. Navigates to Projects → clicks "Add Project" → fills in details, uploads screenshot.
3. Hits Save → checks public site in a new tab → sees new card live immediately.
4. Session done in under 10 minutes.

**He is frustrated by:**
- Having to re-deploy for a word change.
- Losing unsaved changes due to accidental navigation.
- Silent failures (image upload fails, no error shown).
- No save confirmation — not knowing if the change went live.
- Admin panel accessible to anyone who guesses the URL.

**User Stories:**
- As the owner, I want to log in with email/password, so access is simple but secure.
- As the owner, I want an unsaved-changes warning if I navigate away mid-edit.
- As the owner, I want a visible success confirmation ("Changes saved and live") after every save.
- As the owner, I want to add/edit/remove any project in under 5 minutes.
- As the owner, I want to upload a new resume PDF and have the public link update immediately.
- As the owner, I want a single toggle to show/hide the "Open to Work" badge on the hero.
- As the owner, I want the admin route to be unlisted and protected by authentication.
- As the owner, I want email notifications when a contact form message or testimonial submission arrives.
- As the owner, I want to take a named snapshot of my live content before making major edits, so I can restore in one click if something goes wrong.
- As the owner, I want to see live system health (API status, error rates, latency, traffic) from the admin panel, so I know my portfolio hasn't silently crashed.

---

### Persona 4 — The Testimonial Giver (Tertiary)

**Context:** Received a personal message or link from the owner. Wants to help but won't spend more than 2–3 minutes.  
**Device:** Likely mobile.

**User Stories:**
- As a testimonial giver, I want to fill out the form in under 2 minutes on my phone.
- As a testimonial giver, I want a clear label explaining what will and won't be shown publicly before I submit.
- As a testimonial giver, I want a friendly confirmation message after submitting.
- As a testimonial giver, I want to specify my relationship to the owner so the testimonial carries honest context.

---

## 4. Functional Requirements

### 4.1 Public Portfolio — Sections

#### Hero / Landing
- Full-screen section with animated introduction: name, role title, tagline.
- CTA buttons: "View My Work" (scrolls to projects) and "Contact Me" (scrolls to contact form).
- "Available for Hire" badge — shown/hidden by admin toggle, reflects instantly.
- Dark / Light mode toggle, persisted via localStorage.
- Animated page entry (fade / slide-in via Framer Motion).
- Three.js accent element (rotating geometry or subtle canvas — scope finalised in design phase).

#### About Me
- Short bio paragraph with profile photo.
- Key facts strip: location, years of experience, open to work status.
- All content editable via admin CMS — zero code changes.

#### Work Experience Timeline
- Vertical or horizontal interactive timeline.
- Each entry: company logo, role title, duration, key responsibilities (bullet list), tech used (tags).
- Expandable cards on click/tap — reveal full detail without page navigation.
- Scroll-triggered animation via Intersection Observer.

#### Projects Showcase
- Card-based grid with filtering by tech stack / category tag.
- Each card: project name, short description, tech tags, thumbnail, Live Demo + GitHub action links.
- Clicking a card opens a detail modal or sub-page with:
  - Problem statement (what were you solving and for whom?)
  - Approach (what did you build and how?)
  - Outcome (does it work? live link? lessons learned?)
  - Media: screenshots or video embed.
- All project data driven from Firestore. New projects appear instantly after admin save.

#### Skills & Tech Stack
- Visual skill matrix grouped by category: Frontend, Backend, DevOps, Tools.
- Proficiency indicator per skill: Beginner / Intermediate / Advanced (bar or badge).
- Scroll-triggered animation.

#### Testimonials
- Carousel or grid of approved testimonials.
- Each card: name, relationship to owner, avatar (optional), quote, date.
- "Leave a Testimonial" CTA → opens the consent-aware submission form at `/testimonial`.

#### Contact Form
- Fields: Name, Email, Subject, Message.
- Client-side validation + server-side validation via Cloud Function.
- On submit: email notification sent to owner via Nodemailer in a Cloud Function.
- Success / error toast feedback.
- No third-party contact SaaS dependency.

#### Resume Download
- Sticky nav button or always-accessible section-level button.
- Fetches latest resume PDF from Firebase Storage.
- When admin uploads a new PDF, the public download button serves the new file immediately — same URL.

---

### 4.2 Admin Panel — Wing 1: Headless CMS

#### Authentication
- Email/password login via Firebase Authentication.
- Single authorised account (owner only).
- Unauthenticated users redirected to `/admin/login`.
- Session persistence; auto-logout on token expiry.
- Admin route not linked from anywhere on the public site.

#### Dashboard Overview
- Overview cards: last updated date, total project count, pending testimonial count.
- Quick-edit shortcuts to each content section.
- Unsaved-changes warning on navigation away from any active edit form.

#### Real-Time Content Editing
- Drag-and-drop editor for landing page dialogue, bio sentences, hero text.
- Reorder, highlight key terms, edit in place.
- Save → Firestore write → public site updates instantly via Firestore real-time listener.
- No re-deploy. No refresh needed on the public site.

#### Project Management
- Add / edit / remove projects via structured form:
  - Project Name
  - Tech Stack tags (multi-select or free-tag)
  - Problem Statement
  - Approach / Description
  - GitHub Link
  - Live Demo URL
  - Thumbnail image upload (to Firebase Storage)
- Save → project card appears in the public grid within seconds.
- Destructive actions (delete) require a confirmation prompt.

#### Dynamic Resume Upload
- "Upload Resume PDF" button in admin panel.
- Overwrites existing file in Firebase Storage.
- Public "Download Resume" button auto-serves the new file. Same public URL — no link changes needed anywhere.

#### Testimonial Approval Queue
- List of all pending testimonial submissions.
- Per submission: name, relationship, message, submission date.
- Actions: Approve (→ goes live on carousel immediately) or Reject (soft-deleted, stored but hidden).

#### "Open to Work" Toggle
- Single toggle switch in dashboard.
- On: "Available for Hire" badge appears on public hero instantly.
- Off: badge disappears instantly.
- State stored in Firestore; public site reads it via real-time listener.

#### UX Guards
- Unsaved-changes warning before navigating away from any edit form.
- Visible success confirmation toast ("Changes saved and live") after every save action.
- Error messages on upload failure — no silent failures.
- Undo / confirmation prompt before all destructive actions.

---

### 4.3 Admin Panel — Wing 2: Health & Monitoring OS

This wing proves to technical hiring managers that the owner understands system architecture, telemetry, and operational maturity — not just UI.

#### System Health Dashboard
Live read-outs for:

| Metric | Description |
|---|---|
| API Health Checks | Up / down status per endpoint, checked on an interval |
| API Error Rate | Percentage of failed requests over a rolling time window |
| Request Latency | Average and P95 response time for API calls |
| Traffic / RPM | Incoming requests per minute to the portfolio backend |
| Query Latency | Average Firestore read / write latency |
| CPU Utilization | Server CPU usage percentage |
| Database Health | Active connection count, connection pool status |
| Server Resource Usage | Memory usage, uptime |

> ⚠️ **OQ-1 — UNRESOLVED:** The data source for these metrics has not been decided. Options are (A) Firebase + Cloud Functions instrumentation only, or (B) a separate Node.js metrics server. **Do not architect the data pipeline for Wing 2 until OQ-1 is resolved.**

#### Live Visitor Tracking
- **Live user count:** Users on the public site right now, via Firebase Realtime Database presence pattern.
- **Total visitor count:** Cumulative unique visitor count, stored and incremented in Firestore.
- Both displayed as live counters in the admin dashboard.

#### Time Machine — Snapshot & Restore

The safety net for all content editing.

**Taking a Snapshot:**
- Owner types a snapshot name (e.g., "Pre-Update Backup", "Before Redesign").
- Clicks "Take Snapshot."
- The system copies the entire current Firestore content configuration into a versioned snapshot document in a protected Firestore collection.
- Snapshot is timestamped and named. Stored indefinitely until manually deleted.

**Restoring a Snapshot:**
- Owner browses snapshot history, clicks "Restore" on any entry.
- Confirmation prompt shown before restore executes.
- On confirm: the snapshot document overwrites the live Firestore content.
- Public site reflects the restored state in under 1 second via real-time listener.
- No Git rollback, no redeployment, no downtime.

> ⚠️ **OQ-2 — UNRESOLVED:** It is not yet decided whether snapshots include uploaded files (resume PDF, project images in Firebase Storage) or Firestore content only. **Build Firestore-only snapshot for now. Do not implement Storage versioning until OQ-2 is resolved.**

---

### 4.4 Testimonial Submission Flow (Public, Unlisted)

- Page at `/testimonial` — shareable link owner sends to contacts. Not in the main nav.
- Fields:
  - Name (required)
  - Role / Relationship to owner (required, e.g., "Hackathon teammate", "Mentor")
  - Message (required, max 300 characters)
  - Email (required, private — used for verification, never displayed publicly)
- Explicit consent checkbox: "I agree that my name and message may be displayed on this portfolio."
- Submit disabled until consent checkbox is checked.
- On submit: stored in Firestore with `status: "pending"`.
- Submitter sees a friendly confirmation screen.
- Owner receives an email notification via Cloud Function.
- Owner reviews in the admin Testimonial Queue → Approve or Reject.

---

### 4.5 Global UX Requirements

- Smooth scroll navigation with active section highlighting in the sticky nav.
- Animated page and section transitions via Framer Motion.
- Three.js accent on hero — scope (rotating geometry, background canvas) finalised in design phase.
- Fully responsive: Mobile → Tablet → Desktop breakpoints. No horizontal scroll, no pinch-zoom required.
- Accessible: ARIA labels, keyboard navigation, WCAG 2.1 AA colour contrast throughout.
- All external links open in a new tab (`target="_blank"` + `rel="noopener noreferrer"`).

---

## 5. Non-Functional Requirements & Tech Stack

### Performance
- Lighthouse score ≥ 90: Performance, Accessibility, Best Practices, SEO.
- First Contentful Paint (FCP) < 1.5s on 4G.
- Code splitting and lazy loading for heavy sections (Three.js, project modals).

### Security
- Admin panel behind Firebase Auth — no public access.
- Firestore security rules: public read on portfolio content; authenticated write only.
- Contact and testimonial forms rate-limited via Cloud Functions to prevent spam.
- No environment variables or secrets exposed to the client bundle.

### Reliability
- Real-time CMS round-trip (edit → live on public site) ≤ 3 seconds.
- Time Machine restore completes and is visible on the public site in ≤ 1 second.
- Zero re-deploys required for content-only changes.

### Tech Stack

| Layer | Technology | Rationale |
|---|---|---|
| Frontend | React (Vite) | Fast dev server, component ecosystem |
| Animations | Framer Motion | Page transitions, scroll animations |
| 3D / WebGL | Three.js | Hero accent elements |
| Styling | Tailwind CSS | Utility-first, rapid iteration |
| Database | Firebase Firestore | Real-time updates, no re-deploy for content |
| Presence Tracking | Firebase Realtime Database | Live visitor count — purpose-built for presence |
| Auth | Firebase Authentication | Secure, zero-cost for single user |
| File Storage | Firebase Storage | Resume PDF, project images |
| Hosting | Firebase Hosting | CDN, SSL, custom domain |
| Backend | Firebase Cloud Functions (Node.js 20) | All server-side logic, serverless |
| Email | Nodemailer via Cloud Functions | Contact form + testimonial notifications |
| Admin PWA | React PWA (vite-plugin-pwa) + FCM | Mobile-first admin monitoring and editing |

---

## 6. Architecture Decision

### Do We Need a Node.js Backend?

**Short answer: Yes — but serverless, not a dedicated server.**

All backend logic for v1 is handled by Firebase Cloud Functions (Node.js 20 runtime). No persistent server on Render, Railway, or any other host is needed or in scope.

| Feature | Why Backend Is Needed | Solution |
|---|---|---|
| Contact form email delivery | Credentials must never be in the client bundle | Cloud Function (Nodemailer) |
| Testimonial spam protection | Rate limiting must be server-side | Cloud Function |
| Resume upload security | Restrict Storage writes | Firestore Security Rules + Auth |
| Health monitoring data collection | Server-side instrumentation | See OQ-1 |
| Time Machine snapshot / restore | Atomic Firestore writes | Cloud Function |

If a persistent REST API is ever needed (v2+), a Node.js service can be introduced without changing the frontend architecture.

---

## 7. Open Questions

| # | Question | Impact | Status |
|---|---|---|---|
| OQ-1 | **Health & Monitoring data source** — Firebase + Cloud Functions instrumentation only, or a separate Node.js metrics server? | Determines entire Wing 2 data pipeline and architecture | ⏳ Unresolved — do not build monitoring pipeline until answered |
| OQ-2 | **Time Machine snapshot scope** — Firestore content only, or does it include Firebase Storage files (resume, images)? | Determines Storage versioning strategy | ⏳ Unresolved — build Firestore-only for now |
| OQ-3 | What is the personal brand / name and tagline for the hero section? | Needed before M0 design | ⏳ Pending |
| OQ-4 | Which domain name will be used? | Needed before M8 launch | ⏳ Pending |
| OQ-5 | Admin panel at `/admin` of the main domain or a subdomain (e.g., `admin.yourportfolio.dev`)? | Affects routing and Firebase Hosting config | ⏳ Pending |
| OQ-6 | What visual style does the owner prefer? (minimal, bold, glassmorphism, brutalist, etc.) | Needed before M0 design | ⏳ Pending |
| OQ-7 | Should the testimonial submission page be publicly accessible (anyone with the link) or require a passcode? | Affects spam risk and submission flow | ⏳ Pending |

---

## 8. Out of Scope — v1

- Blog / articles section
- Cursor effects or particle / generative backgrounds
- Multi-language (i18n) support
- Public-facing PWA (Admin PWA is v1; public site is online-only)
- Visitor commenting on projects
- Analytics dashboard inside the admin panel (use Firebase Analytics externally)
- Dedicated Node.js server on Render or any persistent host
- Social login (Google, GitHub OAuth) for any user
- Image editing via the admin panel
- iOS-specific Admin PWA push notifications
- Multi-user or team portfolio support
- Job board or marketplace features
- Paid plans or monetisation

---

## 9. Success Metrics & KPIs

### Recruiter Engagement
- Average session duration ≥ 2 minutes.
- Bounce rate ≤ 40%.
- Contact form submission rate ≥ 5% of unique sessions.
- Resume download rate ≥ 10% of unique sessions.

### Portfolio Quality
- Lighthouse Performance score ≥ 90.
- Zero accessibility errors (axe-core audit).
- Mobile usability score ≥ 95 (Google Search Console).

### Admin CMS
- Content update round-trip (edit → live) ≤ 3 seconds.
- Zero re-deploys required for content-only changes.
- Time Machine restore ≤ 1 second to live visibility.

### Testimonials
- ≥ 5 approved testimonials displayed within 60 days of launch.

---

## 10. Timeline & Milestones

| Milestone | Deliverable | Target |
|---|---|---|
| M0 — Design | Figma wireframes: all sections, dark/light variants, mobile breakpoints, admin panel layouts | Week 1–2 |
| M1 — Foundation | Vite + React scaffold, Tailwind, routing, Firebase project setup, Firestore schema, RTDB setup, Cloud Functions scaffold | Week 3 |
| M2 — Public Site Core | Hero, About, Timeline, Skills sections live with seed data | Week 4–5 |
| M3 — Projects & Contact | Projects showcase with modal, contact form + Cloud Function email | Week 6 |
| M4 — Admin CMS (Wing 1) | Login, dashboard, all section editors, Firestore real-time binding, resume upload, "Open to Work" toggle, testimonial queue | Week 7–8 |
| M5 — Testimonials | Public submission flow (`/testimonial`), consent form, approval queue, carousel display | Week 9 |
| M6 — Admin Monitoring (Wing 2) | Live visitor tracking, system health dashboard, Time Machine snapshot/restore | Week 10 *(pending OQ-1 resolution)* |
| M7 — Admin PWA | PWA scaffold, FCM push notifications, mobile admin interface, deploy + rollback screen | Week 11 |
| M8 — Polish & 3D | Framer Motion transitions, Three.js hero element, dark/light toggle, responsive QA | Week 12 |
| M9 — Launch | Performance audit, SEO meta tags, Firebase Hosting deploy, custom domain setup | Week 13 |
| M10 — Post-Launch | Analytics review, content updates, bug fixes, OQ-1 / OQ-2 resolution, v2 planning | Week 14+ |

---

*Related documents:*
- *PROJECT_RULES.md — AI rules file derived from this PRD*
- *Next: Firestore Schema Spec (to be written)*
- *Next: Firestore Security Rules Spec (to be written)*
- *Next: Cloud Functions Spec (to be written)*
