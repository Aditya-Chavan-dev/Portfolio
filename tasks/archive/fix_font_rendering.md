# Task: Fix Font Rendering (Buttons & Labels)
**Created:** 2026-03-21
**Tier:** 1 (Targeted Fix)
**Status:** In Planning

---

## Context Summary Reference
- **Finding:** Browser inspection revealed that while Google Fonts are loading successfully, `.btn-primary` and some section headers (like in `QuickAccessGrid`) are rendered with `<p>` or lacking explicit font definitions, causing them to fall back to `DM Sans` instead of the display font `Syne`.
- **Mitigation:** Update `.btn-primary` and `.btn-secondary` in CSS, and append `font-serif` in target components.

---

## Scope Boundary
What is explicitly IN scope:
- Updating `.btn-primary` and `.btn-secondary` class definitions in `index.css`.
- Updating the label string in `src/hub/QuickAccessGrid.tsx`.

What is explicitly OUT of scope:
- Changing other component codebases.

---

## Plan

### [T1] Update Button Classes
- [ ] **[T1.1]** Add `font-family: 'Syne', sans-serif;` to `.btn-primary` and `.btn-secondary` in `src/index.css`. — *Done: Buttons set*

### [T2] Update Grid Headers
- [ ] **[T2.1]** Append `font-serif` to the label element in `src/hub/QuickAccessGrid.tsx`. — *Done: Label updated*

---

## Rollback Plan
- Revert via `git checkout src/index.css src/hub/QuickAccessGrid.tsx`.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | 2026-03-21 |
| Execution | ✅ Done | 2026-03-21 |
| Completion | ✅ Done | 2026-03-21 |
