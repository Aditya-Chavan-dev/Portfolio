# Task: Fix App Check Enforcement Mismatch
**Created:** 2026-04-05
**Tier:** 1
**Status:** In Planning

---

## Context Summary Reference
- **Issue:** RTDB rules require App Check, but the frontend doesn't initialize it.
- **Affected File:** `src/common/lib/firebase.ts`

---

## Scope Boundary
What is explicitly IN scope:
- Initializing App Check in `src/common/lib/firebase.ts`.
- Updating `.env.example` to include the required site key.

What is explicitly OUT of scope:
- Configuring the Firebase Console (User must do this).

---

## Plan

### [Parent Task 1 — Implementation]
- [x] **[T1.1]** Update `src/common/lib/firebase.ts` to initialize App Check. — *Definition of done: App Check initialized with ReCaptchaV3Provider.*
  - Estimated effort: S
  - Depends on: none
- [x] **[T1.2]** Update `.env.example` with `VITE_APP_CHECK_SITE_KEY`. — *Definition of done: Placeholder added to .env.example.*
  - Estimated effort: S
  - Depends on: T1.1

---

## Rollback Plan
- Revert changes to `src/common/lib/firebase.ts` and `.env.example`.

---

## Status Log
| User Approval | ✅ Approved | 2026-04-05 — Plan approved. |
| Execution     | [/] In Progress | App Check initialized. |
