# Task: Admin Entry System (Covert Implementation)
**Created:** 2026-03-14
**Tier:** 2
**Status:** In Planning

---

## Context Summary — Admin Entry System

**Tier:** 2

**What already exists relevant to this task:**
- `package.json` with dependencies for `react-router-dom`, `firebase`, and `framer-motion`.
- `src/App.tsx` and `src/LandingPage/` (basic UI).
- `.env` file (currently without `VITE_ADMIN_EMAIL`).

**Dependencies and affected areas:**
- `src/hooks/` (New: `useKonami`, `useEasterEgg`)
- `src/pages/` (New: `AdminLoginPage.jsx`, `AdminPanel.jsx`)
- `src/components/` (New: `AdminLoginModal.jsx`, `EasterEggWrapper.jsx`, `RequireAuth.jsx`)
- `src/App.tsx` (Modified: Routing and Wrapper)
- `src/LandingPage/LandingPage.tsx` or new Nav component (Modified: Trigger point)
- `public/robots.txt` (Modified: Disallow)

**Spec vs Reality gaps found:**
- **Prompt vs Specs:** `ADMIN_WORKFLOW_SPEC` suggests `/admin`, but the user prompt requires a covert `/amgl-3-10` route and special triggers.
- **Prompt vs Codebase:** The prompt assumes `App.jsx` + Router + `firebase.js` + Nav exist. Reality: These are missing or named differently (`App.tsx`). I will initialize them as part of the "additive" work.

**Hidden config files relevant to this task:**
- `.env` → Controls the authorized admin email.

**Existing partial implementations found:**
- None.

**Key constraints or risks identified:**
- **Zero-Ambiguity:** Must follow the triple-entry logic exactly (Unlisted URL, Logo 5x click, Konami code).
- **Security:** Logic must match `VITE_ADMIN_EMAIL` before Firebase call. Firebase Auth is the final gate.
- **Aesthetics:** Terminal style for login, totally hidden for public.

---

## Scope Boundary
What is explicitly IN scope for this task:
- Setup of Firebase (`src/firebase.ts`) and React Router in `App.tsx`.
- Implementation of the 3 entry triggers (URL, Easter Egg, Konami).
- Creation of the Login Page/Modal and Auth Guard.
- Creation of a placeholder Admin Panel at `/amgl-panel`.
- Updating `robots.txt` and `.env`.

What is explicitly OUT of scope (do not touch):
- Modifying existing public-facing UI/Styles.
- Changing existing routes.
- Writing the full Admin Dashboard content (beyond a placeholder).

---

## Plan

### Foundation & Triggers
- [x] **[T1.1]** Create `src/firebase.ts` and initialize Firebase Auth (using `import.meta.env`). — *Definition of done: `auth` export is ready.*
- [x] **[T1.2]** Create `src/hooks/useKonami.js` and `src/hooks/useEasterEgg.js` with specific timing/sequence logic. — *Definition of done: Hooks match precisely the timing/reset rules.*
- [x] **[T1.3]** Do NOT create a new Nav component. Instead, find the element rendering the owner's name in `src/LandingPage/LandingPage.tsx` for trigger attachment later. — *Definition of done: Attachment target identified in LandingPage.*

### Pages & Components
- [x] **[T2.1]** Implement `src/pages/AdminLoginPage.tsx` (Form + Page) with the terminal aesthetic and email pre-check. — *Definition of done: Login rejects non-admin emails instantly.*
- [x] **[T2.2]** Implement `src/components/AdminLoginModal.tsx` and `src/components/EasterEggWrapper.tsx` for the covert overlays. — *Definition of done: Triggers open the modal silently.*
- [x] **[T2.3]** Implement `src/components/RequireAuth.tsx` and `src/pages/AdminPanel.tsx` (placeholder). — *Definition of done: `/amgl-panel` redirects to login if unauthed.*

### Integration & Security
- [x] **[T3.1]** Update `src/main.tsx` (or `src/App.tsx` if missing in main) to integrate `BrowserRouter`. Then wrap public routes in `EasterEggWrapper`. — *Definition of done: App compiles and routes function without nesting errors.*
- [x] **[T3.2]** Attach `logoTrigger` to the Nav/LandingPage name element. — *Definition of done: 5x click opens modal.*
- [x] **[T3.3]** Update `public/robots.txt` and `.env`. — *Definition of done: Config is updated.*

---

## Rollback Plan
If execution fails or is abandoned midway:
- Delete `src/hooks/`, `src/pages/Admin*`, and `src/components/Admin*` files.
- Revert `App.tsx` and `main.tsx` to the current state.
- Remove `VITE_ADMIN_EMAIL` from `.env`.

---

## Risk Flags (for user review)
- [T3.1] — Modifying the root `App.tsx` to add a wrapper might affect performance or context if not handled carefully.
- [T2.1] — Terminal aesthetic relies on hardcoded CSS/Tailwind values; need to ensure it matches the "WOW" factor.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | Context Summary written. |
| User Approval | ✅ Approved | v2 Plan approved by user. |
| Execution | ✅ Done | Implemented TSX components, hooks, and routing. |
| Completion | ✅ Done | Covert system ready for testing. |
