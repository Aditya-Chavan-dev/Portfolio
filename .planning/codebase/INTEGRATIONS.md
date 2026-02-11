# External Integrations

**Analysis Date:** 2026-02-10

## APIs & External Services

**Firebase Realtime Database:**
- Firebase SDK 12.8.0 - Real-time data synchronization and metrics tracking
  - SDK/Client: `firebase/app`, `firebase/database`
  - Auth: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_DATABASE_URL`, `VITE_FIREBASE_PROJECT_ID`
  - Used in: `src/services/firebase.ts`, `src/services/metricsService.ts`, `src/services/githubService.ts`

## Data Storage

**Databases:**
- Firebase Realtime Database
  - Connection: `VITE_FIREBASE_DATABASE_URL` (required)
  - Client: Firebase SDK direct access via `getDatabase()`, `ref()`, `onValue()`
  - Used for: Metrics tracking, GitHub data caching

**File Storage:**
- Local filesystem only (no remote file storage detected)

**Caching:**
- LocalStorage for view state persistence (`src/utils/safeStorage.ts`)
- Firebase Database for GitHub API response caching

## Authentication & Identity

**Auth Provider:**
- None detected - This is a public portfolio site
  - Implementation: No authentication system in place
  - Firebase Auth is available via SDK but not currently utilized

## Monitoring & Observability

**Error Tracking:**
- Custom ErrorBoundary component (`src/components/ErrorBoundary.tsx`)
- No third-party error tracking service (Sentry, Rollbar, etc.)

**Logs:**
- Custom logger utility (`src/utils/logger.ts`)
- Console-based logging with environment awareness

**Performance:**
- Web Vitals 5.1.0 for Core Web Vitals monitoring
  - Implementation: `src/utils/performanceMonitoring.ts`
  - Enabled in production only

## CI/CD & Deployment

**Hosting:**
- Static hosting platform (not specified in codebase, likely Vercel/Netlify/Firebase Hosting)

**CI Pipeline:**
- Git hooks via Husky 9.1.7
  - Pre-commit: ESLint checks on staged TypeScript files
  - Configured in `package.json` lint-staged section

**Build Scripts:**
- Security scanning: `npm run scan:secrets` (custom script)
- Environment validation: `npm run validate:env` (custom script)

## Environment Configuration

**Required env vars:**
- `VITE_FIREBASE_API_KEY` - Firebase project API key
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `VITE_FIREBASE_DATABASE_URL` - Realtime Database URL
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - FCM sender ID
- `VITE_FIREBASE_APP_ID` - Firebase app ID

**Secrets location:**
- `.env` file (git-ignored, not committed)
- `.env.example` template expected
- Validation enforced at application startup in `src/services/firebase.ts`

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- Firebase Realtime Database listeners (`onValue()` subscriptions)
- Automatic cleanup on component unmount

---

*Integration audit: 2026-02-10*
