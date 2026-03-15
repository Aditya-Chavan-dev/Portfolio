# Task: Landing Page Scaffold
**Created:** 2026-03-15
**Tier:** 2
**Status:** Pending User Approval

---

## Context Summary Reference
**Tier:** 2 (Feature)
**What already exists:** `package.json` with React, Vite, Tailwind v4. `src/styles/tokens.css` and `global.css` (assumed active from previous task).
**Dependencies:** `react-router-dom` for navigation, `framer-motion` for animations.
**Spec vs Reality gap:** None found.
**Constraints/Risks:** Strict timing for the entry animation (1200ms `dur-dramatic`). SessionStorage check must occur before render to prevent FOUC of the animation.

---

## Scope Boundary
What is explicitly IN scope for this task:
- Installing `react-router-dom` (if not present).
- Creating the `src/LandingPage/` directory structure.
- Creating `src/LandingPage/WelcomeMobile.tsx` and `src/LandingPage/WelcomeDesktop.tsx`.
- Creating `src/LandingPage/WelcomeDialogue.json` to store the animation dialogue.
- Creating an entry index file to dynamically serve the correct component based on screen width/device type.
- Creating the primary CTA `<Button>` component (`src/components/ui/Button.tsx`).
- Setting up the main router in `App.tsx` (routing `/` to Welcome, `/hub` to a currently blank page).
- Implementing the `sessionStorage` logic for `has_seen_welcome`.
- Implementing the 1200ms entry animation using `framer-motion`.
- Ensuring the light/dark toggle is present (even if hardcoded logic for now, UI must exist).

What is explicitly OUT of scope (do not touch):
- Building the actual `/hub`, `/projects`, or any other section.
- Building the backend or Admin panel.

---

## Plan

### Foundation
- [ ] **[T1.1]** Check `package.json` for `react-router-dom` and `framer-motion`. Install if missing. — *Definition of done: Dependencies are present and ready.*
  - Estimated effort: S
  - Depends on: none
  - External blocker: none

- [ ] **[T1.2]** Set up basic routing in `src/App.tsx`. Define routes for `/` (Welcome) and `/hub` (Placeholder). — *Definition of done: Navigating between `/` and `/hub` manually in the address bar works without 404.*
  - Estimated effort: S
  - Depends on: T1.1
  - External blocker: none

### Components
- [ ] **[T2.1]** Create `src/components/ui/Button.tsx`. Implement the primary button styling (`.btn-primary`) exactly as specified in `DESIGN_SYSTEM.md`. — *Definition of done: Reusable `<Button variant="primary">` is available.*
  - Estimated effort: S
  - Depends on: none
  - External blocker: none

- [ ] **[T2.2]** Create a `ThemeToggle` component (placeholder for now, just the UI `[☀/☾]`) to place in the top right of the Welcome page. — *Definition of done: Visual toggle exists.*
  - Estimated effort: S
  - Depends on: none
  - External blocker: none

### The Welcome Page (Landing Directory)
- [ ] **[T3.1]** Create `src/LandingPage/WelcomeDialogue.json` to store the dialogue content ("name", "title", "tagline", "cta_text") so text is separated from logic. — *Definition of done: JSON file exists with correct content keys.*
  - Estimated effort: S
  - Depends on: none
  - External blocker: none

- [ ] **[T3.2]** Create `src/LandingPage/WelcomeDesktop.tsx` and `src/LandingPage/WelcomeMobile.tsx`. Scaffold the specific layouts for each device type (handling padding differences, font scaling differences if necessary, and positioning). — *Definition of done: Both components exist and render static content loaded from the JSON.*
  - Estimated effort: M
  - Depends on: T2.1, T2.2, T3.1
  - External blocker: none

- [ ] **[T3.3]** Create `src/LandingPage/index.tsx` (or similar entry file). Implement dynamic serving logic (typically via a `useMediaQuery` hook checking viewport width against a breakpoint, e.g., 768px) to serve either the Mobile or Desktop component. — *Definition of done: The app serves the correct component based on resizing the window/device type.*
  - Estimated effort: S
  - Depends on: T3.2
  - External blocker: none

- [ ] **[T3.4]** Implement the `sessionStorage` check (`has_seen_welcome`) in the landing page components. — *Definition of done: State accurately reflects whether the animation should play.*
  - Estimated effort: S
  - Depends on: T3.3
  - External blocker: none

- [ ] **[T3.5]** Implement `framer-motion` enter animations on text elements and button. Apply conditionally based on T3.4 state. — *Definition of done: Animation plays on first visit, skips on subsequent (while session is active).*
  - Estimated effort: M
  - Depends on: T3.2, T3.4
  - External blocker: none

- [ ] **[T3.6]** Wire the "Enter" button to `navigate('/hub')`. — *Definition of done: Clicking enter navigates to the hub placeholder.*
  - Estimated effort: S
  - Depends on: T1.2, T3.2
  - External blocker: none

---

## Rollback Plan
- Revert `App.tsx` configuration to its previous state.
- Delete `src/LandingPage/` and `src/components/ui`.
- Uninstall `react-router-dom` if it was added in T1.1.

---

## Risk Flags (for user review)
- [T3.3] — Dynamic serving based solely on a window resize event listener / useMediaQuery might cause a slight flash on initial load depending on SSR/SSG. Since this is purely client-side Vite, standard `window.matchMedia` is fine.
- [T3.5] — Relying heavily on specific animation curves. If framer-motion conflicts with strict CSS performance rules, it might cause jank. Sticking strictly to transform/opacity.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ⏳ Pending | |
| Execution | — | |
| Completion | — | |
