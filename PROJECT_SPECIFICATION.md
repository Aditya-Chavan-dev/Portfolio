# Project Specification: Live Digital Portfolio

> **Status**: In-Progress (Architectural Foundation Complete)
> **Goal**: A production-grade, real-time interactive portfolio that showcases professional journey and technical expertise.
> **Interaction Workflow**: For the visual flow and button-level interactions, see the [USER_FLOW.md](file:///g:/PORTFOLIO/USER_FLOW.md).

---

## 🎯 1. Mission & Objectives
- **Core Problem**: Moving beyond static resumes to show "Live" engagement and deep-dive technical narratives.
- **Primary Audience**: Recruiters, LinkedIn peers, and general technical/non-technical users.
- **MVP Features**:
  1. **About Me**: Summary, Photo, and a live **Experience Days Count**.
  2. **Projects**: Detailed case studies including lessons learned.
  3. **Professional Experience**: Interactive journey with skill-based filtering.
  6. **Contact Hub**: A premium, frictionless way to reach out.
  7. **Interactive Feedback & FAQ**: Post-engagement section.
  8. **Testimonial Portal**: Where users can leave their own testimonials.

---

## 🚀 2. The "Live" Experience & UI Flow
- **Real-Time Counter** (RTDB): 
  - Total lifetime visits.
  - Active "right now" user count.
- **Live Presence** (RTDB): A status indicator showing current activity.
- **Interactive Hook**: 
  - **Sequence**: **Typewriter** effect (Deletable text with blinking `|` cursor) followed by **Fade-in** for the CTA button.
  - **Content**: *"This is a live system, not a static site. You are one of [X] active users currently traversing my professional journey."*
  - **Engagement**: The "Interactive Journey" button remains visible after intro; if using quick nav, the UI will provide a **suggestive hint** (e.g., "The interactive journey offers a richer story").
  - **Contextual Nudge**: If a user dwells on a project page without initiating the journey, trigger a subtle nudge.
- **Navigation Flow**: 
  - **Hub-and-Spoke**: Dedicated pages for deep content.
  - **Return to Hub**: Smooth scroll back to the hub with a fresh "Live Stats" refresh.
  - **Universal Access**: Users can return to the "Hub" (Home) at any point.

---

## ⚙️ 3. Technical Architecture
- **Frontend**: React (Vite-based), **Tailwind CSS**, Firebase Hosting.
- **Backend**: Node.js (Render) - **Mission**: Secure CRUD, Analytics processing, and automated maintenance.
- **Database Strategy (Hybrid)**:
  - **RTDB**: Dedicated to ultra-low latency "Live" data (counters, presence).
    - **Logic**: 5-10s grace period for disconnects; rapid "tick-up" animation for concurrent joins.
    - **Tab Mgmt**: 1 unique visitor count across multiple tabs.
  - **Firestore**: For static/semi-static content (Old Projects, Experience).
- **Security**: 
  - **Strict Policy**: 100% environment variable (`.env`) usage for all secrets.
  - **Dual-Layer Rate Limiting**: Implemented at the Node.js layer using both **IP Address** and **Session/Device ID**.
  - **Bot Defense**: Option A (Shadow-ban) + UI notification ("Bot Detected") once detection confidence is absolute.
  - **Admin Auth**: Token expires immediately upon tab closure (Session-based).
- **User UX**: No login/auth for public users (zero friction).

---

## 📂 4. Detailed Feature Breakdown

### A. About Me (The Narrative)
- **Content**: Name, Summary, and a professional Photo.
- **Dynamic Element**: **Experience Days Counter** - A live-updating counter showing the total days since you started your journey (e.g., "732 Days of Building").
- **Educational Milestones**: Degree and notable university achievements.

### B. Projects (The Case Study Model)
- **Content**: Summary, Tech Stack, Feature List, **Lessons Learned** (Failures/Challenges).
- **Storage**: Firebase Storage for images/static assets. 

### C. Professional Experience (The Interactive Journey)
- **Schema**:
  - `id`, `company`, `role`, `startDate`, `endDate`.
  - `skills` (Array).
  - `projectWorkedOn`: Summary of specific project at that job.
  - `highlightFeature`: The single most impactful feature developed.

### D. Tech Proficiency & Social Proof
- **Tech Stack Cloud**: Interactive or floating icons of core technologies.
- **GitHub Activity**: Live-synced contribution graph or recent commits feed.
- **Testimonials**: Quotes from colleagues/collaborators.
- **Learning Roadmap**: Visual "Future Outlook" showing current growth focus.

### E. Contact Hub (Closing the Loop)
- **Direct Access**: LinkedIn, GitHub, and Email.
- **Premium CTA**: "Let's Talk" (Consistent header/footer action).
- **Resume Quick View**: Instant PDF modal/pre-view without downloading.
- **Fallback**: Downloadable traditional Resume (PDF).

### F. Post-Engagement (The Retention Layer)
- **FAQ**: Common technical and professional questions.
- **Feedback Loop**: A simple, high-end form for users to leave thoughts.
- **Testimonial Input**: A dedicated space for recruiters/peers to leave professional endorsements.

### G. Admin Dashboard & Analytics
- **Analytics Development Phase**: Post-MVP focus.
- **Scope**: Section visit counts, engagement metrics, and interactive journey pathing.
- **Moderation**: Admin panel to approve/reject incoming testimonials and feedback.

---

## 📋 5. Pending Tactical Decisions
- [x] Introductory sequence: Typewriter (Deletable) then Fade-in.
- [x] UI Presence Logic: Grace periods and rapid tick-up.
- [x] Bot Defense Strategy: Shadow-ban + UI Toast.
- [x] Admin Security: Session-bound token.
- [x] Architecture: Feature-Sliced Design (FSD).
- [ ] Theme Selection: Dark/Glassmorphism (Primary), Light (Fallback).
- [ ] Journey Funnel Analytics definition.
- [ ] OpenGraph/SEO Strategy: High-fidelity social preview cards.
- [ ] Accessibility (A11y): Keyboard nav, Color contrast, Alt text.
- [ ] Performance: 100/100 Lighthouse score target (WebP, CLS).
- [ ] Verification of Node.js & Firebase CLI installation.

---

## ⚡ 7. Performance & Core Web Vitals
- **Image Strategy**: All assets served as **WebP/AVIF** via Firebase Storage.
- **Layout Stability**: Fixed-dimension placeholders for all dynamic elements (Pulse, Experience Days) to ensure **Zero CLS**.
- **Bundle Optimization**: Route-based code splitting to ensure the "Hook" sequence is < 50kb.
- **Benchmarking**: 100/100 target on Lighthouse for Performance, Accessibility, Best Practices, and SEO.

---

## ♿ 6. Accessibility & Engineering Standards
- **Keyboard Navigation**: 100% reachable via `Tab` with visible focus indicators.
- **Alt Text**: Mandatory descriptions for all project and journey images.
- **Color Contrast**: WCAG AA standard minimum (4.5:1 ratio).
- **Semantic HTML**: Use of `<main>`, `<article>`, `<nav>`, and `<button>` for screen reader clarity.
