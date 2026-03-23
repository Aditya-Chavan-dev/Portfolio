# Task: Expandable Experience Timeline
**Created:** 22 Mar 2026
**Tier:** 2 — Feature / Layout
**Status:** In Planning

---

## Context Summary Reference
- **State:** `Experience.tsx` renders dynamic items with `useExperienceContent.ts`.
- **Typings:** `ExperienceItem` uses static descriptive string.
- **Goal:** Expand list formatting, add `bulletPoints` support, implement `.useState` for click triggers, and fix connecting timeline absolute alignment.

---

## Scope Boundary
What is IN scope:
- Append `bulletPoints` to `experience.types.ts`.
- Setup template dataset inside local fallback `content.json`.
- Refactor `ExperienceCard` with Framer Motion or clean state transitions on click.

What is OUT of scope:
- Updating Firestore backends securely at this stage.

---

## Plan

### [Parent Task 1 — Data & Typings]
- [ ] **[T1.1]** Update `experience.types.ts` adding `bulletPoints: string[]`. — *Definition of done: Types upgraded*
  - Estimated effort: S
  - Depends on: none
- [ ] **[T1.2]** Populate fallback `content.json` with 2 items containing templates for Internship and Freelance layout nodes. — *Definition of done: JSON updated*
  - Estimated effort: S
  - Depends on: T1.1

### [Parent Task 2 — Component Upgrades]
- [ ] **[T2.1]** Update `ExperienceCard.tsx` with expandable mechanics using `useState` triggers on bullet container heights. — *Definition of done: Cards expandable*
  - Estimated effort: M
  - Depends on: T1.2

---

## Rollback Plan
- Revert file contents back using git index.

---

## Risk Flags (for user review)
- **None**.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ✅ Approved | |
| Execution | ✅ Done | |
| Completion | ✅ Done | |
