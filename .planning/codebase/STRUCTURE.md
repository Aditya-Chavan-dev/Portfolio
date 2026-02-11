# Codebase Structure

**Analysis Date:** 2026-02-10

## Directory Layout

```
g:\PORTFOLIO/
├── .planning/              # GSD artifacts (newly created)
├── docs/                   # Project documentation
├── public/                 # Static assets served as-is
├── scripts/                # Build and security scripts
├── src/                    # Application source code
│   ├── Admin/              # Admin-specific features
│   ├── Background/         # Background visual components
│   ├── HeroSection/        # Landing hub/hero view components
│   ├── ImmersiveJourney/   # Immersive experience flow
│   ├── LandingPage/        # Initial landing view
│   ├── QuickNavigation/    # Quick navigation subsections
│   │   ├── AboutMe/        # About section components
│   │   ├── Certifications/ # Certifications section
│   │   ├── ProfessionalExperience/ # Experience section
│   │   ├── Project/        # Projects showcase
│   │   └── components/     # Quick nav shared components
│   ├── assets/             # Images, fonts, media
│   ├── components/         # Shared/reusable components
│   ├── data/               # Static data files
│   ├── global/             # Global styles/config
│   ├── hooks/              # Custom React hooks
│   ├── services/           # API/Firebase services
│   ├── shared/             # Shared utilities/components
│   ├── test/               # Test setup and utilities
│   ├── types/              # TypeScript type definitions
│   ├── utils/              # Helper utilities
│   ├── App.tsx             # Root application component
│   ├── main.tsx            # Browser entry point
│   └── index.css           # Global styles (Tailwind imports)
├── .env.example            # Environment variable template
├── eslint.config.js        # ESLint flat configuration
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript project references
├── vite.config.ts          # Vite build configuration
└── vitest.config.ts        # Vitest test configuration
```

## Directory Purposes

**src/QuickNavigation/:**
- Purpose: Self-contained sections accessible via quick navigation
- Contains: AboutMe, Certifications, ProfessionalExperience, Project subdirectories
- Key files: Each subdirectory has mobile/desktop variants (e.g., `ProfessionalExperienceMobile.tsx`, `ProfessionalExperienceDesktop.tsx`)
- Pattern: Shared layout via `QuickNavLayout.tsx`, active section highlighting

**src/components/:**
- Purpose: Reusable UI components used across multiple views
- Contains: ErrorBoundary, TransitionLoader, About, Certifications, Experience, Projects, etc.
- Key files: `ErrorBoundary.tsx` (error handling), shared UI primitives
- Pattern: Component + optional `__tests__` subdirectory

**src/services/:**
- Purpose: External service integrations and API communication
- Contains: Firebase setup, metrics tracking, GitHub API integration
- Key files: 
  - `firebase.ts` - Firebase initialization singleton
  - `metricsService.ts` - Realtime metrics tracking
  - `githubService.ts` - GitHub data fetching
- Pattern: Service singletons, exported instances

**src/utils/:**
- Purpose: Pure utility functions and helpers
- Contains: Logger, safe storage, performance monitoring, GitHub helpers
- Key files:
  - `logger.ts` - Custom logging utility
  - `safeStorage.ts` - Safe LocalStorage wrapper
  - `performanceMonitoring.ts` - Web Vitals tracking
- Pattern: Named exports, optional `__tests__` subdirectory

**src/hooks/:**
- Purpose: Custom React hooks for shared behavior
- Contains: Reusable stateful logic
- Key files: (Specific hooks not enumerated)
- Pattern: Hook files prefixed with `use*` convention

**src/types/:**
- Purpose: Shared TypeScript type definitions
- Contains: Interfaces and type aliases
- Key files: (Specific types not enumerated)
- Pattern: Type-only exports

**scripts/:**
- Purpose: Build-time and security validation scripts
- Contains: Secret scanning, environment validation
- Key files:
  - `scan-secrets.js` - Pre-commit secret detection
  - `validate-env.js` - Environment variable validation

**docs/:**
- Purpose: Project documentation and architectural decisions
- Contains: Architectural refactor docs, metrics documentation
- Key files: 
  - `docs/architectural-refactor/` - Issue tracking and resolutions
  - `docs/metrics/` - Metrics documentation

## Key File Locations

**Entry Points:**
- `src/main.tsx`: Browser entry, React root initialization
- `src/App.tsx`: Application entry, view state machine
- `public/index.html`: HTML template (implied by Vite convention)

**Configuration:**
- `vite.config.ts`: Build tool config, plugins, path aliases
- `tsconfig.json`: TypeScript project references
- `tsconfig.app.json`: Application TypeScript config (referenced)
- `tsconfig.node.json`: Node scripts TypeScript config (referenced)
- `eslint.config.js`: Linting rules
- `vitest.config.ts`: Test runner config
- `.env`: Environment variables (not committed)

**Core Logic:**
- `src/App.tsx`: View orchestration and navigation
- `src/services/firebase.ts`: Firebase connection singleton
- `src/utils/logger.ts`: Logging abstraction

**Testing:**
- `src/test/setup.ts`: Vitest global setup
- `src/components/__tests__/`: Component tests
- `src/utils/__tests__/`: Utility tests

## Naming Conventions

**Files:**
- PascalCase for components: `ErrorBound ary.tsx`, `TransitionLoader.tsx`
- camelCase for utilities/services: `safeStorage.ts`, `metricsService.ts`
- kebab-case for configs: `vite.config.ts`, `eslint.config.js`
- `*.test.ts` or `*.test.tsx` for test files

**Directories:**
- PascalCase for component directories: `HeroSection/`, `ImmersiveJourney/`
- camelCase for utility directories: `utils/`, `hooks/`, `services/`
- Subdirectory `__tests__/` for test files

## Where to Add New Code

**New Feature (e.g., new portfolio section):**
- Primary code: `src/QuickNavigation/{FeatureName}/`
- Create mobile/desktop variants if responsive design splits
- Tests: `src/QuickNavigation/{FeatureName}/__tests__/`
- Update navigation: Add to `src/App.tsx` view types and switch cases

**New Component/Module:**
- Shared reusable component: `src/components/{ComponentName}.tsx`
- Section-specific component: Within section directory (e.g., `src/QuickNavigation/Project/components/`)
- Implementation: Follow PascalCase naming

**Utilities:**
- Shared helpers: `src/utils/{utilName}.ts`
- Hook: `src/hooks/use{HookName}.ts`
- Service: `src/services/{serviceName}.ts`

**Types:**
- Shared types: `src/types/{entityName}.ts`
- Component-local types: Within component file or adjacent `.types.ts`

## Special Directories

**.planning/:**
- Purpose: GSD workflow artifacts and codebase documentation
- Generated: Yes (by GSD tools)
- Committed: Recommended (tracks decision history)

**dist/:**
- Purpose: Vite build output
- Generated: Yes (via `npm run build`)
- Committed: No (git-ignored)

**node_modules/:**
- Purpose: npm dependencies
- Generated: Yes (via `npm install`)
- Committed: No (git-ignored)

**src/test/:**
- Purpose: Test setup and global test utilities
- Generated: No (manually created)
- Committed: Yes

---

*Structure analysis: 2026-02-10*
