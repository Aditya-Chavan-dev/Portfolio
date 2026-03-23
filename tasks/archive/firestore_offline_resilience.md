# Task: Firestore Offline Resilience Upgrades
**Created:** 22 Mar 2026
**Tier:** 2 — Feature / Behavior
**Status:** In Planning

---

## Context Summary Reference
- **Local Logs:** Browser spewing `ERR_BLOCKED_BY_CLIENT` due to Adblockers preventing stream loops.
- **Goal:** Enable IndexedDB offline persistence absolute triggers making client reads robust fallback caches Node payloads smoothly.

---

## Scope Boundary
What is IN scope:
- Update `src/shared/firebase.ts` containing IndexedDb initializations absolute.

What is OUT of scope:
- Disabling absolute browser native consoles stream overrides Node.

---

## Plan

### [Parent Task 1 — Offline caching]
- [ ] **[T1.1]** Update `firebase.ts` with `enableIndexedDbPersistence` triggers. — *Definition of done: Code compiled safely*
  - Estimated effort: S
  - Depends on: none

---

## Rollback Plan
- Revert file index.

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
