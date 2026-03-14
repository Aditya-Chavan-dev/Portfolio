# Task: Repository Cleanup
**Created:** 2026-03-14
**Tier:** 1
**Status:** In Planning

---

## Context Summary Reference

## Context Summary — Repository Cleanup

**Tier:** 1

**What already exists relevant to this task:**
- Redundant global rule files `Claude.md` and `Gemini.md` are present at the root, which have been superseded by `IMP DOCS/UPGRADED_PROTOCOLS.md`.
- `firebase.json` contains unused rewrite rules pointing to a non-existent `/dynamic-test` function, and references a `functions` source folder which doesn't exist.
- `package.json` references non-existent scripts (`scripts/scan-secrets.js` and `scripts/validate-env.js`) and config files (`tsc -b && vite build` but missing `tsconfig.json`, `vite.config.ts`).
- `index.html` references `src/main.jsx` while the file is actually `src/main.tsx`.

**Dependencies and affected areas:**
- `./Claude.md`, `./Gemini.md` → Redundant files to be deleted.
- `firebase.json` → Needs cleanup of unused rewrites/functions.
- `package.json` → Needs removal of missing script references or creation of those scripts.
- `index.html` → Script tag needs to be updated.

**Spec vs Reality gaps found:**
- The README describes a fully scaffolded `src/` folder (with `Admin`, `components`, `hooks`, etc.) but in reality, `/src` only contains `main.tsx`.

**Hidden config files relevant to this task:**
- `firebase.json` → Controls Firebase hosting and functions.
- `package.json` → Controls standard scripts and checks.

**Existing partial implementations found:**
- None found for these specific files other than `main.tsx`.

**Key constraints or risks identified:**
- Deleting `Claude.md` and `Gemini.md` removes the old instructions, making `UPGRADED_PROTOCOLS.md` the sole source of truth.
- `package.json` relies on scripts that aren't present.

---

## Scope Boundary
What is explicitly IN scope for this task:
- Deleting `Claude.md` and `Gemini.md`.
- Cleaning up the unused Firebase references and `dynamic-test` rewrites in `firebase.json`.
- Correcting the Javascript script import suffix in `index.html` (`main.tsx` instead of `main.jsx`).
- Removing the missing `scripts/` references in `package.json`.

What is explicitly OUT of scope (do not touch):
- Restoring or fully scaffolding the missing `src` structure (that is a separate feature task).
- Creating new backend cloud functions or modifying Firebase setup beyond removal of the unused configs.

---

## Execution Baseline
**Branch:** main
**Last commit:** 20e388803cf8707cf5186c70919f96b3d06bd89f
**Date started:** 2026-03-14 11:40:00

---

## Plan

### Clean Up Extraneous Files and Configurations
- [x] ✅ **[T1.1]** Delete generic rule files (`Claude.md` and `Gemini.md`) from the root folder. — *Definition of done: The two files are no longer in the repository.*
  - Estimated effort: S
  - Depends on: none
  - External blocker: none
- [x] ✅ **[T1.2]** Update `index.html` to reference `/src/main.tsx` instead of `/src/main.jsx`. — *Definition of done: The script tag points correctly to `main.tsx`.*
  - Estimated effort: S
  - Depends on: none
  - External blocker: none
- [x] ✅ **[T1.3]** Remove unused `functions` and `dynamic-test` rewrite in `firebase.json`. — *Definition of done: Missing directory warnings will no longer fire for `functions`, and the obsolete redirect is gone.*
  - Estimated effort: S
  - Depends on: none
  - External blocker: none
- [x] ✅ **[T1.4]** Remove non-existent script references from `package.json` (`scan:secrets`, `validate:env`). — *Definition of done: Running npm commands won't fail because of completely missing scripts.*
  - Estimated effort: S
  - Depends on: none
  - External blocker: none

---

## Rollback Plan
If execution fails or is abandoned midway:
- Run `git restore firebase.json index.html package.json`.
- Restore deleted `Claude.md` and `Gemini.md` if necessary using git.

---

## Risk Flags (for user review)
High-impact or high-risk tasks that the user should scrutinise before approving:
- None identified; all tasks are isolated text fixes or file deletions.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ✅ Approved | |
| Execution | ✅ Done | Save point committed |
| Completion | ✅ Done | Moved to archive |
