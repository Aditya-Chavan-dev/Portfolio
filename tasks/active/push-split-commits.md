# Task: Push split commits to GitHub
**Created:** 2026-04-03
**Tier:** 2 — Feature/Changes (Refactoring & Implementation)
**Status:** In Planning

---

## Context Summary Reference
- Modified files: 9
- Untracked files/directories: 4
- Primary Theme: Premium Noir Aesthetic (Restoration)
- Architecture: Simplified `main.tsx` and `App.tsx` (removed complex providers).

**Changes found (by area):**
1. **Core:** `src/main.tsx`, `src/App.tsx`, `src/common/lib/firebase.ts` simplified.
2. **Styles:** `src/index.css`, `tailwind.config.js` added premium design tokens.
3. **Landing:** `src/landing-page/*` updated with cinematic cinematic dialogue and anamorphic layout.
4. **New Directory Structure:** `src/components/`, `src/layouts/`, `src/pages/` being initialized.
5. **Utils/Hooks:** `src/common/hooks/useRecordVisit.ts` modified.

---

## Scope Boundary
What is explicitly IN scope for this task:
- Staging and committing current changes in 5 logical splits.
- Pushing to GitHub (origin main).

What is explicitly OUT of scope (do not touch):
- Modifying the existing code logic (unless necessary to fix a commitment error).
- Adding new features.

---

## Plan

### [Phase 1: Commit Analysis]
- [ ] **[T1.1]** Define the 5 commit groups based on logical separation — *Definition of done: 5 distinct file lists with commit messages*
  - Estimated effort: S
  - Depends on: none
  - External blocker: none

### [Phase 2: Partial Commits]
- [ ] **[T2.1]** Stage and commit Group 1: Core Infrastructure Cleanup — *Definition of done: Commit 1 created*
  - Estimated effort: S
  - Depends on: T1.1
- [ ] **[T2.2]** Stage and commit Group 2: Global Design System (CSS/Tailwind) — *Definition of done: Commit 2 created*
  - Estimated effort: S
  - Depends on: T2.1
- [ ] **[T2.3]** Stage and commit Group 3: Premium Landing Page Rebrand — *Definition of done: Commit 3 created*
  - Estimated effort: S
  - Depends on: T2.2
- [ ] **[T2.4]** Stage and commit Group 4: Component and Layout Skeleton — *Definition of done: Commit 4 created*
  - Estimated effort: S
  - Depends on: T2.3
- [ ] **[T2.5]** Stage and commit Group 5: Core Pages and Behavioral Hooks — *Definition of done: Commit 5 created*
  - Estimated effort: S
  - Depends on: T2.4

### [Phase 3: GitHub Push]
- [ ] **[T3.1]** Push all 5 commits to GitHub 'origin main' — *Definition of done: git push successful*
  - Estimated effort: S
  - Depends on: T2.5

---

## Rollback Plan
If execution fails or is abandoned midway:
- Use `git reset --soft <original_hash>` to return to current working directory state.

---

## Risk Flags (for user review)
- [T3.1] — Pushing to main. High-risk if build fails, but requested.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ⏳ Pending | |
| Execution | — | |
| Completion | — | |
