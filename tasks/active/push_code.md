# Task: Update Hub, Cleanup, and Push Code
**Created:** 2026-03-23
**Tier:** 2
**Status:** In Planning

---

## Context Summary Reference
- **Tier:** 2 (Feature adjustment + Cleanup before push)
- **What already exists relevant to this task:**
  - Local changes in `Projects.tsx`, `Skills.tsx`, etc.
  - Requirement: Update Hub section ("About" -> "Certifications") in `src/hub/content.json`.
  - Requirement: Remove dead code for the old "About" page.
- **Dependencies and affected areas:**
  - `src/hub/content.json`, `src/hub/QuickAccessCard.tsx`
  - `src/quick-access/about/` (To be deleted)
  - `src/shared/seed.ts`, `src/shared/firestore.service.ts`

---

## Scope Boundary
What is explicitly IN scope for this task:
- Modifying `src/hub/content.json` to change "About" to "Certifications".
- Updating `src/hub/QuickAccessCard.tsx` with `Award` icon.
- Deleting `src/quick-access/about/` directory.
- Cleaning up imports and methods in `seed.ts` and `firestore.service.ts`.
- Staging, committing (split commits), and pushing to GitHub.

What is explicitly OUT of scope (do not touch):
- Modifying other alive features.

---

## Plan

### [Parent Task 1 — Update Hub Section]
- [x] **[T1.1]** Verify `/certifications` route in `App.tsx` *(Already verified)*
- [ ] **[T1.2]** Update `src/hub/content.json` ("About" -> "Certifications")
  - Estimated effort: S
  - Depends on: none
- [ ] **[T1.3]** Update `src/hub/QuickAccessCard.tsx` icon mapping (`Award`)
  - Estimated effort: S
  - Depends on: T1.2

### [Parent Task 2 — Remove Dead Code]
- [ ] **[T2.1]** Delete `src/quick-access/about/` folder
  - Estimated effort: S
  - Depends on: none
- [ ] **[T2.2]** Remove `About` references from `src/shared/seed.ts`
  - Estimated effort: S
  - Depends on: T2.1
- [ ] **[T2.3]** Remove `About` references from `src/shared/firestore.service.ts`
  - Estimated effort: S
  - Depends on: T2.1

### [Parent Task 3 — Commit and Push]
- [ ] **[T3.1]** Stage and Commit all changes using Split Commit strategy
  - Estimated effort: S
  - Depends on: T1.3, T2.3
- [ ] **[T3.2]** Push to remote branch
  - Estimated effort: S
  - Depends on: T3.1

---

## Rollback Plan
If execution fails midway:
- `git restore` modified files.
- `git checkout` or recreate deleted files if needed.

---

## Risk Flags (for user review)
- None. Standard file cleanup and config text edits.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Planning Update | |
| User Approval | ⏳ Pending | |
| Execution | — | |
| Completion | — | |


