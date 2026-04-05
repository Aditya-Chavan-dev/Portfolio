# Task: Starstruck Portfolio Overhaul (The Operative's Dossier)
**Created:** 2026-03-28
**Tier:** 3
**Status:** In Planning

---

## Context Summary Reference
The user wants a radical, creative overhaul for the public-facing portfolio. Goal: "Starstruck" premium quality. 
Creative Identity: **"The Operative's Dossier"** — a high-security, technical system interface layout. 
Benchmarks: Awwwards-level interactions, deep glassmorphism, kinetic typography, and "living" UI elements.

---

## Scope Boundary
What is explicitly IN scope for this task:
- Redesigning `src/index.css` with a "System HUD" utility set.
- Refactoring `LandingPage` into a "System Initialization" sequence.
- Refactoring `Hub` into a "Bento Command Center" with magnetic interactions.
- Implementing "Flashlight" hover effects and kinetic typography.
- Standardizing typography: Syne (Headers) + High-end Mono (Labels).

What is explicitly OUT of scope (do not touch):
- Modifying Admin Wing logic (already complete).
- Backend Firebase data structure changes.

---

## Plan

### [Phase 1: The Design OS (CSS & Layout)]
- [ ] **[T1.1]** Update `index.css` with System-HUD tokens (Deep darks, scanline patterns, and noise). — *Definition of done: background has a texture/grid overlay.*
- [ ] **[T1.2]** Implement the "Flashlight" and "Magnetic" utility classes. — *Definition of done: reusable classes for starstruck interactions.*
- [ ] **[T1.3]** Consolidate font pairings (Syne/Mono) globally. — *Definition of done: typography feels like a technical terminal.*

### [Phase 2: System Initialization (Intro)]
- [ ] **[T2.1]** Refactor `WelcomeDialogue.tsx` into a "Kernel Boot" sequence with scanlines. — *Definition of done: Intro feels like a high-end system startup.*
- [ ] **[T2.2]** Redesign the "System HUD" navigation (overlay style). — *Definition of done: Navigation feels like a holographic HUD.*

### [Phase 3: The Bento Command Center (Hub)]
- [ ] **[T3.1]** Redesign `Hub.desktop.tsx` as a high-performance Bento Grid. — *Definition of done: Non-standard grid with varying depths.*
- [ ] **[T3.2]** Implement "Living Borders" and "Flashlight" effects on Hub cards. — *Definition of done: Cards react magnetically to the cursor.*

### [Phase 4: Mission Files (Project Showcase)]
- [ ] **[T4.1]** Redesign `QuickAccessCard.tsx` as "Technical Dossiers". — *Definition of done: Project cards show metadata and technical specs on hover.*
- [ ] **[T4.2]** Apply "God Mode" level micro-animations to all project items. — *Definition of done: Hovering cards expansions and glow reveals.*

### [Phase 5: Polish & Deployment]
- [ ] **[T5.1]** Global interaction audit (staggered loads, magnetic buttons). — *Definition of done: Every element feels premium and smooth.*
- [ ] **[T5.2]** Final production build and deployment to Firebase. — *Definition of done: Zero-error build live on the web.*

---

## Rollback Plan
- Revert `index.css` and restore landing/hub from Git commit `090102c`.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | [/] In Progress | Designing "System Initialization" flow. |
| User Approval | ⏳ Pending | |
| Execution | — | |
| Completion | — | |
