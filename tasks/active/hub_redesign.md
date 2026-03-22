# Task: Hub UI Redesign
**Created:** 2026-03-22
**Tier:** 3
**Status:** In Planning

---

## Context Summary — Hub UI Redesign

**Tier:** 3

**What already exists relevant to this task:**
- `HubDesktop.tsx` & `HubMobile.tsx` implement the current grid layout.
- `LandingPage` dialogue establishes a "Sophisticated / AI-fluid" vibe.
- `index.css` has design tokens (colors, gradients) but card layout feels generic.

**Dependencies and affected areas:**
- `HubDesktop.tsx`, `HubMobile.tsx` -> Core layout views.
- `TestimonialsStrip.tsx` -> Aside column renderer.

**Spec vs Reality gaps found:**
- Current Hub is blunt/high-contrast (Black grids on white layout inside header bounds). Needs rich texturing, smooth lighting, and cinematic depth to fit immersive dialogue standard.

**Key constraints or risks identified:**
- Must maintain all routing and actions (QuickAccess anchors, Journey trigger).
- Avoid "too cyberpunk" (no loud neon). Focus on arrangement elegance & smooth contrast.

---

## Scope Boundary
What is explicitly IN scope for this task:
- [ ] Generate 10 design mockup concepts with Image Generator.
- [ ] Select variation and implement layout adjustments for Desktop/Mobile.

What is explicitly OUT of scope (do not touch):
- Modifying underlying backend state hooks (`useHubContent`).

---

## Plan

### [T2] Implementation (React & Tailwind)
- [x] **[T2.1]** Update `hub.types.ts` to include `ownerQuote` and `ownerPhotoUrl` in `HubContent`.
- [x] **[T2.2]** Add sample `"ownerQuote"` and `"ownerPhotoUrl"` properties into `src/hub/content.json`.
- [x] **[T2.3]** Implement index side-by-side desktop frame stylesheet hooks inside `Hub.desktop.tsx`.
- [x] **[T2.4]** Implement continuous stack mobile wireframes inside `Hub.mobile.tsx`.
- [x] **[T2.5]** Adjust testimonials grids node lists mapping standard spacing.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | Created complete wireframe deck + Photo fit + High Fidelity |
| User Approval | ✅ Approved | PC side-by-side & Mobile stacked signed off |
| Execution | ⏳ In Progress | Preparing Implementation checklist |
