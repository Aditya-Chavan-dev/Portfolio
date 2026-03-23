# Task: Skills Icons & Layout Fixes
**Created:** 22 Mar 2026
**Tier:** 1 — Targeted / Layout
**Status:** In Planning

---

## Context Summary Reference
- **Errors:** `devicons` URL was missing 's' making images broken.
- **Spacing:** `aspect-square` and height spacing creating scrollbars layouts.
- **Goal:** Fix URL slugs, set explicit compact heights (`h-20`), diminish grid gap padding dimensions absolute.

---

## Scope Boundary
What is IN scope:
- Fix URL template inside `SkillCategoryBlock.tsx`.
- Condense `.grid` card height padding ratios.
- Reduce margins absolute supporting `Skills.tsx`.

What is OUT of scope:
- Rebuilding hook parameters.

---

## Plan

### [Parent Task 1 — fixes]
- [ ] **[T1.1]** Fix `devicons` endpoint string. — *Definition of done: Code updated*
  - Estimated effort: S
- [ ] **[T1.2]** Condense card dimensions inside `SkillCategoryBlock.tsx` (remove aspect-square, reduce padding). — *Definition of done: Height shrinks*
  - Estimated effort: S
- [ ] **[T1.3]** Condense layout space-y anchors inside `Skills.tsx`. — *Definition of done: Screen fully fit with zero scroll*
  - Estimated effort: S

---

## Rollback Plan
- Revert.

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
