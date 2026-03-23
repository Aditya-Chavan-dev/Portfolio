# Task: Fix Contribution Green Dots (Rewrite History)
**Created:** 22 Mar 2026
**Tier:** 3 — Architectural / High Risk
**Status:** In Execution

---

## Context Summary Reference
- **Condition:** All recent commits have author email set to `.example.com`.
- **Cause:** GitHub missing attribution.
- **Troubleshooting:** Rebase failed with `.env.example` conflict. Needs backup workaround.

---

## Scope Boundary
What is IN scope:
- Backup local `.env.example`.
- Rewrite author email metadata for ALL commits via `git rebase --root --exec`.
- Restore `.env.example`.
- Force push to `origin main`.

---

## Plan

### [Parent Task 1 — Metadata Correction]
- [ ] **[T1.1]** Backup `.env.example` to prevent rebase conflict. — *Definition of done: File moved to temporary backup*
  - Estimated effort: S
  - Depends on: none
- [ ] **[T1.2]** Run `git rebase --root --exec` to amend commit author addresses. — *Definition of done: Rebase completed successfully locally*
  - Estimated effort: M
  - Depends on: T1.1
- [ ] **[T1.3]** Restore `.env.example` to workspace. — *Definition of done: File returned to original path*
  - Estimated effort: S
  - Depends on: T1.2
- [ ] **[T1.4]** Force push to main. — *Definition of done: Origin server history updated*
  - Estimated effort: S
  - Depends on: T1.3

---

## Rollback Plan
- `git rebase --abort` if fails mid-way.
- `git reset --hard origin/main` to restore state from remote.

---

## Risk Flags (for user review)
- **High Risk:** Force pushing overwrites high layer history on GitHub. Solo repository simplifies this safety node.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ✅ Approved | User approved Option B |
| Execution | ✅ Done | |
| Completion | ✅ Done | |
