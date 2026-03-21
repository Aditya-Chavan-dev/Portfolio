# Task: Welcome Screen Refinement
**Created:** 2026-03-21
**Tier:** 2
**Status:** In Planning

---

## Context Summary — Welcome Screen Refinement
- Name fits overlap issue previously solved by fluid heights, but now requires strict capping of `72px` on desktop and absolute flat single line layouts.
- Spacing relies on ad-hoc Tailwind classes which will be migrated to strict spec layout pixels/factors.
- Asterisk icon appears in bottom-right (this is the `ThemeToggle` or an orphaned node that needs absolute conditional hiding on the `/` route).

---

## Scope Boundary
What is explicitly IN scope:
- Re-styling Name sizes, wrapping, spacing.
- Center alignment root bounds.
- Paragraph loops gap spacing indices math fixes.
- Skip / Continue Prompt transition timings logic adjustments.
- Backdrop set to `#0A0A0A`.
- Hiding non-conforming items (ThemeToggle).

What is explicitly OUT of scope:
- Core content Dialogue JSON edits.

---

## Plan

### [T1] Core Root layout & Centering
- [x] **[T1.1]** Configure `LandingPage.desktop.tsx` parent bounds setup with true vertical viewport centering + `#0A0A0A` background. *DoD: Zero bleeding, exactly centered.*
- [x] **[T1.2]** Apply same strict centering variables setup in `LandingPage.mobile.tsx`.

### [T2] Name & Space Fixes (WelcomeDialogue)
- [x] **[T2.1]** Enforce Name size `72px` desktop / `42px` mobile with exact single-line clamping `whitespace-nowrap`.
- [x] **[T2.2]** Standardize spacing gap values mechanically adding explicit static margins heights logic.

### [T3] Prompt Visibility & Orchestration
- [x] **[T3.1]** Adjust Prompt intervals triggers avoiding duplicates overlap accurately.

### [T4] Chrome cleanup
- [x] **[T4.1]** Trace and remove visual Asterisk components triggers.

---

## Rollback Plan
Standard git restores or previous walkthrough states.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| Execution | ✅ Done | |
| Completion | ✅ Done | Released to live |
