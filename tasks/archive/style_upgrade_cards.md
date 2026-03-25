# Task: Restyle QuickAccess Cards (User Reference Spec)
**Created:** 2026-03-21
**Tier:** 2 (Feature Extension)
**Status:** In Planning

---

## Context Summary Reference
- **Finding:** User wants card layout to EXACTLY match an aesthetic: solid dark background with rounded corners, high-priority bold Syne typography titles, and specifically **icons** on top of the title items headers.
- **Mitigation:** Upgrade types to support custom icons maps, update core layout for Grid Card, and replace glass containers with SOLID dark formats matching reference specs tightly.

---

## Scope Boundary
What is explicitly IN scope:
- Updating types supporting `.icon` in `hub.types.ts`.
- Updating `content.json` mapping.
- Restyling aesthetics in `QuickAccessCard.tsx`.

What is explicitly OUT of scope:
- Changing downstream routes or section sub-content rendering.

---

## Plan

### [T1] Upgrade Types & Manifest
- [ ] **[T1.1]** Add `icon?: string` to `QuickAccessItem` in `src/hub/hub.types.ts`. — *Done: Types updated*
- [ ] **[T1.2]** Backfill assignments in `src/hub/content.json` mapping:
  - Projects: `"Draft"` or `"Folder"` (Lucide names)
  - Skills: `"Settings"` or `"Diamond"`
  - Experience: `"Briefcase"`
  - About: `"User"`
  - *Done: JSON ready*

### [T2] Restyle card layout
- [ ] **[T2.1]** In `QuickAccessCard.tsx`, load Lucide icon wrappers.
- [ ] **[T2.2]** Restyle core component `className`:
  - Swap `glass-card` for explicit `bg-[#0C0C0C] border border-[#232323]`.
  - Place `Icon` on top inside a wrapper with bottom margin `mb-4`.
  - Match precise typography layout weight.
  - *Done: Aesthetics set*

---

## Rollback Plan
- Revert with `git checkout src/hub/`.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ⏳ Pending | |
| Execution | — | |
