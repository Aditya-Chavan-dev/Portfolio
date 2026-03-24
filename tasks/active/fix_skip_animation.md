# Task: Smooth Skip Animation Transition
**Created:** 2026-03-24
**Tier:** 1 — Targeted
**Status:** ✅ Complete

---

## Context Summary Reference
- **Area**: `src/landing-page/WelcomeDialogue.tsx`
- **Goal**: Make transition less abrupt on double-Enter skip triggers.

---

## Plan
- [x] **[P1]** Update `<motion.p>` in `WelcomeDialogue.tsx` to include conditional Framer Motion props for `skip={true}`.
  - Adds cinematic fade, slight lift (`y: 8`), and blur reduction.
  - Staggers cascade: `delay: i * 0.04`.

---

## Rollback Plan
- Revert using git checkout: `git checkout src/landing-page/WelcomeDialogue.tsx`
