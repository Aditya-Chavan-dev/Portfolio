# PROJECT_RULES.md
> This file is the single source of truth for what this project is, who it serves, and what it must do.
> Read this before touching any file in this codebase.
> If something you are about to write, suggest, or build is not covered here — stop and ask.

---

## 🎯 Core Objective

Build a **fully interactive, CMS-driven developer portfolio** for a fresher developer actively seeking Frontend, Backend, and Full Stack roles.

The portfolio serves two simultaneous purposes:
1. **Communication** — present the owner's projects, skills, and professional arc to recruiters and hiring managers in a fast, clear, visually compelling way.
2. **Proof of craft** — the portfolio itself is the demonstration of frontend, backend, devops awareness, and UI/UX ability. The product IS the proof.

The owner must be able to edit all content (projects, bio, skills, resume, testimonials) from a secured admin panel — **with zero code re-deploys**. Changes go live the moment they are saved.

---

## 👥 Who This Is Built For

### Primary — Priya (Technical Recruiter)
- Scans the portfolio in 8–12 seconds on desktop, sometimes mobile.
- Cannot read code. Evaluates on: role clarity, project count, stack visibility, and visual polish.
- **Must see within 5 seconds:** name, role title, and value proposition.
- **Must always have access to:** Resume download (sticky/floating), Contact form (one click away).
- Will immediately leave if: page is slow, hero has no role title, no projects are listed, or the design looks broken.

### Secondary — Arjun (Hiring Manager / Tech Lead)
- Technical. Spends 5–15 minutes after Priya shortlists the profile.
- Goes straight to Projects → clicks into detail → checks GitHub → reads testimonials → checks skills.
- **Needs per project:** problem statement, approach, tech decisions, outcome, GitHub link.
- Will reject if: projects lack descriptions, GitHub links are empty, skills are inflated or unverified by projects.

### Owner (Admin / CMS User)
- Fresher developer, high technical comfort, actively job searching.
- Typical session: add a project, upload resume, approve a testimonial — all in under 10 minutes.
- Must never need to open VS Code for a content change.
- Must receive email notifications for contact form messages and new testimonial submissions.

### Testimonial Giver (Tertiary)
- Classmate, mentor, or collaborator filling out a form via a shared link.
- Mobile-first. No account required. 2–3 minute flow max.
- Needs: clear consent notice, confirmation screen after submit.

---

## ⚙️ What This Project Must Do (Functional Scope)

### Surface 1 — Public Portfolio

| Section | Key Requirements |
|---|---|
| **Hero** | Name, role title, tagline, "View My Work" + "Contact Me" CTAs, dark/light toggle, Open to Work badge (admin-toggled) |
| **About Me** | Bio, photo, key facts strip — all CMS-driven |
| **Work Experience Timeline** | Interactive vertical/horizontal timeline, expandable cards, scroll animations |
| **Projects Showcase** | Card grid with tag filtering; each card → detail modal (problem → approach → outcome → media); GitHub + Live Demo links |
| **Skills & Tech Stack** | Grouped by category, proficiency levels (Beginner / Intermediate / Advanced), animated on scroll |
| **Testimonials** | Approved testimonials carousel/grid; "Leave a Testimonial" CTA → submission form with consent |
| **Contact Form** | Name, Email, Subject, Message; email delivery via Cloud Function; success/error feedback |
| **Resume Download** | Sticky or always-accessible button; pulls latest PDF from Firebase Storage |

---

### Surface 2 — Admin Panel

The admin panel has two distinct wings. Both are behind Firebase Auth. Route: `/admin/login` — not linked from the public site.

---

#### Wing 1 — Headless CMS (Content Control)

Everything a recruiter sees on the public site is controlled from here. Zero re-deploys, ever.

| Feature | What It Does |
|---|---|
| **Real-Time Content Editing** | Drag-and-drop editor for bio, landing dialogue, and hero text. Save → live site updates instantly via Firebase for anyone currently on the page, no refresh needed. |
| **Project Management** | Add / edit / remove projects via form: Name, Tech Stack tags, Problem Statement, GitHub link, Live Demo URL, thumbnail image. Card appears in the public grid within seconds of saving. |
| **Dynamic Resume Upload** | Upload a new PDF → overwrites existing file in Firebase Storage → public "Download Resume" button serves the new file immediately. Same public URL, no rebuild. |
| **Testimonial Approval Queue** | Submissions land in a Pending queue. Owner reads, approves, or rejects. Only approved testimonials appear on the live carousel. Rejected submissions are soft-deleted. |
| **"Open to Work" Toggle** | Single toggle → instantly shows or hides an "Available for Hire" badge on the public hero section. |

---

#### Wing 2 — Health & Monitoring OS

The command center. Demonstrates to technical hiring managers that the owner understands devops, telemetry, and system architecture — not just UI.

| Feature | What It Shows / Does |
|---|---|
| **System Health Dashboard** | API health checks (up/down per endpoint), API error rates, request latency, traffic / requests per minute, query latency (DB read/write times), CPU utilization, database connection count, server resource usage |
| **Live Visitor Tracking** | Live user count (users on site right now, via Firebase RTDB presence) + total cumulative visitor count (Firestore) |
| **Time Machine — Snapshot & Restore** | Take a named snapshot of the entire live Firestore content configuration before any major edit. Hit Restore on any snapshot → database rewrites itself instantly, live site reverts in under 1 second. No Git rollback, no redeployment. |

---

### Testimonial Submission Flow (Public, Unlisted)

- Page at `/testimonial` — shareable link, not in the main nav.
- Fields: Name, Role/Relationship, Message (≤300 chars), Email (private, never displayed publicly).
- Explicit consent checkbox required before submit.
- Stored in Firestore as `status: "pending"` until owner approves from the admin dashboard.

---

## 🛠️ Tech Stack — Do Not Deviate Without Explicit Approval

| Layer | Technology |
|---|---|
| Frontend | React (Vite) |
| Animations | Framer Motion |
| 3D / WebGL | Three.js (hero accent only) |
| Styling | Tailwind CSS |
| Database | Firebase Firestore (portfolio content, real-time) |
| Presence Tracking | Firebase Realtime Database (live visitor count only) |
| Auth | Firebase Authentication |
| File Storage | Firebase Storage (resume PDF, project images) |
| Hosting | Firebase Hosting |
| Backend | Firebase Cloud Functions (Node.js 20) |
| Email | Nodemailer via Cloud Functions |
| Admin PWA | React PWA (vite-plugin-pwa) + Firebase Cloud Messaging |

**Architecture rule:** No dedicated persistent server (e.g., Render, Railway) in v1. All backend logic lives in Cloud Functions. If you are about to suggest a standalone Node.js server — stop and flag it.

---

## ❓ Open Questions — Do Not Assume, Do Not Build Around These Yet

| # | Question | Impact |
|---|---|---|
| OQ-1 | **Health & Monitoring data source** — does telemetry (API health, latency, CPU, error rates) come from Firebase + Cloud Functions only, or does a separate Node.js server expose these metrics? | Determines entire Wing 2 architecture. Do not build the monitoring data pipeline until resolved. |
| OQ-2 | **Time Machine scope** — do snapshots include uploaded files (resume PDF, project images) or Firestore content only? | Determines Firebase Storage versioning strategy. Build Firestore-only snapshot for now; do not expand until resolved. |

---

## 🚫 Out of Scope — Do Not Build These in v1

If any of the following appear in the codebase, flag them immediately.

- Blog / articles section
- Cursor effects or particle / generative backgrounds
- Multi-language (i18n) support
- Public-facing PWA (Admin PWA is v1; public site is online-only)
- Visitor commenting on projects
- Analytics dashboard inside the admin panel (use Firebase Analytics or Google Analytics externally)
- Dedicated Node.js server on Render or any other persistent host
- Social login (Google, GitHub OAuth) for any user
- Image editing via the admin panel (profile photo, logos, screenshots are set during dev)
- iOS-specific Admin PWA push notifications
- Multi-user or team portfolio support
- Job board or marketplace features
- Paid plans or monetisation of any kind

---

## ✅ Quality Gates — Every Feature Must Pass These

- **Performance:** Lighthouse ≥ 90 on Performance, Accessibility, Best Practices, SEO. FCP < 1.5s on 4G.
- **Responsiveness:** Works flawlessly on mobile, tablet, and desktop. No pinch-zoom required.
- **Accessibility:** ARIA labels, keyboard navigation, WCAG 2.1 AA colour contrast.
- **Security:** Admin panel behind Firebase Auth. Firestore rules: public read, auth-only write. No secrets in the client bundle.
- **Real-time CMS:** Any content change saved in the admin must reflect on the public site in ≤ 3 seconds — no re-deploy.
- **Link integrity:** All GitHub and live demo links must point to real destinations. No placeholder URLs in production.

---

## 🤖 Rules for AI Working on This Codebase

### 1. Objective Lock
Every suggestion, component, function, or file you write must serve one of the features listed under **Functional Scope** above, using the **Tech Stack** above.

### 2. Out-of-Scope Detection
If you notice code, a feature, a dependency, or a pattern that does not map to anything in this document — **do not silently proceed**. Stop and ask:

> "I found [X] which doesn't appear to be part of the defined project scope. Should I:
> (A) Remove it, or
> (B) Update the objective to include it?"

### 3. Open Questions Are Blockers
If a task touches OQ-1 or OQ-2, do not guess or assume an answer. Flag the open question and ask the owner to resolve it before proceeding.

### 4. Tech Stack Drift
If you are about to introduce a library, framework, or service not listed in the tech stack — flag it before adding it. State what it replaces and why it is necessary.

### 5. Scope Creep in Suggestions
Do not proactively suggest features explicitly listed as Out of Scope, even if they seem like natural additions. If the user asks for something out of scope, note that it is out of scope per this document before proceeding.

### 6. Admin vs Public Context
Always be explicit about which surface you are building for — public portfolio or admin panel. They have different auth requirements, Firestore security rules, and UX standards.

### 7. Content vs Code Changes
If a change can be achieved through Firestore data (i.e., it is a content change), do not solve it with a code change. The CMS exists precisely to avoid code changes for content.

### 8. When in Doubt
If something is ambiguous — a feature isn't clearly in or out of scope, or a tech choice has trade-offs — ask before building. A 10-second question is better than a 30-minute detour.

### 9. Strict Browser Policy
**DO NOT** use browser tools (`open_browser_url`, `browser_control`, `read_browser_page`) or browser subagents for self-testing, verification, or screenshot capture unless explicitly requested by the user in the current session. The user prefers to test the UI personally.

---

*This file describes the objective. The codebase is the implementation. When they conflict, this file wins — unless the owner explicitly says otherwise.*
