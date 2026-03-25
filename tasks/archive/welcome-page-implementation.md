# Task: Welcome Page Implementation (Typewriter Rewrite)
**Created:** 2026-03-16
**Tier:** 2 (Feature)
**Status:** ⚠️ Plan Revised — Pending Re-approval

---

## Context Summary — Welcome Page Implementation

**Tier:** 2 (Feature)

**What already exists relevant to this task:**
- `src/LandingPage/` — **empty** (user deleted all old files manually)
- `src/components/ui/ThemeToggle.tsx` — placeholder, zero imports in codebase (safe to rewrite)
- `src/components/ui/Button.tsx` — not used by new landing page
- `src/pages/HubPage.tsx` — placeholder page for `/hub`
- `src/App.tsx` — routes `/` to `<LandingPage />`, `/hub` to `<HubPage />`
- `index.html` — loads wrong Google Fonts (needs update)

**Dependencies and affected areas:**
- `src/App.tsx` → imports `{ LandingPage }` from `./LandingPage` (currently broken — source deleted)
- `src/index.css` → Tailwind v4 theme tokens (obsidian/gold palette)
- `index.html` → Google Fonts link needs updating
- `ThemeToggle.tsx` → zero consumers, safe to rewrite

**Spec vs Reality gaps found:**
- Prompt says `.jsx` → project is TypeScript, will use `.tsx`
- Prompt says `src/features/LandingPage/` → project uses `src/LandingPage/`
- Dynamic serving must use User-Agent detection, not window.innerWidth
- First-visit theme default: spec says dark, but should fall back to `prefers-color-scheme` before hardcoded dark

**Key constraints:**
- `landing-tokens.css` must be imported once centrally (in `index.css`), not per CSS module
- ThemeToggle `stopPropagation` is mandatory to prevent accidental navigation

---

## Scope Boundary
**IN scope:**
- Creating all files in `src/LandingPage/` from scratch (directory is empty)
- `content/dialogue.json`, `index.tsx`, `WelcomeDesktop.tsx`, `WelcomeMobile.tsx`, CSS modules
- Rewriting `ThemeToggle.tsx`
- Updating `index.html` Google Fonts
- Adding `landing-tokens.css` (imported once in `index.css`)
- Updating `App.tsx` import

**OUT of scope:**
- `/hub` page, admin panel, Firebase, Button.tsx, EasterEggWrapper

---

## Plan

### Phase 1 — Foundation (all [NEW] files)
- [ ] **[T1.1]** Create `src/LandingPage/content/dialogue.json` — *DoD: matches spec JSON shape exactly*
  - Effort: S | Depends: none

- [ ] **[T1.2]** Create `src/LandingPage/landing-tokens.css` with dark/light CSS custom properties — *DoD: tokens defined*
  - Effort: S | Depends: none

- [ ] **[T1.3]** Import `landing-tokens.css` in `src/index.css` (single central import, no duplication) — *DoD: tokens available globally*
  - Effort: S | Depends: T1.2

- [ ] **[T1.4]** Update `index.html` Google Fonts: Cormorant Garamond (300,400,500 normal + 300 italic) + JetBrains Mono (300,400) — *DoD: fonts load*
  - Effort: S | Depends: none

### Phase 2 — ThemeToggle Rewrite
- [ ] **[T2.1]** Rewrite `ThemeToggle.tsx`: localStorage read/write, `data-theme` attribute, `☽`/`☀` toggle, dynamic `aria-label`, `stopPropagation`, `prefers-color-scheme` fallback when no localStorage value exists — *DoD: theme persists, respects OS preference on first visit, aria-label correct*
  - Effort: M | Depends: T1.2

### Phase 3 — Desktop Component
- [ ] **[T3.1]** Create `src/LandingPage/WelcomeDesktop.module.css` — 3-row grid, 100vh, 64px padding, noise overlay, cursor blink animations — *DoD: layout matches spec wireframe*
  - Effort: M | Depends: T1.2, T1.4

- [ ] **[T3.2]** Create `src/LandingPage/WelcomeDesktop.tsx` — typewriter (45ms/char, 300ms pause, blinking cursor), Enter×2 skip (800ms), CTA fade-in (600ms+400ms), any-keypress→fade-out→/hub, aria-live, all text from dialogue.json — *DoD: all desktop behaviours work*
  - Effort: L | Depends: T1.1, T2.1, T3.1

### Phase 4 — Mobile Component
- [ ] **[T4.1]** Create `src/LandingPage/WelcomeMobile.module.css` — 3-row grid, 100svh, 28px/clamp padding, mobile fonts, 44px toggle target — *DoD: layout matches mobile wireframe*
  - Effort: M | Depends: T1.2, T1.4

- [ ] **[T4.2]** Create `src/LandingPage/WelcomeMobile.tsx` — same typewriter logic, double-tap skip (600ms), tap-anywhere→/hub, mobile CTA text, all text from dialogue.json — *DoD: all mobile behaviours work*
  - Effort: L | Depends: T1.1, T2.1, T4.1

### Phase 5 — Integration
- [ ] **[T5.1]** Create `src/LandingPage/index.tsx` — User-Agent based device detection via `navigator.userAgent` (checks for mobile/tablet UA strings), serves `WelcomeDesktop` or `WelcomeMobile`. Named export `LandingPage`. — *DoD: correct component renders per device type*
  - Effort: S | Depends: T3.2, T4.2

- [ ] **[T5.2]** Update `src/App.tsx` import to match new export — *DoD: app builds, routes work*
  - Effort: S | Depends: T5.1

### Phase 6 — Verification
- [ ] **[T6.1]** `npm run build` → zero errors — *DoD: clean build*
  - Effort: S | Depends: T5.2

- [ ] **[T6.2]** `npm run dev` → visual verification: typewriter plays, skip works, CTA appears, theme toggle works (including OS preference fallback), navigation to /hub works — *DoD: all animations and interactions correct*
  - Effort: M | Depends: T6.1

- [ ] **[T6.3]** JSON content change test: modify `dialogue.json` text → verify UI reflects change without touching any `.tsx` file — *DoD: proves JSON is the single source of truth*
  - Effort: S | Depends: T6.2

---

## Rollback Plan
- Delete all new files in `src/LandingPage/`
- Revert `ThemeToggle.tsx`, `index.html`, `App.tsx`, `index.css` from git

---

## Risk Flags
- [T2.1] — `document.documentElement.setAttribute` may flash on mount → use `useLayoutEffect`
- [T3.2/T4.2] — Complex animation state machine with refs/timeouts → thorough cleanup in useEffect return
- [T5.1] — UA detection is imperfect (some tablets report desktop UAs) — acceptable trade-off per spec

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning v1 | ✅ Done | 2026-03-16 |
| User Feedback | ✅ Received | 5 fixes applied |
| Planning v2 | ✅ Done | 2026-03-16 — revised per feedback |
| User Approval | ⏳ Pending | |
| Execution | — | |
| Completion | — | |
