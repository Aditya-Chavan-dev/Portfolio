# Task: Hub Layout Refinement - Header Removal & Scale Up
**Created:** 2026-03-28
**Tier:** 2
**Status:** In Planning

---

## Context Summary Reference
The user wants to remove the top "Service Header" (OPERATIVE_HUD bar) from the Hub to gain vertical space and "shift everything upwards". Additionally, they want the grid modules to be slightly larger and have more "breathing space".

---

## Scope Boundary
What is explicitly IN scope:
- Modifying `src/hub/Hub.desktop.tsx` to remove the `<header>`.
- Adjusting the Bento grid row/column behavior or padding to increase scale and "breathing space".

What is explicitly OUT of scope:
- Deployment to Firebase or GitHub (user requested local-only for now).
- Opening the browser.

---

## Plan

### [T1] Remove Header and Shift Grid
- [ ] **[T1.1]** Delete the header section in `src/hub/Hub.desktop.tsx`. — *Done: Grid starts from top.*
- [ ] **[T1.2]** Update `motion.main` container padding and gaps. Increase `gap-6` to `gap-8` for more breathing space. — *Done: Layout feels less cramped.*
- [ ] **[T1.3]** Adjust `px-12 pb-12` to `p-12` or similar to handle the top margin. — *Done: Consistent spacing.*

### [T2] Increase Module Scale
- [ ] **[T2.1]** Check if `grid-rows-6` provides enough height. If header is gone, modules have more room. Increase font sizes in Profile Card or Quick Access if needed to fill space. — *Done: Visible components feel "larger".*

---

## Rollback Plan
- Restore discarded header code from `src/hub/Hub.desktop.tsx` using `git checkout`.

---

## Risk Flags
- Removing the header might make the top of the grid feel too close to the edge of the screen.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ⏳ Pending | |
| Execution | — | |
| Completion | — | |
