## [173] Refactor project details layouts and optimize metrics mapping
**Date:** 22 Mar 2026
**Type:** Feature

### What was built / What was the issue
Refactor project details layouts and optimize metrics mapping (Automated entry)

### Files changed
- Automated (Review git status)

## [172] GitHub Metadata Sync & Curation Overlay
**Date:** 22 Mar 2026
**Type:** Feature

### What was built
A live dynamic dashboard synchronizing GitHub repository metadata directly to fit-to-screen (`100vh`) modular grid canvases and details modal overlays without standing database maintenance overheads.

### How it was built
To bypass database synchronization lag triggers and standard page scroll overloads, I engineered a serverless HTTP data conduit reading version-controlled `portfolio.json` files live. It feeds dynamic React context states coupled with absolute overlays that respect strict viewport height constraints. I wrapped repeated payload hits inside a 30-minute in-memory Time-to-Live (TTL) Edge-Cache buffer load to maintain client API rate safety. The admin portal is hard-locked using whitelisted SSO filtering components rendering only for authorized administrators securely Node absolute transparently.

### Files changed
- `src/types/project.ts` — Defined unified `ProjectMeta` bucket streams layout properly Node.
- `src/lib/github.ts` — Engineered raw API stream endpoints supporting caches absolute.
- `src/hooks/useFeaturedProjects.ts` — Managed read listens listeners load properly smoothly Node.
- `src/quick-access/projects/ProjectDetailOverlay.tsx` — Dashboard views fit layouts grids accurately absolute securely correctly.
- `src/quick-access/projects/ProjectDetail.tsx` — Refactored dashboard fits isolates cleanly accurately Node.
