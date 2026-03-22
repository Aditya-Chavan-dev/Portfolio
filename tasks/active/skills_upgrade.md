# Task: Skills Icons & Project Linking
**Created:** 22 Mar 2026
**Tier:** 2 — Feature
**Status:** In Planning

---

## Context Summary Reference
**What already exists:**
- `content.json` lists of items under categories (`React`, `TypeScript`).
- `SkillCategoryBlock.tsx` renders flat lists with percentage progress bars.
- `useFeaturedProjects` available to pull array data.

**Key constraints:**
- Adblockers block onSnapshot loops, fallback static data supports ensure rendering continuously.
- Official icons need mapped string Slugs if utilizing Devicon CDN.

---

## Scope Boundary
What is IN scope:
- Append SVG icon mappings/rendering to `SkillCategoryBlock.tsx`.
- Map related projects list on hover/expand inside `SkillCategoryBlock.tsx`.
- Update `content.json` or mapping dicts creating Slugs.

What is OUT of scope:
- Re-engineering layout to 3D orbiting canvases unless requested.

---

## Plan

### [Parent Task 1 — Prepare Typings and Icons mappings]
- [ ] **[T1.1]** Create icon dictionary slug mapping inside `SkillCategoryBlock.tsx` containing Devicon SVG templates.
- [ ] **[T1.2]** Update `SkillItem` in `skills.types.ts` to include optional `iconSlug` or compute it.

### [Parent Task 2 — Map Projects to Skills]
- [ ] **[T2.1]** Import `useFeaturedProjects` into `SkillCategoryBlock.tsx` to read the global projects catalog.
- [ ] **[T2.2]** Render a matched project tags list below each skill items row securely Node.

### [Parent Task 3 — Verify and Layout updates]
- [ ] **[T3.1]** Ensure layout remains grid-fluid absolute breakpoints framing securely triggers.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ⏳ Pending | |
| Execution | — | |
| Completion | — | |
