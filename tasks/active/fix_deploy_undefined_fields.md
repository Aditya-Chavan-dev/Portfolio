# Task: Fix Deploy Sparse Array Gaps
**Created:** 2026-03-24
**Tier:** 1 — Targeted
**Status:** ✅ Complete

---

## Context Summary Reference
- **Area**: `src/admin/components/DeployModal.tsx`
- **Goal**: Prevent Firebase `undefined` field error forming dense indices.

---

## Plan
- [x] **[P1]** In `DeployModal.tsx`, add index fill logic while list length <= index to solve unsupported sparse gaps triggering update errors.

---

## Rollback Plan
- Revert: `git checkout src/admin/components/DeployModal.tsx`
