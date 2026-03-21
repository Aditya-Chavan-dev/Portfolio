# Task: Welcome Screen v6.0 Overhaul & Admin Editor
**Created:** 2026-03-21
**Tier:** 2
**Status:** In Planning

---

## Context Summary Reference
- **Existing State**: `src/landing-page` renders the Welcome Screen with a header/footer structure that conflicts with the "pure introductory center-only" v6.0 spec. The dialogues fetch from `live/welcome`.
- **Admin Panel**: `src/admin/AdminPanel.tsx` is completely empty ("coming in a future phase").
- **Divergences**:
  - Layout must be pure centered three-element structure.
  - Color pallet is restrictive (`#0A0A0A`, highlights, constants).
  - Data path shifts to `adminConfig/welcomeScreen` as source of truth.
  - Standard Admin Editor for text rows with drag-drop and row highlight (Batman yellow line) is required.

---

## Scope Boundary
**In Scope**:
- Rebuild `/` route layout/styles to centered 3-element spec
- Rewrite Typewriter timing and Skip mechanics for the Welcome component
- Setup `AdminPanel` boilerplate with layout
- Create a row editor for `welcomeScreen` inside Admin panel
- Connect to Firestore path `adminConfig/welcomeScreen`
- Verify styles match exact layout variables (Garamond/JetBrains).

**Out of Scope**:
- Implementing other Admin Panel modules (Hub, Projects etc.) not explicitly covered.
- Changing `themeToggle` mechanics besides placement restrictions on this section.

---

## Plan

### [T1] Data Layer Setup
- [x] **[T1.1]** Create `getWelcomeConfig` & `updateWelcomeConfig` methods in `firestore.service.ts` connecting to `adminConfig/welcomeScreen`. *DoD: TypeScript can use these for reads/writes.*
- [x] **[T1.2]** Update `landing.types.ts` layout to match `{ dialogue: string[], highlightIndex: number }`. *DoD: Full compilation with no typed errors.*

### [T2] Welcome Screen layout overhaul
- [x] **[T2.1]** Remove Header, Footer, Background Ornaments from `LandingPage.desktop.tsx` & `LandingPage.mobile.tsx`. *DoD: Blank background layout centered view.*
- [x] **[T2.2]** Set strict CSS variable overrides in `index.css` for background `#0A0A0A` and target font families for serif/monospace. *DoD: Layout fonts match specs accurately on screen.*

### [T3] Animation Sequence & Timing overhaull
- [x] **[T3.1]** Overhaul typewriter states inside `WelcomeDialogue.tsx` to align strictly with Phase 1-3 timings, pausing delays and accurate Batman offsets. *DoD: Visually verified animation pauses.*
- [x] **[T3.2]** Implement Skip mechanic (Dim -> Smooth arrive). *DoD: Skipping correctly speeds up text arrival with frame dim/fade.*

### [T4] Admin Panel Implementation
- [x] **[T4.1]** Update `AdminPanel.tsx` to house layout structure with Content Section selector dashboard. *DoD: Layout page renders with blank Dashboard frame.*
- [x] **[T4.2]** Create `WelcomeScreenEditor.tsx` with row based list (Drag actions, text input triggers, Star row highlighting mechanics). *DoD: Renders live editing nodes iteratively.*
- [x] **[T4.3]** Connect Admin save trigger to trigger Firestore `updateWelcomeConfig`. *DoD: Dialogue changes update DB live.*

---

## Rollback Plan
If failures occur middleware:
- Revert ` LandingPage.desktop.tsx` and `.mobile.tsx` to existing setup using Git reset
- Restore `firestore.service.ts`
- Clean `AdminPanel.tsx` buffer adjustments.

---

## Risk Flags
- **Database Dependency**: Initial trigger requires standard defaults seeded to Firestore `adminConfig/welcomeScreen` mock set otherwise read handles fail.
- **Dnd libraries inclusion for admin mechanics**: Check if existing Framer methods satisfy `reorder` support without inflating package bloat.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ✅ Approved | 2026-03-21 09:28 — Full plan approved |
| Execution | ✅ Done | Initial T1 - T4 Complete |
| Completion | ✅ Complete | Build Passes 2026-03-21 |

