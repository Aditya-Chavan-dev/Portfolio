# Task: Punchy Landing Page
**Created:** 2026-03-14
**Tier:** 2
**Status:** Completed

---

## Context Summary Reference

## Context Summary — Punchy Landing Page

**Tier:** 2

**What already exists relevant to this task:**
- The foundation of the app (Vite, TS, Tailwind v4 configs) is set up and functional.
- `src/App.tsx` has a generic setup placeholder.
- We discussed a decoupled content architecture where copy is driven by a `.json` config to support precise formatting (`whitespace-pre-wrap`) and easy CMS integration later.

**Dependencies and affected areas:**
- `src/LandingPage/` directory will be entirely new.
- `src/App.tsx` will be adapted to swap the generic placeholder for the new `LandingPage` component.

**Spec vs Reality gaps found:**
- User explicitly emphasized the Landing Page is not just a standard "Hero", but a highly formatted dialogue/flex hook to impress recruiters in 8-12 seconds.

**Hidden config files relevant to this task:**
- None.

**Existing partial implementations found:**
- None.

**Key constraints or risks identified:**
- Content arrangement (spaces, newlines) must be exactly preserved from the JSON. We will use CSS `whitespace-pre-wrap` to guarantee this behaves correctly.
- Must ensure animations (Framer Motion) look extremely professional.

---

## Scope Boundary
What is explicitly IN scope for this task:
- Creation of `src/LandingPage/content.json` storing the placeholder text and whitespace layout.
- Creation of `src/LandingPage/LandingPage.tsx` fetching and rendering the JSON content with `whitespace-pre-wrap` styling.
- Adding Framer Motion animations to fade/slide the punchy dialogue in.
- Injecting the component into `src/App.tsx`.

What is explicitly OUT of scope (do not touch):
- Other portfolio sections.
- CMS/Backend integration (just proving local JSON works for now).

---

## Execution Baseline
**Branch:** main
**Last commit:** 1200d475b8b58defe31c7dba90cab80fd7506f3a
**Date started:** 2026-03-14 12:42:00

---

## Plan

### Intended Folder Structure
```text
src/
└── LandingPage/
    ├── content.json          # Dialogue, spacing, and CTA text
    ├── LandingPage.tsx       # React Component (UI, Framer Motion)
    └── index.ts              # Export barrel (optional, clean imports)
```

### Content Configuration
- [x] ✅ **[T1.1]** Create `src/LandingPage/content.json` representing the highly configurable spacing and dialogue to be shown to the recruiter. — *Definition of done: JSON file structured with flexible text fields.*
  - Estimated effort: S
  - Depends on: none
  - External blocker: none

### UI Development
- [x] ✅ **[T2.1]** Create `src/LandingPage/LandingPage.tsx` reading the JSON and applying `whitespace-pre-wrap` to honor all spaces/newlines. — *Definition of done: The text visually mirrors text-file pacing/gaps.*
  - Estimated effort: M
  - Depends on: T1.1
  - External blocker: none

### Animation & Assembly
- [x] ✅ **[T3.1]** Integrate `framer-motion` to animate the layout entry (fade up/in) for maximum impact. — *Definition of done: Page load triggers a sleek transition.*
  - Estimated effort: S
  - Depends on: T2.1
  - External blocker: none
- [x] ✅ **[T3.2]** Update `src/App.tsx` to mount `<LandingPage />` in place of the current setup complete message. — *Definition of done: User sees the Landing Page when loading the site.*
  - Estimated effort: S
  - Depends on: T3.1
  - External blocker: none

---

## Rollback Plan
If execution fails or is abandoned midway:
- Delete `src/LandingPage/` directory completely.
- Revert `src/App.tsx` back to the original Setup Complete code.

---

## Risk Flags (for user review)
High-impact or high-risk tasks that the user should scrutinise before approving:
- None. This is a purely visual UI addition.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ✅ Approved | |
| Execution | ✅ Done | |
| Completion | ✅ Done | Landing Page scaffolded with exact whitespace control. |
