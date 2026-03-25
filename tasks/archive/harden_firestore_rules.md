# Task: Harden Firestore Rules
**Created:** 2026-03-25
**Tier:** 2 - Architectural
**Status:** In Progress

---

## Context Summary Reference
- **Finding:** Firestore rules currently allow any authenticated user to write.
- **Admin Email:** `adityagchavan310@gmail.com`
- **Current Rules:** `allow write: if request.auth != null;`

---

## Scope Boundary
What is explicitly IN scope:
- Restricting `write`, `update`, `delete` permissions to the specific admin email.
- Ensuring public `read` access remains functional for portfolio content.
- Allowing analytics increments anonymously.

What is explicitly OUT of scope:
- Changing the data structure.
- Modifying Realtime Database rules (unless requested).

---

## Plan

### [T1] Code Modification
- [ ] **[T1.1]** Define `isAdmin()` helper in `firestore.rules`. — *Def of done: function checks email*
- [ ] **[T1.2]** Update all `allow write` blocks to use `isAdmin()`. — *Def of done: unauthorized users blocked*

### [T2] Validation & Deploy
- [ ] **[T2.1]** Run `firebase_validate_security_rules`. — *Def of done: syntax check passes*
- [ ] **[T2.2]** Deploy to production via `firebase deploy --only firestore`. — *Def of done: CLI success*

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| Execution | 🔄 In Progress | |
| Verification | — | |
