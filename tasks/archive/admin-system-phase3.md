# Task: Admin System — Phase 3 (Admin Panel + Control Bar)
**Created:** 2026-03-24
**Tier:** 3 — Architectural
**Status:** In Execution

---

## Plan

### Task Group 1 — Admin Panel Shell (Task 3.1)
- [ ] **[T1.1]** Rewrite `AdminPanel.tsx` with sidebar layout, query-param tabs, and "Edit Portfolio" button
- [ ] **[T1.2]** Create placeholder components for tabs not yet built (Deploy, Rollback, Audit Log, Skills)

### Task Group 2 — Metrics Dashboard (Task 3.2)
- [ ] **[T2.1]** Create `MetricsDashboard.tsx` with 3 metric cards (Live Now, Total Visits, Today)
- [ ] **[T2.2]** Create `useMetrics.ts` hook (RTDB for presence, Firestore for analytics)

### Task Group 3 — Visitor Tracking (Task 3.3)
- [ ] **[T3.1]** Create `usePresence.ts` hook (RTDB presence write + auto-remove)
- [ ] **[T3.2]** Create `useRecordVisit.ts` hook (Firestore analytics increment)
- [ ] **[T3.3]** Wire both hooks in App.tsx for public routes only
- [ ] **[T3.4]** Seed initial analytics docs via seed script update

### Task Group 4 — Admin Control Bar (Task 3.4)
- [ ] **[T4.1]** Create `AdminControlBar.tsx` (fixed top bar on public routes when admin)
- [ ] **[T4.2]** Wire Control Bar into App.tsx with sessionStorage flag check
- [ ] **[T4.3]** Add content offset when Control Bar is visible

### Task Group 5 — Edit Session Lock (Task 3.5)
- [ ] **[T5.1]** Create `useEditSessionLock.ts` hook

### Task Group 6 — Verification
- [ ] **[T6.1]** TypeScript check + build
- [ ] **[T6.2]** Deploy

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| Execution | 🔄 In Progress | |
