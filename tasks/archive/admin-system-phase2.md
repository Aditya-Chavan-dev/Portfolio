# Task: Admin System — Phase 2 (Firebase Authentication)
**Created:** 2026-03-24
**Tier:** 2 — Feature
**Status:** In Execution

---

## Plan

### Task Group 1 — Auth Infrastructure
- [ ] **[T1.1]** Create `useAuth.ts` hook with `onAuthStateChanged` — *Done: returns user, loading, isAdmin*
- [ ] **[T1.2]** Create `AuthProvider.tsx` context with login/logout — *Done: provider wraps app*
- [ ] **[T1.3]** Wire `AuthProvider` into `main.tsx` — *Done: context available app-wide*

### Task Group 2 — Stub Replacements
- [ ] **[T2.1]** Replace `AdminLogin.tsx` with real login form — *Done: email+password form with error handling*
- [ ] **[T2.2]** Replace `ProtectedRoute.tsx` with real auth check — *Done: uses auth context*
- [ ] **[T2.3]** Add logout button to `AdminPanel.tsx` — *Done: logout in nav bar*

### Task Group 3 — Verification
- [ ] **[T3.1]** TypeScript check + build — *Done: no errors*
- [ ] **[T3.2]** Browser verification — *Done: login/logout flow works*

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | 2026-03-24 |
| Execution | 🔄 In Progress | |
