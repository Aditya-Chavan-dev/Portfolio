# Task: Firestore safe getDoc migration
**Created:** 22 Mar 2026
**Tier:** 2 — Feature (Safety)
**Status:** In Planning

---

## Context Summary Reference
- Background WebSocket retries from `onSnapshot` inside `useWelcomeContent.ts` and `useAdminProjects.ts` crash continuously absolute Node.

---

## Plan

### [Parent Task 1 — Cleanse Landing Page loop]
- [ ] **[T1.1]** Replace `onSnapshot` with `getDoc` in `useWelcomeContent.ts`. Include mounted state safeguards.

### [Parent Task 2 — Cleanse Admin panel loop]
- [ ] **[T2.1]** Replace `onSnapshot` with `getDocs` in `useAdminProjects.ts`.
- [ ] **[T2.2]** Chain `fetchAdminProjects()` re-triggers inside `toggleFeatured` and `updateOrder` to maintain live updates.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| Execution | — | |
