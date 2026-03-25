# Task: Batch Code Audit Refinements
**Created:** 2026-03-21
**Tier:** 2
**Status:** In Planning

---

## Context Summary — Batch Refinements

**Tier:** 2

**What already exists relevant to this task:**
- Layout absolute position parameters missing relative anchors in Admin Editor.
- State Machine Typewriter animations fully implemented but have edge Skip race conditions.
- Contrast mismatches in fallback Not Found, Theme Toggle and Testimonials views.

**Dependencies and affected areas:**
- `WelcomeScreenEditor.tsx` ➔ Reorder items using Index, switching to ID improves state layout consistency correctly.
- `NotFound.tsx`, `Testimonial.tsx` ➔ Theme setup has contrast overlapping triggers securely.

---

## Plan

### [T1] Admin Editor Pane
- [x] **[T1.1]** Add `relative` to absolute positioning container parent at `WelcomeScreenEditor.tsx` Line 160.
- [x] **[T1.2]** Refactor state `highlightIndex` ➔ `highlightId` everywhere to resolve Reorder sync triggers.

### [T2] Content Body & Motion
- [x] **[T2.1]** Replace `overflow-hidden` with `overflow-x-hidden` in `Hub.desktop.tsx` Line 16.
- [x] **[T2.2]** Support `useReducedMotion()` in animating cards framing inside `QuickAccessGrid.tsx`.

### [T3] Accessible Prompt Mechanics
- [x] **[T3.1]** Add `onClick` call invoking `navigate('/hub')` inside `LandingPage.desktop.tsx` continue prompt.
- [x] **[T3.2]** Add `role="button"`, `tabIndex(0)`, and keydown accessibility triggers inside `LandingPage.mobile.tsx` root click bounds.

### [T4] Typewriter Refinement
- [x] **[T4.1]** Remove unused `name` prop parameter string setup from `WelcomeDialogue.tsx` interface thoroughly.
- [x] **[T4.2]** Add standard complete action race conditions guards `completedRef` safely to double trigger filters accurate.

### [T5] Contrast Contrast Nodes
- [x] **[T5.1]** Fix invisible classes on text layouts or headers in `NotFound.tsx`, `ThemeToggle.tsx`, `Testimonial.tsx`.
- [x] **[T5.2]** Replace hardcoded gray bg with `bg-theme-secondary` layout buffers inside `SkillCategoryBlock.tsx`.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | Approved |
| Execution | ✅ Done | All code fixes applied |
