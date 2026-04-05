# Task: Starstruck Hub Redesign
**Created:** 2026-03-30
**Tier:** 3 — Architectural & Visual Redesign
**Status:** In Planning

---

## Context Summary — Hub Transformation
**Tier:** 3

**What already exists relevant to this task:**
- `Hub.tsx` / `Hub.desktop.tsx` / `Hub.mobile.tsx`: Core bento grid structure (12x12).
- `QuickAccessGrid.tsx` / `TestimonialsStrip.tsx`: Feature-level components.
- `WelcomeDialogue.tsx`: The "Starstruck" aesthetic source of truth (font-black-italic, radial glows, bloom).

**Dependencies and affected areas:**
- `src/hub/**`: Entire directory will be restyled.
- `src/index.css`: Possible new shared "Starstruck" utility classes.
- `src/landing-page/WelcomeDialogue.tsx`: Reference for motion/physics.

**Spec vs Reality gaps found:**
- The current Hub uses `amber-500` and `font-serif` heavily, which contradicts the new "Starstruck" identity (Futuristic HUD / Accent Blue).

**Hidden config files relevant to this task:**
- `tailwind.config.js`: Controls `theme-accent` and `theme-base`.

**Key constraints or risks identified:**
- **Performance**: High-intensity glows and motion on a complex hub can cause violations if not surgically optimized.
- **Information Density**: Must balance "Elite Aesthetics" with "Content Readability".

---

## Scope Boundary
What is explicitly IN scope for this task:
- Redesign of Desktop and Mobile Hub layouts.
- Overhaul of Typography (to HUD-style Sans).
- Integration of "Starstruck" glows and background athletics.
- Restyling of Project/QuickAccess cards and Testimonial strips.

What is explicitly OUT of scope (do not touch):
- Backend data structures (Firebase schemas).
- Admin OS (Wing 2) logic.
- The Welcome Screen itself (it is complete).

---

## Plan

### [Phase 1: Visual Foundation]
- [ ] **[P1.1]** Define "Starstruck" Shared Tokens — *Definition of done: index.css updated with elite utility classes (glows, text-bloom).*
- [ ] **[P1.2]** Engineering the Ethereal Background — *Definition of done: Hub.desktop/mobile features a dynamic, multi-layered glow foundation.*

### [Phase 2: Profile & Hero Transformation]
- [ ] **[P2.1]** Redesign Profile Card (Holographic projection feel) — *Definition of done: Name/Role/Photo aligned to HUD aesthetic.*
- [ ] **[P2.2]** Implement "Starstruck" Highlight Logic — *Definition of done: Quotes and roles using accent bloom.*

### [Phase 3: Grid & Card Overhaul]
- [ ] **[P3.1]** Redesign QuickAccess Cards — *Definition of done: Low-friction, high-impact cards with focus-bloom on hover.*
- [ ] **[P3.2]** Refine "Immersive Journey" CTA — *Definition of done: Full-width button transformed into an elite status-bar.*

### [Phase 4: Sidebars & Feed]
- [ ] **[P4.1]** Redesign Testimonials Feed — *Definition of done: "Live Feed" HUD style with pulsing indicator.*
- [ ] **[P4.2]** Mobile Layout Calibration — *Definition of done: Hub.mobile perfectly responsive and atmospheric.*

### [Phase 5: Performance & Polish]
- [ ] **[P5.1]** Nuclear Performance Pass — *Definition of done: 0 violations on Hub load/scroll.*
- [ ] **[P5.2]** Verification Screenshots — *Definition of done: Walkthrough updated with before/after comparisons.*

---

## Rollback Plan
- Revert `src/hub` directory to previous git state.
- Restore `index.css`.

---

## Risk Flags
- [P1.2] High intensity glows: Potential main-thread lag.
- [P4.2] Mobile spacing: Complex Hub components might feel crowded on 375px screens.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ⏳ Pending | |
| Execution | — | |
| Completion | — | |
