# Task: Theme System Fix — Global Dark/Light Mode
**Created:** 2026-03-20
**Tier:** 3
**Status:** In Planning

---

## Context Summary Reference
**Tier:** 3

**What already exists relevant to this task:**
- `src/shared/ThemeProvider.tsx` correctly exports `useThemeContext()` with `{ theme, toggle }`.
- `@/` path alias is successfully configured and valid for imports.
- `index.css` imports standard Tailwind v4.

**Dependencies and affected areas:**
- `src/shared/FloatingThemeToggle.tsx` (New)
- `src/App.tsx` (Wire Toggle)
- `src/index.css` (Style definitions)
- Migrating 25+ React component files to use token classes instead of hardcoded dark variants.

**Spec vs Reality gaps found:**
- None. The provided specification and code snippets align perfectly with the context.

**Hidden config files relevant to this task:**
- None.

**Existing partial implementations found:**
- None.

**Key constraints or risks identified:**
- Risk of breaking layout if classes are missing from replacements map structure.
- Large volume of file modifications.

---

## Scope Boundary
What is explicitly IN scope for this task:
- Create `FloatingThemeToggle.tsx` to float on all routes securely.
- Append theme CSS variables rules and utility classes to `src/index.css`.
- Update listed 25+ files replacing listed class variations with corresponding Design Tokens.

What is explicitly OUT of scope (do not touch):
- Modifying conditional routing logic or standard flow animations beyond visual color mapping.

---

## Plan

### [T1] Part 1 - Add Floating Toggle
- [ ] **[T1.1]** Create `src/shared/FloatingThemeToggle.tsx` with the persistent button logic.
- [ ] **[T1.2]** Import and mount `<FloatingThemeToggle />` globally inside `src/App.tsx`.

### [T2] Part 2 - CSS Tokens setup
- [ ] **[T2.1]** Append standard `:root` & `.dark` CSS tokens structure to `src/index.css`.
- [ ] **[T2.2]** Append `.bg-theme-primary` etc. utility structures below classes.

### [T3] Part 3 - Component Migration (Batch 1: Core files)
- [ ] **[T3.1]** Update `src/index.css` body background properties definition.
- [ ] **[T3.2]** Update context and shared items: `ThemeToggle.tsx`, `SectionNav.tsx`.
- [ ] **[T3.3]** Update Landing layout: `LandingPage.desktop.tsx`, `LandingPage.mobile.tsx`, `WelcomeDialogue.tsx`.

### [T4] Part 4 - Component Migration (Batch 2: Hub & Cards)
- [ ] **[T4.1]** Update `Hub.desktop.tsx` and `Hub.mobile.tsx`.
- [ ] **[T4.2]** Update card structures `QuickAccessCard.tsx`, `.projects/ProjectCard.tsx`, `.projects/Projects.desktop.tsx/.mobile.tsx`.
- [ ] **[T4.3]** Update `Experience.tsx`, `.skills/Skills.tsx`, `.about/About.tsx` related child subcomponents.

### [T5] Part 5 - Batch 3 Rest
- [ ] **[T5.1]** Update admin panels and generic page files listed.

---

## Rollback Plan
- Standardize revert to HEAD revision if layout breakage happens during bulk edit.

---

## Risk Flags (for user review)
- Broad volume of files to edit securely.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ⏳ Pending | |
| Execution | — | |
| Completion | — | |
