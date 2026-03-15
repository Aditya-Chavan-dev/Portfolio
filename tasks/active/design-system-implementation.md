# Task: Design System Implementation
**Created:** 2026-03-15
**Tier:** 3
**Status:** Pending User Approval

---

## Context Summary Reference
**Tier:** 3 (Architectural)
**What already exists:** `package.json` shows Tailwind CSS v4 is installed (not v3). `index.css` exists in `src/`. No `src/styles` directory exists yet.
**Dependencies:** `main.tsx`, `index.html`, Tailwind configuration.
**Spec vs Reality gap:** `DESIGN_SYSTEM.md` (Section 25) explicitly specifies "Tailwind CSS 3.x" and mentions `tailwind.config.js`. The codebase uses `"@tailwindcss/vite": "^4.1.18"` (Tailwind v4), which does *not* use `tailwind.config.js` by default and instead uses CSS-based `@theme` variables.

---

## Scope Boundary
What is explicitly IN scope for this task:
- Extracting variables from `DESIGN_SYSTEM.md` into `src/styles/tokens.css` and mapping them to Tailwind v4.
- Creating `src/styles/global.css` for typography, resets, and CSS animations.
- Updating `index.html` with the FOUC prevention script and font imports.
- Updating `src/main.tsx` to import the new stylesheets globally.

What is explicitly OUT of scope (do not touch):
- Implementing React components (buttons, nav, overlays) — this strictly focuses on the foundational CSS variables and global rules.
- Scaffolding new pages.

---

## Plan

### Core CSS Architecture
- [ ] **[T1.1]** Create `src/styles/tokens.css`. Extract all CSS variables (`--color-*`, `--sp-*`, `--r-*`, etc.), Keyframes, and light mode overrides from DESIGN_SYSTEM.md. — *Definition of done: File exists with correct tokens matching the spec.*
  - Estimated effort: S
  - Depends on: none
  - External blocker: none

- [ ] **[T1.2]** Create `src/styles/global.css`. Extract typography settings, number rendering, text decoration, alignment, focus rings, etc., from DESIGN_SYSTEM.md. — *Definition of done: File exists with global resets and layout rules matching the spec.*
  - Estimated effort: S
  - Depends on: T1.1
  - External blocker: none

### Integration
- [ ] **[T2.1]** Update `src/index.css` to support Tailwind v4 theming using the exact tokens from our design system. Map them into the `@theme` block so Tailwind classes (like `bg-primary`) apply exactly to `--color-bg-primary`. — *Definition of done: Tailwind classes reflect the design system tokens.*
  - Estimated effort: S
  - Depends on: T1.1
  - External blocker: none

- [ ] **[T2.2]** Update `index.html` to inject the FOUC prevention script inside `<head>` and add Google Fonts preconnect links. — *Definition of done: HTML markup matches spec and theme toggle script is present.*
  - Estimated effort: S
  - Depends on: none
  - External blocker: none

- [ ] **[T2.3]** Modify `src/main.tsx` to import the new `tokens.css` and `global.css` before other files (as defined in the CSS architecture law). — *Definition of done: The app compiles successfully with the new stylesheets imported.*
  - Estimated effort: S
  - Depends on: T1.2, T2.1, T2.2
  - External blocker: none

---

## Rollback Plan
If execution fails or is abandoned midway:
- Delete `src/styles/tokens.css` and `src/styles/global.css`.
- Revert `src/main.tsx` to its previous state.
- Revert `index.html` to remove the script and font tags.
- Revert `src/index.css` to standard Tailwind installation.

---

## Risk Flags (for user review)
High-impact or high-risk tasks that the user should scrutinise before approving:
- [T2.1] — Tailwind v4 uses a very different theme configuration (`@theme` in CSS instead of `tailwind.config.js`). We will use v4 CSS variables mapping, which deviates slightly from the `DESIGN_SYSTEM.md`'s assumption of Tailwind v3.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ⏳ Pending | |
| Execution | — | |
| Completion | — | |
