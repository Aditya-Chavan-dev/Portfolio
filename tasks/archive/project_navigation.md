# Task: Projects Dedicated Pages Navigation
**Created:** 22 Mar 2026
**Tier:** 2 — Feature / Behavior
**Status:** In Planning

---

## Context Summary Reference
- **Current State:** `Projects.tsx` opens `ProjectDetailOverlay.tsx` modal on card click.
- **Goal:** Use `useNavigate` to route to `/projects/:id`.
- **Pre-verified:** `ProjectDetail.tsx` already exists and accurately fetches by param setup.

---

## Scope Boundary
What is IN scope:
- Refit `Projects.tsx` grid node wrappers onClick.
- Drop overlay imports and instances.

What is OUT of scope:
- Re-architecting `ProjectDetail.tsx` layout.

---

## Plan

### [Parent Task 1 — Navigation updates]
- [ ] **[T1.1]** Update `Projects.tsx` to handle page navigation absolute. — *Definition of done: Clicks navigate correctly*
  - Estimated effort: S
  - Depends on: none
- [ ] **[T1.2]** Cleanup unused Overlay states hooks in `Projects.tsx`. — *Definition of done: Code cleaned*
  - Estimated effort: S
  - Depends on: T1.1

---

## Rollback Plan
- Revert index.

---

## Risk Flags (for user review)
- **None**.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ✅ Approved | |
| Execution | ✅ Done | |
| Completion | ✅ Done | |
