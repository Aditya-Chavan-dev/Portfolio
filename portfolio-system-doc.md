# Portfolio System Document
### A complete reference for how this portfolio is built, what it does, and how it is managed

---

## 1. What This Portfolio Is

This is a **fully interactive, CMS-driven developer portfolio**. While it serves as a digital resume for a fresher software engineer at Accenture, its true purpose is to be a **living proof of craft**. 

Every line of code, every transition, and every data pipeline is designed to demonstrate frontend mastery, backend integration, and devops awareness. The portfolio doesn't just *list* skills; it *executes* them.

The site is split into two distinct surfaces:

- **The Public Side** — A high-fidelity, cinematic experience designed to convert a recruiter's 10-second scan into a meaningful conversation through story-driven navigation.
- **God Mode (Admin OS)** — A private, authenticated command center that serves two roles:
    - **Wing 1 (CMS):** Complete control over public content (Projects, Experience, Skills) with zero re-deploys.
    - **Wing 2 (Monitoring):** A live devops dashboard showing system health, traffic, and performance—proving architectural maturity to technical evaluators.

---

## 2. The Tech Behind It

This portfolio is built on a **modern, serverless edge-first architecture**. By using industry-standard tools, it achieves 90+ Lighthouse scores and instant real-time updates.

| Layer | Tools | Purpose |
|---|---|---|
| **Frontend** | React (Vite) + TypeScript | Fast, type-safe interface development. |
| **Logic** | Firebase Cloud Functions | Serverless Node.js 20 backend for secure logic. |
| **Database** | Firestore + Realtime DB | Real-time SSOT (Firestore) and visitor presence (RTDB). |
| **Styling** | Tailwind CSS | Utility-first design system for rapid, clean UI. |
| **Animations** | Framer Motion + GSAP | High-fidelity transitions and scroll-based motion. |
| **3D Engine** | Three.js | Cinematic hero accent elements. |
| **Storage** | Firebase Storage | Secure hosting for resume PDFs and project media. |
| **Hosting** | Firebase Hosting | Global CDN ensuring fast loads from anywhere. |
| **Security** | Firebase Auth + App Check | Gmail login for God Mode and enterprise-grade backend protection. |

**Why this matters:**
This stack is not just for show; it eliminates traditional bottlenecks. There are no persistent servers to maintain, no manual re-deploys for content changes, and the site is protected by the same security infrastructure used by global enterprises.

---

## 3. The Single Source of Truth (SSOT)

To ensure consistency and eliminate manual work, this portfolio uses a **hybrid data architecture** where every piece of information has a designated, authoritative home.

| Data Type | Primary Source | Handling |
|---|---|---|
| **Core Content** | **Firebase Firestore** | All text, bio, project descriptions, skills, and testimonials. |
| **Technical Metadata** | **GitHub API** | Commit counts, repo stars, and activity dates for projects. |
| **Media Assets** | **Firebase Storage** | Profile photos, project screenshots, and resume PDFs. |
| **System Telemetry** | **Realtime Database** | Live visitor counts and active session heartbeats. |

**The Power of SSOT:**
- **Zero Refresh Architecture:** When you update a project or bio via the Admin OS, the public site updates for all active visitors in under 3 seconds without a page refresh.
- **Dynamic Context:** Since technical data is pulled from GitHub and content from Firestore, your portfolio accurately reflects both your *current* coding activity and your *curated* professional story.
- **Decoupled Infrastructure:** Assets are served via a dedicated media pipeline (Storage), ensuring high-speed delivery of documents and images regardless of database load.

---

## 4. The Public Side — What Visitors See

The public side represents the **Cinematic Entryway** to your professional identity. It is built as a viewport-locked, high-fidelity experience optimized for both massive desktop monitors and mobile devices.

### 4.1 The Portfolio Hub
The Hub is the "Command Center" of the experience. It utilizes a **Prestige Noir** aesthetic with glassmorphic cards and nebula-glow accents.
- **Identity Hub:** A central node displaying your role, photo, and a real-time "Open to Work" status.
- **Quick Access Grid:** A structured 4-item grid (Projects, About, Skills, CV) that allows recruiters to find core info in under 10 seconds.
- **Immersive Journey CTA:** A high-impact button that launches the story-driven, interactive walkthrough of your career milestones.

### 4.2 Project Showcase & GitHub Automation
Projects are more than just cards; they are **Live Technical Snapshots**.
- **GitHub Sync:** Every project card auto-fetches its latest stars, commit count, and "last updated" date via the GitHub API, reducing manual maintenance.
- **Deep Dives:** Each project includes the "Problem-Approach-Outcome" framework to demonstrate problem-solving skills to hiring managers.
- **Stack Tags:** Dynamically generated chips showing the precise languages and tools used.

### 4.3 Content Sections (Experience & Skills)
All content here is served with **Zero Latency** from the Firestore SSOT.
- **Experience:** A vertical timeline with interactive scroll triggers (GSAP).
- **Skills Orbit:** A categorized visualization of your stack, ensuring even a quick glance reveals your technical breadth.

### 4.4 Interactive Testimonials
A proof-of-human-trust layer that features a **Secure Submission Flow**.
- **Submission:** Visitors can leave feedback through a custom form.
- **Moderation Queue:** Incoming testimonials are hidden by default until you manually verify and "Approve" them from God Mode.
- **Visual Proof:** Displays the author's role and affiliation to add credibility.

### 4.5 Recruiter-First Contact
Strategically placed to minimize friction.
- **Master Status Switch:** A badge showing "Available for Hire" (managed from God Mode) signals your current job-seeking status.
- **One-Tap Actions:** Direct links to LinkedIn, GitHub, and a quick-download Resume (PDF hosted on Firebase Storage).

---

## 5. God Mode — The Admin OS

God Mode is not just a typical admin panel; it is a **Command-and-Control OS** designed to demonstrate your full-stack architectural maturity. It is strictly protected and lazy-loaded to keep the public bundle lean.

### 5.1 The Two-Wing Architecture
The Admin OS is split into two distinct operational zones:

#### **Wing 1: The Headless CMS (Content Control)**
Gives you total authority over the public site's narrative.
- **Hero & Identity Editor:** In-place editing of bios, roles, and subtitles.
- **Project Pipeline:** Add/Edit projects with image uploads to Firebase Storage.
- **Resume Management:** One-click PDF updates that change the live public download link instantly.
- **Master Badging:** Toggle your "Open to Work" status across the entire site with one switch.

#### **Wing 2: The Health & Monitoring OS (System Control)**
A live instrumentation dashboard for technical evaluators.
- **Pulse Panel:** Tracks API health, site heartbeat, and component render performance.
- **Time Machine:** Take snapshots of your live Firestore data and "Restore" to any point in time if an edit goes wrong.
- **Shield Panel:** Real-time visibility into security logs, blocked requests, and Auth health.
- **Hive Panel:** Presence tracking showing live concurrent visitors via Firebase Realtime DB.

### 5.2 Enterprise-Grade Security
Built to be a "Zero-Trust" environment.
- **Access Control:** Backed by Firebase Auth (Gmail). Access is hardware-locked to a single whitelisted UID.
- **Session Intelligence:** Automatic inactivity logouts and session duration tracking.
- **Edit Isolation:** Unsaved changes are tracked via local state locks to prevent data loss during network blips.

---

## 6. Security & Infrastructure Protection

Security is not an afterthought; it is built into the core data layer using a **Zero-Trust layered defense** strategy.

### 6.1 Backend Guarding (Firebase App Check)
The portfolio is protected by **Firebase App Check** with ReCaptcha Enterprise. This ensures that only requests coming from the official, verified portfolio domain can talk to your database. It completely blocks:
- Automated scraping bots.
- Unauthorized API requests from Postman or CURL.
- UI-cloning attempts that try to steal your project data.

### 6.2 Granular Security Rules
Access is controlled through strict `firestore.rules` and `database.rules.json`:
- **Read Operations:** Restricted to specifically marked "Approved" content (verified by the CMS Wing 1).
- **Write Operations:** 100% blocked globally except for the hardware-verified Admin UID.
- **Admin Isolation:** The `/admin` path is hidden from search engines and lazy-loaded, ensuring public users never even load the admin logic.

### 6.3 Environment & Token Safety
Sensitive credentials (like GitHub tokens) are never stored in the frontend or exposed in JavaScript bundles.
- **Cloud Function Relay:** All protected API calls are routed through Firebase Cloud Functions (Node.js).
- **Secret Management:** API keys are injected via GCP Secret Manager at runtime, ensuring they never appear in your Git history or `.env` files.

This means even if someone finds the admin route, they cannot make changes without the correct Gmail login.

---

## 7. Future Phases

The following features are planned but not part of the first version:

| Feature | What It Is |
|---|---|
| Immersive Journey | A cinematic, story-driven experience of the owner's full background — designed separately once the rest of the site is complete |
| Built-in Chat | A contact system where visitors can message the owner directly from the portfolio, built as a separate project and merged in |

---

## 8. Summary

This portfolio is built with a clear structure so it is easy to maintain, easy to update, and reliable for any number of visitors. All content flows from one source (Firestore), the hosting is globally distributed so it is fast everywhere, and the owner has full control over every piece of text on the site without ever needing to touch the code.
