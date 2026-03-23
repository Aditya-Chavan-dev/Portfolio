# Task: Skills Grid Refactor
**Created:** 22 Mar 2026
**Tier:** 2 — Feature / Layout
**Status:** In Planning

---

## Context Summary Reference
- **Existing Layout:** Category blocks with static lists likely containing proficiency mechanics.
- **Goal:** Transform list items into small icon tiles with hover scale up and brand color glows. Remove bars/percent layers.
- **Responsive:** 6 per row desktop, 4 tablet, 3 mobile.

---

## Scope Boundary
What is IN scope:
- Append `color` supporting types to `skills.types.ts`.
- Setup fallback `content.json` with 4 organized categories Node payloads.
- Update `SkillCategoryBlock.tsx` replacing lists with grids absolute.

What is OUT of scope:
- Updating Firestore structures securely Node.

---

## Plan

### [Parent Task 1 — Data & Typings]
- [ ] **[T1.1]** Update `skills.types.ts` adding `color?: string` and category groupings supports. — *Definition of done: Types updated*
  - Estimated effort: S
  - Depends on: none
- [ ] **[T1.2]** Populate fallback `content.json` with 4 categories template dataset absolute. — *Definition of done: JSON updated*
  - Estimated effort: S
  - Depends on: T1.1

### [Parent Task 2 — Component Upgrades]
- [ ] **[T2.1]** Update `SkillCategoryBlock.tsx` with responsive grid layouts, scaling triggers, and frame absolute dynamic inline shadow glows absolute. — *Definition of done: Grid looking rich*
  - Estimated effort: M
  - Depends on: T1.2

---

## Rollback Plan
- Revert file contents absolute triggers.

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
