# Firestore Section Audit

| Section | Status | Firestore path (if connected) | Data fetch method | Hardcoded file/variable (if static) |
|---|---|---|---|---|
| Welcome Screen | ✅ Connected | `adminConfig/welcomeScreen` | `onSnapshot` in `useWelcomeContent.ts` | `landing-page/content.json` (fallback) |
| Hub | ✅ Connected | `live/hub` | `getDoc` in `useHubContent.ts` → **MIGRATING to `onSnapshot`** | `hub/content.json` (fallback) |
| Experience | ✅ Connected | `live/experience` | `getDoc` in `useExperienceContent.ts` → **MIGRATING to `onSnapshot`** | `experience/content.json` (fallback) |
| Skills | ✅ Connected | `live/skills` | `getDoc` in `useSkillsContent.ts` → **MIGRATING to `onSnapshot`** | `skills/content.json` (fallback) |
| Projects | ✅ Connected (hybrid) | `projects/{repoName}` + GitHub API | `onSnapshot` in `useAdminProjects.ts`, `getDocs` in `useFeaturedProjects.ts` | N/A — data from GitHub API |
| Certifications | ❌ Hardcoded | N/A | N/A | `certifications/content.json` (direct import) → **MIGRATING to `onSnapshot`** |
| Contact | ❌ Not implemented | N/A | N/A | N/A — adding `live/contact` in seed |
| Testimonials | ✅ Connected | `testimonials` collection | `onSnapshot` in `subscribeToApprovedTestimonials` | N/A |
| 404 / Not Found | ✅ Connected | `live/notFound` | `getDoc` in `firestore.service.ts` | `not-found/content.json` (fallback) |
