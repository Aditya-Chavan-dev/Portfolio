# Task: Force Dark Theme after Intro
**Created:** 22 Mar 2026
**Tier:** 2 — Feature / Styling
**Status:** In Planning

---

## Context Summary Reference
- **Intro Style:** `LandingPage.desktop.tsx` uses custom dark CSS classes.
- **Problem:** Transitioning out of Intro might revert to default `light` mode or previous state if global theme is not updated.
- **Fix:** Update global theme to `dark` when landing page mounts or during exit trigger so it persists in the main app layout.

---

## Scope Boundary
What is IN scope:
- Expose `setTheme` from `useTheme.ts` and `ThemeProvider.tsx` context.
- Use `setTheme('dark')` in `LandingPage.tsx` to force dark state.

What is OUT of scope:
- Modifying other component styling absolute.

---

## Plan

### [Parent Task 1 — Context Upgrades]
- [ ] **[T1.1]** Update `src/shared/useTheme.ts` to return `setTheme` function. — *Definition of done: Function returned*
  - Estimated effort: S
  - Depends on: none
- [ ] **[T1.2]** Update `src/shared/ThemeProvider.tsx` to add `setTheme` to Context interface and value. — *Definition of done: Context updated*
  - Estimated effort: S
  - Depends on: T1.1

### [Parent Task 2 — Landing Page trigger]
- [ ] **[T2.1]** Update `src/landing-page/LandingPage.tsx` to import `useThemeContext` and call `setTheme('dark')` on mount or dialogue exit. — *Definition of done: Component updated and tested*
  - Estimated effort: S
  - Depends on: T1.2

---

## Rollback Plan
- Revert file changes to previous git commits.

---

## Risk Flags (for user review)
- **None** (Standard React state adjustment).

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ✅ Approved | |
| Execution | ✅ Done | |
| Completion | ✅ Done | |
