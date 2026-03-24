# Task: Design Admin Side
**Created:** 2026-03-24
**Tier:** 2 - Feature
**Status:** In Planning

---

## Context Summary Reference
### Tier: 2

**What already exists relevant to this task:**
- `src/Admin`: Contains `AdminLogin.tsx` (placeholder) and `AdminPanel.tsx`.
- `AdminPanel`: Supports `WelcomeScreenEditor` and `AdminProjectsTab`.
- `WelcomeScreenEditor`: Uses Firestore (`adminConfig/welcomeScreen`) with drag-and-drop reordering.
- `AdminProjectsTab`: Uses custom hook `useAdminProjects` merging GitHub repos with Firestore order/featured flag.
- `ProtectedRoute`: Used in `App.tsx` but `AdminLogin` only has dummy navigation right now.

**Dependencies and affected areas:**
- `src/App.tsx`: Contains `/amgl-3-10` (Login) and `/amgl-panel` (Panel).
- `src/shared/ProtectedRoute`: Guards the panel but needs active auth state.
- Firebase: Auth setup is needed.

**Spec vs Reality gaps found:**
- README lists "Admin dashboard" but it's partially implemented with no Auth and missing CRUD for Experience/Skills.

**Hidden config files relevant to this task:**
- `.env`: Contains Firebase keys. `database.rules.json` exists for Security rules.

**Existing partial implementations found:**
- Login is a pure static view that does not trigger auth.

**Key constraints or risks identified:**
- Firebase Security Rules must be reviewed to ensure ONLY admins can write to collections.
- Admin Panel access without absolute protection might leak data if security rules are open.

---

## Scope Boundary
What is explicitly IN scope for this task:
- [ ] Design Auth flow (Firebase Login).
- [ ] Expand Management Tabs (Experience, Skills, Certifications).
- [ ] UI Consistency Upgrade (Gold Glow Dark Theme).
- [ ] Secure Data syncing with Firestore.

What is explicitly OUT of scope (do not touch):
- Modifying the public main pages (Landing, Hub) style significantly, except standardizing hooks.

---

## Plan

### [Phase 1] Design & Discussion 
- [x] **[P1.1]** Analysis of existing admin code  — *Done*
- [ ] **[P1.2]** Propose design & architecture in `implementation_plan.md`  — *Def of done: File created and user notified*
  - Estimated effort: S
  - Depends on: P1.1

### [Phase 2] Authentication 
- [ ] **[P2.1]** Implement Firebase Authentication in `AdminLogin.tsx` — *Def of done: Redirects correctly on successful auth*
  - Estimated effort: M
- [ ] **[P2.2]** Update `ProtectedRoute.tsx` to read actual auth state — *Def of done: Redirects unauthorized to login*
  - Estimated effort: S

### [Phase 3] Management Extensions (CRUD)
- [ ] **[P3.1]** Create Experience Editor component — *Def of done: Modifies Experience data in Firebase*
  - Estimated effort: M
- [ ] **[P3.2]** Create Skills Editor or Certification Tab — *Def of done: Persists to Firebase*
  - Estimated effort: M

### [Phase 4] Styling Polish 
- [ ] **[P4.1]** Apply Gold Accented Dark theme consistently — *Def of done: Layout matches premium look*
  - Estimated effort: S

---

## Rollback Plan
If execution fails or is abandoned midway:
- Revert changes to `src/App.tsx`, `AdminLogin.tsx`, and `AdminPanel.tsx` using git stash/checkout.

---

## Risk Flags (for user review)
- **Firebase Rules Update**: Necessary to lock down writes to `adminConfig` and `projects`. No writing from unauthenticated callers.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | Analyzed existing workspace |
| User Approval | ⏳ Pending | Awaiting discussion |
