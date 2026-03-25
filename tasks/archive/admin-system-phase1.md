# Task: Admin System — Phase 1 (Firestore Foundation)
**Created:** 2026-03-24
**Tier:** 3 — Architectural
**Status:** ✅ Complete

---

## Plan

### Task Group 1 — Audit & Schema Prep
- [x] **[T1.1]** Create `src/admin/firestore-audit.md`
- [x] **[T1.2]** Update type definitions (`skills.types.ts`, `experience.types.ts`, `certifications.types.ts`)
- [x] **[T1.3]** Update `content.json` fallback files to new schemas

### Task Group 2 — Seed Script
- [x] **[T2.1]** Create `scripts/seedFirestore.js` (Admin SDK)
- [x] **[T2.2]** Old `src/shared/seed.ts` — superseded (not modified, kept for reference)

### Task Group 3 — Hook Migrations (getDoc → onSnapshot)
- [x] **[T3.1]** Migrate `useHubContent.ts` to `onSnapshot`
- [x] **[T3.2]** Migrate `useSkillsContent.ts` to `onSnapshot`
- [x] **[T3.3]** Migrate `useExperienceContent.ts` to `onSnapshot`
- [x] **[T3.4]** Create `useCertificationsContent.ts` with `onSnapshot`

### Task Group 4 — Component Updates
- [x] **[T4.1]** Wire `Certifications.tsx` to `useCertificationsContent()` + skeleton + archive filter
- [x] **[T4.2]** Update `SkillCategoryBlock.tsx` for new `SkillItem` fields
- [x] **[T4.3]** Add `archived` filter to Experience public view

### Task Group 5 — Cleanup & Cross-Cutting
- [x] **[T5.1]** Clean up `firestore.service.ts` — removed unused `getSkillsContent`, `getExperienceContent`
- [x] **[T5.2]** Remove `simple-icons` from `package.json` + install `firebase-admin` as devDep
- [x] **[T5.3]** Toast system (`Toast.tsx` + `useToast.ts` + ToastProvider + CSS animation)

### Task Group 6 — Verification
- [x] **[T6.1]** TypeScript check (`tsc --noEmit`) — ✅ zero errors
- [x] **[T6.2]** Production build (`npm run build`) — ✅ success (11s)
- [ ] **[T6.3]** Visual verification in browser — deferred to user (seed script must run first)

---

## Status Log
| Step | Status | Notes |
|---|---|---|
| Context Analysis | ✅ Done | 2026-03-24 — Full Tier 3 audit |
| Schema Conflicts | ✅ Resolved | 2026-03-24 — All 5 questions answered |
| Planning | ✅ Done | 2026-03-24 — Plan written + approved |
| Execution | ✅ Done | 2026-03-24 — All code changes applied |
| Verification | ✅ Done | 2026-03-24 — tsc + build pass |
| Completion | ⏳ Pending | User must run seed script + verify live site |
