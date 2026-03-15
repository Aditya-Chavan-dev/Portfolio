# Navigation & Page Flow — Implementation Spec
**Version:** 2.0
**Status:** Ready for Implementation
**Last Updated:** 2026-03-14
**Depends on:** PRD v1.1, Dynamic Serving Spec v2.0, Admin Entry System

---

## Table of Contents

1. [Route Map](#1-route-map)
2. [Page Inventory](#2-page-inventory)
3. [Complete Flow — Step by Step](#3-complete-flow--step-by-step)
4. [Hub Page — Layout Specification](#4-hub-page--layout-specification)
5. [Back Navigation Rules](#5-back-navigation-rules)
6. [Persistent UI Elements](#6-persistent-ui-elements)
7. [Immersive Journey — Scene Architecture](#7-immersive-journey--scene-architecture)
8. [Testimonials — Display & Submission](#8-testimonials--display--submission)
9. [State That Must Persist](#9-state-that-must-persist)
10. [Mobile-Specific Flow Differences](#10-mobile-specific-flow-differences)
11. [What the IDE Must Never Do](#11-what-the-ide-must-never-do)
12. [Flow Verification Checklist](#12-flow-verification-checklist)

---

## 1. Route Map

```
/                          → Welcome page (dialogue + single CTA)
/hub                       → Hub (name, photo, journey, quick access, testimonials)
/journey                   → Immersive Journey (cinematic, autoplay)
/projects                  → Projects section (sticky nav)
/skills                    → Skills section (sticky nav)
/experience                → Experience / Timeline section (sticky nav)
/about                     → About section (sticky nav)
/testimonial               → Testimonial submission form
/404                       → Not found page
* (any unknown route)      → Redirects to /404
/amgl-3-10                 → Admin login (covert, unlisted)
/amgl-panel                → Admin dashboard (protected)
```

**Rules:**
- `/` is the only entry point for public visitors arriving fresh.
- `/hub` is reachable from: Welcome CTA button, back button on all Quick Access section pages, back button on `/testimonial`, and the "Back to hub" button on `/404`.
- `/journey` is only reachable from `/hub`. Direct URL access → redirect to `/hub`.
- `/testimonial` is reachable from: the "Leave a testimonial" button on `/hub`. Also directly linkable (the owner can share the link).
- `/amgl-3-10` is never linked from any public page — not in nav, not in footer, not in sitemap.
- All unknown routes → `/404`, never directly to `/`.

---

## 2. Page Inventory

| Page | Route | Type | Back destination |
|---|---|---|---|
| Welcome | `/` | Full-screen, one-time dialogue | — (entry point) |
| Hub | `/hub` | Main home base | `/` (browser back only — no in-page back button) |
| Immersive Journey | `/journey` | Cinematic autoplay, full-screen | `/hub` (via exit confirmation modal) |
| Projects | `/projects` | Section page, sticky nav | `/hub` |
| Skills | `/skills` | Section page, sticky nav | `/hub` |
| Experience | `/experience` | Section page, sticky nav | `/hub` |
| About | `/about` | Section page, sticky nav | `/hub` |
| Testimonial form | `/testimonial` | Submission form page | `/hub` |
| 404 | `/404` | Error page | `/hub` |
| Admin Login | `/amgl-3-10` | Covert, full-screen dark | — |
| Admin Panel | `/amgl-panel` | Protected dashboard | — |

---

## 3. Complete Flow — Step by Step

### 3.1 Welcome → Hub

```
User clicks the portfolio link
        ↓
[/] Welcome page loads
  - Full-screen
  - Dialogue animation plays: name, title, tagline, subtle flex
  - Single CTA button appears after animation: "Enter" (or equivalent)
  - sessionStorage key 'has_seen_welcome' checked:
      → Does not exist → play full animation, set key to 'true' after animation ends
      → Exists (user pressed back from Hub) → skip animation,
         show static dialogue + button immediately
        ↓
User clicks CTA
        ↓
[/hub] Hub loads
```

### 3.2 Hub — two paths

```
[/hub] Hub page
  User sees (desktop layout — see Section 4 for full layout):
    - Name + photo at top
    - Left column: Immersive Journey button + Quick Access section cards
    - Right column: Scrolling testimonials strip + "Leave a testimonial" button
        ↓
  ┌─────────────────────────────────┐
  │  Click "Immersive Journey"      │→ navigate to /journey
  └─────────────────────────────────┘

  ┌─────────────────────────────────┐
  │  Click any Quick Access card    │→ navigate to /projects (or /skills,
  │  (Projects / Skills /           │   /experience, /about)
  │   Experience / About)           │  Sticky nav appears on destination page
  └─────────────────────────────────┘

  ┌─────────────────────────────────┐
  │  Click "Leave a testimonial"    │→ navigate to /testimonial
  └─────────────────────────────────┘
```

### 3.3 Path A — Immersive Journey

```
[/journey] loads
  - Full-screen cinematic, autoplays through 8 scenes
  - Each scene: auto-advance timer, "Next →" button, progress bar, scene dots
  - "Exit Journey" button always visible (top area)
        ↓
  User clicks "Exit Journey"  OR  presses browser back
        ↓
  Confirmation modal:
    "Leave the journey?"
    [Continue watching]   [Yes, exit]
        ↓ Yes, exit
  Navigate to /hub

  Journey reaches Scene 8 (final CTA screen)
        ↓
  Three buttons:
    "View my work"    → /projects
    "Contact me"      → /about
    "Back to hub"     → /hub
```

### 3.4 Path B — Quick Access section pages

```
[/projects] (or /skills, /experience, /about)
  - Sticky top nav visible: Projects · Skills · Experience · About
  - Active section dot in nav
  - Back to Hub button (top-left of nav)
  - Light/dark toggle (top-right of nav)
        ↓
  User clicks a different section in sticky nav
        ↓
  Navigate to that section's route
  (Sticky nav stays, active dot updates)
        ↓
  User clicks Back to Hub  OR  browser back
        ↓
  Navigate to /hub

  ── Projects section specific ──
  User clicks a project card
        ↓
  Project detail overlay opens (on top of /projects — no route change)
    - Full content: problem, approach, outcome, tech stack, links
    - "×" close button
    - Browser back also closes overlay
        ↓
  User closes overlay → back on /projects, no navigation
```

### 3.5 Testimonial submission

```
[/testimonial] — reached via "Leave a testimonial" button on Hub
                 OR via direct link the owner shares
  - Standalone page, no sticky nav
  - Back button visible → /hub
  - Form: Name, Role/Relationship, Message (max 300 chars), Email, Consent checkbox
        ↓
  User submits form
        ↓
  Success message shown on same page
  ("Thank you — your testimonial has been submitted for review")
        ↓
  After 3 seconds OR user clicks "Back to portfolio" button
        ↓
  Navigate to /hub

  Submitted testimonial:
    → Stored in Firestore with status: 'pending'
    → Admin reviews and approves from /amgl-panel
    → On approval: status changes to 'approved'
    → Testimonial appears in Hub scrolling strip in real time (onSnapshot)
```

### 3.6 404

```
Any unknown route (e.g. /admin, /dashboard, /random)
        ↓
Redirect to /404
  - Single button: "Back to hub" → /hub
  - Light/dark toggle visible
  - No nav, no other links
```

### 3.7 Admin entry

```
Option A — URL:
  User visits /amgl-3-10 directly (bookmarked)
        ↓
  Full-page dark login screen
    → Auth success → /amgl-panel
    → Already authenticated → skip login, redirect to /amgl-panel

Option B — Logo click ×5:
  User clicks name/logo on any Quick Access section page 5× fast
        ↓
  Login modal overlays the current page
    → Auth success → /amgl-panel
    → Dismiss → modal closes, stays on current page

Option C — Konami code:
  User types ↑↑↓↓←→←→BA anywhere on public site
        ↓
  Login modal overlays the current page
    → Same behaviour as Option B
```

---

## 4. Hub Page — Layout Specification

### Desktop layout

```
┌──────────────────────────────────────────────────────────────────┐
│                                                                  │
│   [Photo]   Your Name                          [☀/☾ toggle]     │
│             Title / Tagline                                      │
│                                                                  │
├─────────────────────────────────────┬────────────────────────────┤
│                                     │                            │
│  ┌───────────────────────────────┐  │   Testimonials             │
│  │    Immersive Journey  →       │  │   (scrolling upward,       │
│  └───────────────────────────────┘  │    auto-pauses on hover)   │
│                                     │                            │
│  Quick Access                       │   ┌──────────────────┐    │
│  ┌──────────┐  ┌──────────┐         │   │ Testimonial card │    │
│  │ Projects │  │  Skills  │         │   └──────────────────┘    │
│  └──────────┘  └──────────┘         │   ┌──────────────────┐    │
│  ┌──────────┐  ┌──────────┐         │   │ Testimonial card │    │
│  │Experience│  │  About   │         │   └──────────────────┘    │
│  └──────────┘  └──────────┘         │   ┌──────────────────┐    │
│                                     │   │ Testimonial card │    │
│                                     │   └──────────────────┘    │
│                                     │                            │
│                                     │  [Leave a testimonial →]  │
│                                     │                            │
└─────────────────────────────────────┴────────────────────────────┘
```

**Left column (60% width):**
- Photo + name + title/tagline at top — no animation, static
- Immersive Journey button — full width of left column, prominent
- Quick Access label
- 2×2 grid of clickable section cards: Projects, Skills, Experience, About
- Each card: section name + a short descriptor (e.g. "Projects — What I've built")
- Clicking any card → navigates to that section's route

**Right column (40% width):**
- Testimonials strip — vertical, scrolls upward automatically (CSS scroll animation)
- Pauses completely on mouse hover — resumes when mouse leaves
- If no approved testimonials exist → placeholder card: "Testimonials will appear here once approved"
- "Leave a testimonial →" button at the bottom of the right column → navigates to `/testimonial`

**Light/dark toggle:** top-right corner of the page, always visible.

---

### Mobile layout

```
┌──────────────────────────────┐
│  [Photo]  Your Name  [☀/☾]  │
│           Title              │
├──────────────────────────────┤
│                              │
│  ┌────────────────────────┐  │
│  │   Immersive Journey →  │  │
│  └────────────────────────┘  │
│                              │
│  Quick Access                │
│  ┌──────────┐ ┌──────────┐  │
│  │ Projects │ │  Skills  │  │
│  └──────────┘ └──────────┘  │
│  ┌──────────┐ ┌──────────┐  │
│  │Experience│ │  About   │  │
│  └──────────┘ └──────────┘  │
│                              │
├──────────────────────────────┤
│  Testimonials                │
│  ◀ ─────────────────────── ▶ │
│  (scrolls sideways,          │
│   stops on finger press)     │
│                              │
│  [Leave a testimonial →]     │
└──────────────────────────────┘
```

**Mobile specifics:**
- Single column layout
- Testimonials section sits below Quick Access section cards
- Testimonials scroll horizontally (left/right swipe)
- Stops scrolling when user places finger on the strip (touch hold)
- Resumes scrolling 1 second after finger lifts
- "Leave a testimonial →" button sits below the testimonials strip
- No split-column layout — everything stacks vertically

---

## 5. Back Navigation Rules

### Core rule
Every page has one defined back destination. The in-page back button and the browser `←` button always go to the same place. They must never diverge.

### Back destination per page

| Current page | In-page back | Browser back | Implementation |
|---|---|---|---|
| `/` Welcome | No back button | Exits the site (browser default) | No action needed |
| `/hub` | No back button | Goes to `/` (static Welcome) | Natural history — let browser handle |
| `/journey` | "Exit Journey" + confirmation modal | Same confirmation modal | `useBlocker` intercepts browser back |
| `/projects` | Back button → `/hub` | → `/hub` | Explicit `navigate('/hub')` |
| `/skills` | Back button → `/hub` | → `/hub` | Explicit `navigate('/hub')` |
| `/experience` | Back button → `/hub` | → `/hub` | Explicit `navigate('/hub')` |
| `/about` | Back button → `/hub` | → `/hub` | Explicit `navigate('/hub')` |
| `/testimonial` | Back button → `/hub` | → `/hub` | Explicit `navigate('/hub')` |
| `/404` | "Back to hub" → `/hub` | → `/hub` | Explicit `navigate('/hub')` |
| Project overlay (on `/projects`) | "×" close → stays on `/projects` | Closes overlay, stays on `/projects` | Router state or hash to represent overlay |

### Welcome one-time animation rule

```
sessionStorage key: 'has_seen_welcome'

Mount Welcome page:
  key absent  → play full animation → set key = 'true' after animation
  key present → skip animation, show static content + button immediately

Why sessionStorage and not localStorage:
  localStorage = returning visitor NEVER sees Welcome again (wrong)
  sessionStorage = clears on tab close, so each new session sees Welcome (correct)
```

### Journey browser-back interception

```tsx
const blocker = useBlocker(({ currentLocation, nextLocation }) =>
  currentLocation.pathname === '/journey' &&
  nextLocation.pathname !== '/journey'
)
// blocker.state === 'blocked' → show confirmation modal
// Modal "Yes, exit" → blocker.proceed() → navigate to /hub
// Modal "Continue watching" → blocker.reset()
```

---

## 6. Persistent UI Elements

### Light / dark toggle

| Page | Position |
|---|---|
| `/` Welcome | Top-right corner |
| `/hub` | Top-right corner |
| `/journey` | Top-right corner (next to Exit button) |
| `/projects`, `/skills`, `/experience`, `/about` | Inside sticky top nav, right side |
| `/testimonial` | Top-right corner |
| `/404` | Top-right corner |

**Behaviour:**
- Toggles immediately, applies to entire app
- Persists in `localStorage` key `'theme'`
- Default on first visit: system `prefers-color-scheme`

### Sticky top nav (Quick Access section pages only)

Visible on: `/projects`, `/skills`, `/experience`, `/about`
Not visible on: `/`, `/hub`, `/journey`, `/testimonial`, `/404`, admin pages

Contains (left to right):
- Back to Hub `←` button (left)
- Section links: Projects · Skills · Experience · About (centre)
- Active section dot indicator (below or beside section links)
- Light/dark toggle (right)

### Back button (in-page)

Visible on: `/projects`, `/skills`, `/experience`, `/about`, `/testimonial`, `/404`
Always navigates to `/hub` via explicit `navigate('/hub')`.

---

## 7. Immersive Journey — Scene Architecture

Full-screen, autoplays. Each scene has an 8-second auto-advance timer. Timer pauses when user is interacting (hover, touch). Resumes 2 seconds after last interaction.

### Progress controls

```
┌────────────────────────────────────────────────────────────┐
│ [Exit Journey]    ● ● ● ● ○ ○ ○ ○    Scene 4/8    [☀/☾]  │
│                                                             │
│              (scene content — full viewport)                │
│                                                             │
│                                           [Next →]         │
│ ████████████████░░░░░░░░░░░░░░░░░░░░░░░                    │
└────────────────────────────────────────────────────────────┘
```

- **Progress bar:** fills continuously left to right across all 8 scenes combined
- **Scene dots:** filled = visited, pulsing = current, empty = upcoming
  - Clicking a past dot → replays that scene
  - Clicking a future dot → disabled, no action
- **Next button:** skips remaining timer on current scene, advances immediately
- **Exit Journey button:** always visible, triggers confirmation modal

### Scene list

| # | Scene | Content |
|---|---|---|
| 1 | Opening | Name, title, one-line mission or philosophy — cinematic type reveal |
| 2 | Origin | Where you started, what got you into tech |
| 3 | The Builder | What you build, what problems you solve, your domain |
| 4 | Experience | Headline moments from your work history — not a full CV |
| 5 | Projects | 2–3 hero projects — name, one-liner, outcome. Clicking a project opens the same detail overlay as Quick Access |
| 6 | Skills | Core technical skills visualised — not a list, something that feels like a signature |
| 7 | The Human | What drives you beyond code — personal, warm, contrasts earlier scenes |
| 8 | CTA | "Let's build something." Contact details. Three buttons: "View my work" → `/projects`, "Contact me" → `/about`, "Back to hub" → `/hub` |

---

## 8. Testimonials — Display & Submission

### Display (Hub page)

**Data source:** Firestore `/testimonials` collection, filtered by `status == 'approved'`, ordered by approval date descending.

**Real-time:** Uses `onSnapshot` — when admin approves a testimonial, it appears on the Hub without a page refresh.

**Desktop behaviour:**
- Vertical strip on the right column of the Hub
- Auto-scrolls upward continuously (CSS `animation` on the container)
- On mouse hover → scroll animation pauses completely
- On mouse leave → scroll resumes
- Each card: name, relationship, message (truncated to 3 lines with expand on click), date

**Mobile behaviour:**
- Horizontal strip below the Quick Access cards
- Auto-scrolls sideways (left to right) continuously
- On touch hold (touchstart) → scroll pauses
- On touch release (touchend) → scroll resumes after 1 second
- User can also manually swipe left/right

**Empty state (no approved testimonials yet):**
- Shows a single placeholder card
- Desktop: "Testimonials will appear here once approved"
- Mobile: same, styled to match the card format
- Placeholder disappears automatically when the first testimonial is approved

### Submission flow

```
User clicks "Leave a testimonial →" on Hub
        ↓
[/testimonial] loads
  Form fields:
    - Name (required)
    - Role / Relationship to owner (required) — e.g. "Hackathon teammate", "Mentor"
    - Message (required, max 300 characters, live counter shown)
    - Email (required, not shown publicly — for verification only)
    - Consent checkbox (required):
      "I agree my name and message may be displayed on this portfolio"
        ↓
  User submits
        ↓
  Stored in Firestore: { name, role, message, email, status: 'pending', submittedAt }
        ↓
  Success message shown on same page
  "Thank you — your testimonial has been submitted for review"
        ↓
  After 3 seconds OR user clicks "Back to portfolio →"
        ↓
  Navigate to /hub

Admin flow (in /amgl-panel):
  Admin sees pending testimonials list
  Clicks Approve → status changes to 'approved' → appears on Hub in real time
  Clicks Reject → status changes to 'rejected' → never shown publicly
```

---

## 9. State That Must Persist

| State | Storage | Key | Clears when |
|---|---|---|---|
| Has seen Welcome dialogue | `sessionStorage` | `has_seen_welcome` | Browser tab closes |
| Light / dark theme | `localStorage` | `theme` | User toggles again |
| Journey scene progress | React state only | — | Page refresh (intentional — journey restarts) |
| Firebase auth session | Firebase SDK (IndexedDB) | — | Managed by Firebase automatically |

---

## 10. Mobile-Specific Flow Differences

| Element | Desktop | Mobile |
|---|---|---|
| Hub layout | Left column (journey + cards) + right column (testimonials) | Single column — testimonials below cards, scroll sideways |
| Quick Access nav on sections | Sticky top nav | Fixed bottom nav bar with icons |
| Back to Hub | Button in sticky top nav (left) | Back arrow in top-left header |
| Project detail | Centered modal overlay | Full-screen bottom sheet (slides up) |
| Journey navigation | Next button + scene dots | Next button + left/right swipe |
| Journey Exit button | Text button top area | Icon button (×) top-right |
| Confirmation modal | Centered card modal | Bottom sheet modal |
| Testimonial scroll | Vertical, auto-scrolls up, pauses on hover | Horizontal, auto-scrolls sideways, pauses on touch hold |

---

## 11. What the IDE Must Never Do

- **Never use `navigate(-1)` for in-page back buttons on section pages.** Always use explicit `navigate('/hub')`. History stacks are unpredictable — a user could have arrived at `/projects` from the Journey CTA or directly.
- **Never allow `/journey` to load without the user coming from `/hub`.** Add a route guard — direct URL access redirects to `/hub`.
- **Never skip the Exit Journey confirmation modal** — not on mobile back gesture, not on browser back button. `useBlocker` must intercept all navigation away from `/journey`.
- **Never use `localStorage` for `has_seen_welcome`.** Must be `sessionStorage`.
- **Never show the sticky top nav on `/`, `/hub`, `/journey`, `/testimonial`, or `/404`.**
- **Never redirect unknown routes to `/`.** Always to `/404`.
- **Never advance Journey to a future scene dot that hasn't been reached yet.** Future dots are display-only.
- **Never show the testimonial submission form on the Hub page directly.** It lives at `/testimonial`. The Hub only has the "Leave a testimonial →" button.
- **Never show the testimonial strip as empty white space** when there are no approved testimonials — always show the placeholder card.
- **Never display a pending or rejected testimonial on the Hub.** Only `status == 'approved'` testimonials are shown.

---

## 12. Flow Verification Checklist

### Welcome
- [ ] First visit → full animation plays
- [ ] Browser back from Hub → static version loads (no animation)
- [ ] CTA button → navigates to `/hub`
- [ ] `has_seen_welcome` set in `sessionStorage` after animation
- [ ] Close tab, reopen → animation plays again

### Hub
- [ ] Name, photo, title visible at top
- [ ] Light/dark toggle visible and functional
- [ ] "Immersive Journey" button → `/journey`
- [ ] All 4 Quick Access cards visible and clickable
- [ ] Projects card → `/projects`, Skills → `/skills`, Experience → `/experience`, About → `/about`
- [ ] Testimonials strip visible (desktop: right column, mobile: below cards)
- [ ] Desktop: testimonials auto-scroll upward, pause on hover, resume on mouse leave
- [ ] Mobile: testimonials auto-scroll sideways, pause on touch hold, resume after touch release
- [ ] No approved testimonials → placeholder card shown
- [ ] "Leave a testimonial →" button → `/testimonial`
- [ ] Approved testimonial in Firestore → appears on Hub without refresh

### Immersive Journey
- [ ] Direct URL `/journey` → redirects to `/hub`
- [ ] Loads only via Hub button
- [ ] Autoplays through all 8 scenes
- [ ] Timer pauses on hover/touch, resumes after 2s
- [ ] "Next →" advances immediately
- [ ] Past scene dots replay scene on click
- [ ] Future scene dots are non-interactive
- [ ] Progress bar fills continuously
- [ ] "Exit Journey" → confirmation modal
- [ ] Browser back → same confirmation modal
- [ ] Modal "Continue" → journey resumes
- [ ] Modal "Exit" → `/hub`
- [ ] Scene 8 CTA buttons navigate correctly

### Quick Access sections
- [ ] Sticky nav visible on all 4 section pages
- [ ] Back to Hub button → explicit `/hub` navigation
- [ ] Browser back from any section → `/hub`
- [ ] Active dot updates on section change
- [ ] Clicking nav links navigates between sections
- [ ] Project card → overlay opens, no route change
- [ ] Overlay close / browser back → closes overlay, stays on `/projects`

### Testimonial page
- [ ] Reachable from Hub button
- [ ] Reachable via direct link
- [ ] Back button → `/hub`
- [ ] Form requires all fields + consent before submit is enabled
- [ ] Character counter visible on message field
- [ ] Submission → Firestore with `status: 'pending'`
- [ ] Success message shown on same page
- [ ] After 3s or button click → `/hub`
- [ ] Browser back after submission → `/hub` (not form again)

### 404
- [ ] `/admin`, `/dashboard`, `/random` → `/404`
- [ ] "Back to hub" → `/hub`
- [ ] `/` never used as fallback route

### Testimonials admin flow
- [ ] Pending testimonial visible in admin panel
- [ ] Approve action → `status: 'approved'` → appears on Hub in real time
- [ ] Reject action → `status: 'rejected'` → never appears publicly

### Theme persistence
- [ ] Toggle on any page → applies across all pages instantly
- [ ] `theme` key in `localStorage`
- [ ] First visit → system preference used

### Mobile
- [ ] Hub: single column, testimonials below cards
- [ ] Section pages: bottom nav bar instead of sticky top nav
- [ ] Back to Hub: top-left back arrow
- [ ] Project detail: bottom sheet, not centered modal
- [ ] Journey: swipe advances/retreats scenes
- [ ] OS back gesture = in-page back behaviour

### Admin
- [ ] `/amgl-3-10` not linked anywhere public
- [ ] Konami code → login modal on any public page
- [ ] Logo click ×5 → login modal
- [ ] Login success → `/amgl-panel`
- [ ] Unauthenticated `/amgl-panel` → `/amgl-3-10`

---

*Related documents:*
- *PRD v1.1 — Interactive Developer Portfolio*
- *Dynamic Serving Spec v2.0*
- *Admin Entry System — Implementation Prompt*
- *Next: Visual Design & Component Spec*
