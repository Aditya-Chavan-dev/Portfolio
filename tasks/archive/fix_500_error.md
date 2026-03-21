# Task: Fix 500 Internal Server Error
**Created:** 2026-03-20
**Tier:** 1
**Status:** In Planning

---

## Context Summary Reference
**Tier:** 1

**What already exists relevant to this task:**
- Vite is throwing a 500 error due to `@tailwindcss/vite` plugin rejecting `dark:bg-gray-980`.
- File culprit: `src/index.css`.

**Dependencies and affected areas:**
- `src/index.css` → contains the class.

**Spec vs Reality gaps found:**
- None.

**Hidden config files relevant to this task:**
- None.

**Existing partial implementations found:**
- None.

**Key constraints or risks identified:**
- None.

---

## Scope Boundary
What is explicitly IN scope for this task:
- Fixing invalid Tailwind CSS class configuration.

What is explicitly OUT of scope (do not touch):
- Anything unrelated to the visual styles.

---

## Plan

### Fix Class
- [ ] **[T1.1]** Inspect `src/index.css` to find `gray-980`.
- [ ] **[T1.2]** Change to a supported level (like `gray-950`) or define a custom theme.
- [ ] **[T1.3]** Verify server reload success.

---

## Rollback Plan
- Revert changes.

---

## Risk Flags (for user review)
None.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ⏳ Pending | |
| Execution | — | |
| Completion | — | |
