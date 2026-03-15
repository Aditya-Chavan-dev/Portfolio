# Task: Strategic Roadmap Planning
**Created:** 2026-03-14
**Tier:** 3
**Status:** In Planning

---

## Context Summary — Strategic Planning

**Tier:** 3

**What already exists relevant to this task:**
- Foundation setup (Vite, TS, Tailwind v4) is complete.
- Landing Page is implemented with a decoupled `content.json` architecture.
- PRD and Admin Spec define a deep integration between the UI and the CMS.

**Dependencies and affected areas:**
- Entire project roadmap.

**Spec vs Reality gaps found:**
- None.

**Hidden config files relevant to this task:**
- None.

**Existing partial implementations found:**
- The decoupled JSON approach on the Landing Page is a prototype for the CMS integration.

**New Strategic Queries:**
- **Admin App Layout:** Differentiation between "Live Metrics" and "Portfolio Editing."
- **Authentication Flow:** Mechanism for identifying the Admin session safely.

**Key constraints or risks identified:**
- Building the Admin side too early might result in a CMS that doesn't fit the final UI needs.
- Building the Portfolio entirely without considering the CMS might lead to hard-to-migrate components.

---

## Scope Boundary
What is explicitly IN scope for this task:
- Defining the next 3-4 development milestones.
- Deciding between "Portfolio-First" or "Admin-First" approach.

What is explicitly OUT of scope (do not touch):
- Coding actual features.

---

## Plan

### Milestone Definition
- [x] ✅ **[T1.1]** Weigh pros/cons of Portfolio vs Admin priority based on PRD. — *Definition of done: Clear recommendation provided to user.*
- [x] ✅ **[T1.2]** Define Admin App architecture and Auth flow (Hidden Entry + Zero-Trust). — *Definition of done: Technical explanation accepted by the user.*
- [ ] 🔄 **[T1.3]** Identify the next section to build (About or Experience). — *Definition of done: User confirms next UI target.*

---

## Rollback Plan
N/A (Strategic planning).

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | 🔄 In Progress | Analyzing roadmap |
