# Task: Harden Firestore Fallbacks
**Created:** 2026-03-29
**Tier:** 1
**Status:** In Planning

---

## Context Summary Reference
**Tier:** 1

**What already exists relevant to this task:**
- `useWelcomeContent.ts` and `useHubContent.ts` already implement a `setTimeout` based safety fallback to deal with AdBlockers that cause `onSnapshot` to hang or fail.
- `useSkillsContent.ts` initializes with fallback content but lacks the timeout-based "force-complete" logic seen in other hooks.

**Dependencies and affected areas:**
- Any component relying on these hooks for real-time data from Firestore.

---

## Scope Boundary
What is explicitly IN scope for this task:
- Auditing all `onSnapshot` hooks.
- Implementing consistent timeout fallbacks where missing.
- Ensuring `loading` state is cleared correctly on block.

What is explicitly OUT of scope:
- Refactoring the entire data layer to use a different service.

---

## Plan

### [T1] Audit & Harden Hooks
- [x] **[T1.1]** Audit `src/quick-access/` hooks (Skills, Certs, Experience). — *Definition of done: Identified missing timeout in Skills.*
- [x] **[T1.2]** Audit `src/common/hooks/` and `src/hub/` hooks. — *Definition of done: Identified missing timeout in useMetrics.*
- [ ] **[T1.3]** Apply resilience pattern to `useSkillsContent.ts` and `useMetrics.ts`. — *Definition of done: Timeouts added and loading states cleared.*
- [ ] **[T1.4]** Inform the user about the origin of the block (AdBlocker). — *Definition of done: Communication sent.*

---

## Rollback Plan
- Revert changes to `.ts` hooks using `git checkout`.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ⏳ Pending | |
| Execution | — | |
| Completion | — | |
