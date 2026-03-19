# Task: Google Sign-In for Admin
**Created:** 2026-03-19
**Tier:** 1 (Targeted)
**Status:** Pending User Approval

---

## Context Summary

**Tier:** 1

**What already exists:**
- `firebase.ts` — initializes Firebase app, exports `auth` and `db`. No `GoogleAuthProvider`.
- `AdminLoginPage.tsx` — email/password form using `signInWithEmailAndPassword`, lockout logic (3 attempts → 15min), checks `VITE_ADMIN_EMAIL` before auth call.
- `AdminLoginModal.tsx` — reuses `AdminLoginForm` from `AdminLoginPage.tsx`. No changes needed.
- `RequireAuth.tsx` — guards `/amgl-panel`, checks `user.email !== ADMIN_EMAIL`. Already provider-agnostic.
- `AdminPanel.tsx` — uses `signOut(auth)`. Already provider-agnostic.

**Dependencies and affected areas:**
- `firebase.ts` → consumed by AdminLoginPage, RequireAuth, AdminPanel
- `AdminLoginPage.tsx` → consumed by AdminLoginModal (imports `AdminLoginForm`)
- `RequireAuth.tsx` → no changes needed (already checks email only)
- `AdminPanel.tsx` → no changes needed (signOut is provider-agnostic)

**Spec vs Reality gaps:**
- `.env.example` is missing `VITE_ADMIN_EMAIL` — code uses it but example file doesn't list it

**Key constraints:**
- User must enable Google Sign-In in Firebase Console → Authentication → Sign-in method
- Must keep terminal/hacker aesthetic of the login UI
- Must still restrict to `VITE_ADMIN_EMAIL` — reject other Google accounts

---

## Scope Boundary
**IN scope:**
- `firebase.ts` — add GoogleAuthProvider
- `AdminLoginPage.tsx` — replace form with Google Sign-In button
- `.env.example` — add VITE_ADMIN_EMAIL

**OUT of scope:**
- `RequireAuth.tsx`, `AdminPanel.tsx`, `AdminLoginModal.tsx` — already provider-agnostic
- Welcome page, theme toggle, routing

---

## Plan

### Phase 1 — Firebase Provider Setup
- [ ] **[T1.1]** Add `GoogleAuthProvider` to `firebase.ts` — *DoD: provider exported*
  - Effort: S | Depends: none

### Phase 2 — Login Form Rewrite
- [ ] **[T2.1]** Rewrite `AdminLoginForm` in `AdminLoginPage.tsx` — replace email/password inputs with single "Sign in with Google" button using `signInWithPopup`. After sign-in, check email against `VITE_ADMIN_EMAIL`, sign out + show error if mismatch. Remove lockout logic (irrelevant for Google). Keep terminal aesthetic. — *DoD: Google popup works, unauthorized emails rejected*
  - Effort: M | Depends: T1.1

### Phase 3 — Cleanup
- [ ] **[T3.1]** Add `VITE_ADMIN_EMAIL=` to `.env.example` — *DoD: documented*
  - Effort: S | Depends: none

### Phase 4 — Verification
- [ ] **[T4.1]** `npm run build` → zero errors — *DoD: clean build*
  - Effort: S | Depends: T2.1

---

## Rollback Plan
- Revert `firebase.ts`, `AdminLoginPage.tsx`, `.env.example` from git

## Risk Flags
- [T2.1] — If Google Sign-In is not enabled in Firebase Console, the popup will fail. User must enable it manually.

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | 2026-03-19 |
| User Approval | ⏳ Pending | |
| Execution | — | |
| Completion | — | |
