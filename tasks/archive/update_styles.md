# Task: Update Fonts & Colors to MindForge Design System
**Created:** 2026-03-21
**Tier:** 3 (Architectural / Global)
**Status:** In Planning

---

## Context Summary Reference
- **What already exists:** `src/index.css` contains the design tokens (currently using `Outfit` and `Inter`). `IMP DOCS/DESIGN_SYSTEM.md` documents a different spec (`Cormorant Garamond` / `JetBrains Mono`).
- **Dependencies:** Every component using `.bg-theme-*`, `.text-theme-*`, or CSS variables.
- **Spec vs Reality:** `DESIGN_SYSTEM.md` claims tokens are in `src/styles/tokens.css`, but they are in `src/index.css`.
- **Existing implementations:** The current system is 288 lines of CSS in `index.css` driving all styles.
- **Arbitrary Overrides found:** Components in `src/landing-page` and `src/admin` use arbitrary tailwind classes like `font-['JetBrains_Mono',monospace]` which bypass global fallbacks.

---

## Scope Boundary
What is explicitly IN scope:
- Updating `src/index.css` with new Google Fonts and MindForge color tokens.
- **Overriding Tailwind font families in `@theme`** to ensure bulletproof global application.
- **Removing arbitrary inline font overrides** (`font-['...']`) in components so they correctly inherit the global font style.
- Updating `IMP DOCS/DESIGN_SYSTEM.md` to document the new MindForge specification.

What is explicitly OUT of scope:
- Changing application layout, responsive logic, or component hierarchies.

---

## Plan

### [T1] Update CSS Styles (Global Foundation)
- [ ] **[T1.1]** Update `@import` in `src/index.css` to import Syne and DM Sans. — *Done: Imports correct*
  - Effort: S
- [ ] **[T1.2]** Update `:root` variables in `src/index.css` with MindForge tokens. — *Done: Colors updated*
  - Effort: S
- [ ] **[T1.3]** **Extend Tailwind `@theme`** in `index.css` to set `--font-sans` to 'DM Sans' and `--font-serif` to 'Syne' to catch any Tailwind classes using them. — *Done: Tailwind overridden*
  - Effort: S
- [ ] **[T1.4]** Update `font-family` fallbacks for `body` and `h1`-`h4`. — *Done: Fonts applied*
  - Effort: S

### [T2] Remove Arbitrary Font Overrides (Component level)
- [ ] **[T2.1]** Remove inline `font-['JetBrains_Mono']` arbitrary classes in `src/landing-page/WelcomeDialogue.tsx`, `LandingPage.desktop.tsx`, `LandingPage.mobile.tsx`. — *Done: Cleaned up*
  - Effort: S
- [ ] **[T2.2]** Remove inline font overrides in `src/admin/components/WelcomeScreenEditor.tsx`. — *Done: Cleaned up*
  - Effort: S

### [T3] Update Documentation
- [ ] **[T3.1]** Update `IMP DOCS/DESIGN_SYSTEM.md` to reflect the MindForge specification. — *Done: Docs updated*
  - Effort: M

---

## Rollback Plan
- Revert via `git checkout src/index.css src/landing-page/ src/admin/components/WelcomeScreenEditor.tsx IMP DOCS/DESIGN_SYSTEM.md`.

---

## Risk Flags
- **Arbitrary overrides:** We found inline font definitions. To meet the user's emphasis for *whole portfolio coverage*, we must clean these up. This is listed in T2.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | 2026-03-21 |
| User Approval | ✅ Approved | 2026-03-21 |
| Execution | ✅ Done | 2026-03-21 |
| Completion | ✅ Done | 2026-03-21 |
