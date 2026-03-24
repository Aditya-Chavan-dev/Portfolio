# Task: Admin System — Phase 4 (God Mode Context & Bottom Dock)
**Created:** 2026-03-24
**Tier:** 3 — Architectural
**Status:** In Execution

---

## Plan

### Task Group 1 — EditModeContext Framework (Task 4.1)
- [ ] **[T1.1]** Create `EditModeContext.tsx` with state: `mode` ('edit' | 'preview' | 'idle'), `hasUnsavedChanges`, and functions to toggle modes.
- [ ] **[T1.2]** Wrap `<App />` with `EditModeProvider` in `main.tsx` (nested inside AuthProvider).

### Task Group 2 — Bottom Dock UI (Task 4.2)
- [ ] **[T2.1]** Create `BottomDock.tsx` component.
- [ ] **[T2.2]** Render buttons: `[ ✏️ Edit ]` (idle mode), `[ 👁️ Save & Preview ]` (edit mode), `[ ✏️ Back to Edit ]` (preview mode), `[ 🚀 Deploy ]` (preview mode).
- [ ] **[T2.3]** Add Admin Settings/Back to Dashboard link to the dock.
- [ ] **[T2.4]** Style as a floating frosted glass bar at the bottom center.

### Task Group 3 — Wire into layout (Task 4.3)
- [ ] **[T3.1]** Replace the old `AdminControlBar` references in `App.tsx` with `<BottomDock />`.
- [ ] **[T3.2]** Ensure it only renders on public routes when `sessionStorage.getItem('admin_edit_session') === 'true'`.

### Task Group 4 — Verification
- [ ] **[T4.1]** TypeScript check
- [ ] **[T4.2]** Run dev server to verify render

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| Execution | 🔄 In Progress | |
