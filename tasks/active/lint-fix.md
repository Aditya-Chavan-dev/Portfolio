# Task: IDE CSS Lint Fix
**Created:** 2026-03-14
**Tier:** 1
**Status:** In Planning

---

## Context Summary Reference

## Context Summary — IDE CSS Lint Fix

**Tier:** 1

**What already exists relevant to this task:**
- `src/index.css` is throwing IDE errors regarding `@theme` and `@import "tailwindcss"` due to VS Code's native CSS validator lacking support for Tailwind v4.

**Dependencies and affected areas:**
- IDE settings layer (`.vscode/settings.json`).

**Spec vs Reality gaps found:**
- None.

**Hidden config files relevant to this task:**
- None.

**Existing partial implementations found:**
- None.

**Key constraints or risks identified:**
- None. Only affects the developer environment locally.

---

## Scope Boundary
What is explicitly IN scope for this task:
- Creation of `.vscode/settings.json` ignoring `unknownAtRules` for CSS linting.

What is explicitly OUT of scope (do not touch):
- Everything else.

---

## Plan

### Lint Config
- [x] ✅ **[T1.1]** Create/update `.vscode/settings.json` mapping `css.lint.unknownAtRules` to `"ignore"`. — *Definition of done: The file exists and squiggly lines disappear in standard editors.*
  - Estimated effort: S
  - Depends on: none
  - External blocker: none

---

## Rollback Plan
If execution fails or is abandoned midway:
- Delete `.vscode/settings.json`.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ✅ Approved | 2026-03-14 12:20 |
| Execution | ✅ Done | Save point committed |
| Completion | ✅ Done | Moved to archive |
