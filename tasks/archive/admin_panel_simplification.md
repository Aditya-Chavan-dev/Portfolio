# Task: Admin Panel Simplification
**Created:** 2026-03-25
**Tier:** 2 - Feature
**Status:** In Planning

---

## Context Summary Reference
- **Finding:** User wants to remove sidebar/tabs in AdminPanel and focus on Metrics + "God Mode" button.
- **Current State:** `AdminPanel.tsx` has a multi-tab sidebar and mobile nav list.

---

## Scope Boundary
What is explicitly IN scope:
- Removing sidebar and mobile tabs in `AdminPanel.tsx`.
- Adding a high-impact "God Mode" button.
- Centering Metrics and content.

What is explicitly OUT of scope:
- Modifying the metrics logic itself.
- Changing the public-facing God Mode mechanics (BottomDock).

---

## Plan

### [T1] UI Overhaul
- [ ] **[T1.1]** Strip sidebar and navigation logic from `AdminPanel.tsx`. — *Def of done: Sidebar removed*
- [ ] **[T1.2]** Implement new centered layout with Header (Logo/Logout). — *Def of done: Layout centered*
- [ ] **[T1.3]** Add "God Mode" button with premium gold styling. — *Def of done: Button visible and styled*

### [T2] Logic & Verification
- [ ] **[T2.1]** Ensure `handleEditPortfolio` correctly sets session state. — *Def of done: God Mode starts on click*
- [ ] **[T2.2]** Run build and verify no regressions. — *Def of done: Build success*

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ⏳ Pending | |
| Execution | — | |
