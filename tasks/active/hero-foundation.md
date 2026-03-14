# Task: Project Setup and Configuration Scaffold
**Created:** 2026-03-14
**Tier:** 2
**Status:** In Planning

---

## Context Summary Reference

## Context Summary — Project Setup and Configuration Scaffold

**Tier:** 2

**What already exists relevant to this task:**
- `package.json` contains dependencies for React 19, Vite, Tailwind CSS v4 (`@tailwindcss/vite`), Framer Motion, and GSAP. 
- However, standard configurations like `vite.config.ts`, `tsconfig.json`, and `tsconfig.node.json` are absent.
- `src/main.tsx` only renders a bare "Hello World", with no styles or `App` component connection.

**Dependencies and affected areas:**
- The root needs Vite and TypeScript configuration files to compile and bundle correct configurations.
- `src/index.css` is required to inject Tailwind CSS v4 variables and the custom Obsidian/Gold themes defined in the README.
- `src/main.tsx` needs to bootstrap an `App` element, linking in `index.css`.

**Spec vs Reality gaps found:**
- The README and Package.json assume `vite`, `tsc -b`, etc. are workable, but running them would fail due to missing `.tsconfig` files and `vite.config.ts`.

**Hidden config files relevant to this task:**
- None exist yet; we must create the TypeScript and Vite configs.

**Existing partial implementations found:**
- Only the `package.json` setup and bare `index.html`.

**Key constraints or risks identified:**
- Need to configure Vite with TailwindCSS v4 plugin seamlessly.
- Design specifications (Obsidian, Gold Glow, Glassmorphism, Space Grotesk/Inter fonts) strongly dictate CSS variable requirements.

---

## Scope Boundary
What is explicitly IN scope for this task:
- Setup of `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, and `tsconfig.app.json` (Vite TS standards).
- Setup of `/src/index.css` with Tailwind 4 imports, Google Fonts, and custom brand CSS variables.
- Creation of `/src/App.tsx` and connecting it to `/src/main.tsx` to prove the setup runs.

What is explicitly OUT of scope (do not touch):
- Landing Page UI creation or Framer Motion animations (to be done in the next task).
- Implementing subsequent sections (About, Work Experience, Projects, Admin CMS).
- Backend Firebase logic (just UI for now).

---

## Execution Baseline
**Branch:** main
**Last commit:** b7989fdbaa4c408d9bec81eedc48ae81b02384dd
**Date started:** 2026-03-14 12:12:00

---

## Plan

### Foundation Configs
- [x] ✅ **[T1.1]** Create `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` tailored for React+Vite standard structure. — *Definition of done: The build command runs `tsc` without errors.*
  - Estimated effort: S
  - Depends on: none
  - External blocker: none
- [x] ✅ **[T1.2]** Create `vite.config.ts` including `@vitejs/plugin-react` and `@tailwindcss/vite` plugins. — *Definition of done: Starting the dev server will correctly load Vite, React, and Tailwind v4.*
  - Estimated effort: S
  - Depends on: none
  - External blocker: none
- [x] ✅ **[T1.3]** Set up `src/index.css` with `@theme` blocks for Tailwind v4 incorporating Obsidian, Gold Glow, Surface colors, and font families. — *Definition of done: Running the app applies these base variables globally.*
  - Estimated effort: M
  - Depends on: T1.2
  - External blocker: none

### Initial Component Wiring
- [x] ✅ **[T2.1]** Create `src/App.tsx` with a standard layout wrapper and simple state for theme tracking (Dark/Light). — *Definition of done: `App.tsx` exists and provides a React context or state for theming.*
  - Estimated effort: S
  - Depends on: T1.3
  - External blocker: none
- [x] ✅ **[T2.2]** Update `src/main.tsx` to mount `App` and import `index.css`. — *Definition of done: The "Hello World" is replaced by the actual `App` wrapper styled properly.*
  - Estimated effort: S
  - Depends on: T2.1
  - External blocker: none

---

## Rollback Plan
If execution fails or is abandoned midway:
- Delete `vite.config.ts`, `tsconfig*.json`.
- Revert `src/main.tsx` back to "Hello World".
- Delete newly created `src/App.tsx` and `src/index.css`.

---

## Risk Flags (for user review)
High-impact or high-risk tasks that the user should scrutinise before approving:
- **T1.2**: Relying on Tailwind CSS v4 in Vite necessitates the bleeding edge setup which might conflict occasionally, but tests show it works natively in standard Vite 6/5 setups.

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Planning | ✅ Done | |
| User Approval | ✅ Approved | |
| Execution | ✅ Done | Save point committed |
| Completion | ✅ Done | Moved to archive |
