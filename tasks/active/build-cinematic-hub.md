# Task: Build Cinematic Hub
**Created:** 2026-04-03
**Tier:** 3 — Architectural & Visual Redesign
**Status:** In Planning

---

## Context Summary — Cinematic Hub Redesign
**Tier:** 3

**What already exists relevant to this task:**
- `src/pages/Hub.tsx`: Current hub page (to be redesigned).
- `src/App.tsx`: Routing (contains routes for /hub and detail pages).
- `src/index.css`: Global styles, grain overlay, and theme variables.
- `src/pages/ComingSoon.tsx`: Existing coming soon page (to be redesigned).
- `lucide-react`, `framer-motion`, `react-router-dom`: Key dependencies already present.

**Dependencies and affected areas:**
- `src/pages/Hub.tsx`: Main entry point for the redesigned hub.
- `src/pages/ComingSoon.tsx`: Redesigned for the new aesthetic.
- `src/components/hub/**`: Sub-components for identifying, grid, and testimonials.
- `src/index.css`: Global theme variables and fonts.
- `tailwind.config.js`: Custom color tokens.

**Spec vs Reality gaps found:**
- User requested "Cormorant Garamond", "Syne", and "JetBrains Mono" fonts. Existing fonts are "Cabinet Grotesk" and "Satoshi".
- User requested specific cinematic dark colors. Existing dark theme use pure black and amber.
- The 3-column full-viewport layout is a significant departure from any existing scrolling or partial grids.

**Hidden config files relevant to this task:**
- `tailwind.config.js`: Controls custom color mappings.
- `vite.config.ts`: Controls path aliases (e.g., `@/`).

**Key constraints or risks identified:**
- **Zero Scrolling**: Ensuring all content fits within the viewport across different desktop resolutions.
- **Micro-interactions**: High-fidelity Framer Motion work required for the cinematic feel.
- **Font Availability**: Loading weights via CDN must be reliable.

---

## Scope Boundary
What is explicitly IN scope for this task:
- Redesign of `Hub.tsx` into a 3-column bento layout.
- Implementation of `IdentityCard`, `QuickAccessGrid`, `QuickAccessCard`, and `TestimonialsPanel`.
- Redesign of `ComingSoon.tsx` with cinematic effects.
- Updating `tailwind.config.js` with new palette.
- Updating `index.css` with new fonts and grain overlay.
- Staggered entrance animations and hover effects using Framer Motion.

What explicitly OUT of scope (do not touch):
- Modifying existing detail views (`Projects.tsx`, `Experience.tsx`, etc.).
- Admin Panel logic or styles.
- Firebase integration logic (assume existing data if needed, but the structure is mainly static for now).

---

## Plan

### [Phase 1: Foundation & Styling]
- [x] **[T1.1]** Update `index.css` — *Definition of done: Fonts imported, grain overlay confirmed at 0.035 opacity, global scrollbars hidden.*
- [x] **[T1.2]** Update `tailwind.config.js` — *Definition of done: All custom color tokens from spec added to extend.*
- [x] **[T1.3]** Create `src/data/testimonials.js` — *Definition of done: Placeholder testimonial data populated.*

### [Phase 2: Component Architecture]
- [ ] **[T2.1]** Build `IdentityCard.jsx` — *Definition of done: Photo, name, role, tagline, and immersive journey button implemented.*
- [ ] **[T2.2]** Build `QuickAccessCard.jsx` — *Definition of done: Card with hover effects and navigation.*
- [ ] **[T2.3]** Build `QuickAccessGrid.jsx` — *Definition of done: 2x2 grid of cards with staggered entrance.*
- [ ] **[T2.4]** Build `TestimonialsPanel.jsx` — *Definition of done: Auto-cycling testimonials with pulsing indicator.*

### [Phase 3: Pages & Routing]
- [ ] **[T3.1]** Redesign `Hub.jsx` — *Definition of done: 3-column viewport-locked bento grid layout.*
- [ ] **[T3.2]** Redesign `ComingSoon.jsx` — *Definition of done: Full-screen cinematic message with center-glow.*
- [ ] **[T3.3]** Verify `App.tsx` routing — *Definition of done: Transitions work between Hub and ComingSoon.*

### [Phase 4: Polish & Performance]
- [x] **[T4.1]** Fine-tune Framer Motion timings — *Definition of done: Cinematic flow matches the spec's delay values.*
- [x] **[T4.2]** Verify "Never Break" Design Laws — *Definition of done: Manual audit of borders, colors, and line-heights.*

---

## Rollback Plan
- Revert changes to `src/pages/Hub.tsx`, `src/pages/ComingSoon.tsx`, `src/index.css`, `tailwind.config.js`.
- Delete newly created components in `src/components/hub/`.

---

## Risk Flags
- **Viewport Constraints**: Content might overflow on smaller laptop screens (e.g., 13 inch).
- **Font Loading**: Garamond has many weights; choice of weight affects the "cinematic" feel significantly.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ In Progress | Context Summary and initial plan drafted. |
| User Approval | ⏳ Pending | |
| Execution | — | |
| Completion | — | |
