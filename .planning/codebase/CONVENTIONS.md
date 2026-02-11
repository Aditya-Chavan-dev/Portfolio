# Coding Conventions

**Analysis Date:** 2026-02-10

## Naming Patterns

**Files:**
- PascalCase for React components: `ErrorBoundary.tsx`, `TransitionLoader.tsx`, `ProjectDetailView.tsx`
- camelCase for utilities/services: `safeStorage.ts`, `metricsService.ts`, `performanceMonitoring.ts`
- kebab-case for configuration: `vite.config.ts`, `eslint.config.js`
- Mobile/Desktop suffixes: `ProfessionalExperienceMobile.tsx`, `ProfessionalExperienceDesktop.tsx`

**Functions:**
- camelCase: `handleEnterFromLanding`, `validateFirebaseEnvironment`, `initPerformanceMonitoring`
- Prefixes: `handle*` for event handlers, `is*` for boolean checks, `get*` for data retrieval

**Variables:**
- camelCase: `firebaseConfig`, `showLoader`, `activeSection`
- UPPER_SNAKE_CASE for constants: `REQUIRED_ENV_VARS`, `VALID_VIEWS`

**Types:**
- PascalCase for interfaces/types: `ViewType`, `ViewState`, `FirebaseApp`, `Database`
- Suffix `Type` for discriminated unions: `ViewType`

## Code Style

**Formatting:**
- No formatter config detected (.prettierrc not found)
- Likely using editor defaults or ESLint auto-fix
- Indentation: 4 spaces (observed in most files)
- Line endings: CRLF (Windows-style `\r\n`)

**Linting:**
- ESLint 9.39.1 with flat config format
- Key plugins: `@eslint/js`, `typescript-eslint`, `react-hooks`, `react-refresh`
- ES2020 target, browser globals
- Recommended configs from each plugin
- dist/ directory ignored

## Import Organization

**Order:**
1. External libraries (React, Firebase, Framer Motion)
2. Internal absolute imports using `@/` alias
3. Relative imports (local components/utilities)

**Pattern observed in `src/App.tsx`:**
```typescript
import React, { useState } from 'react';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { LandingPage } from './LandingPage';
import { HeroSection } from './HeroSection';
// ... more local imports
import { ErrorBoundary } from './components/ErrorBoundary';
import { initPerformanceMonitoring } from './utils/performanceMonitoring';
import { safeLocalStorage } from './utils/safeStorage';
import { logger } from './utils/logger';
```

**Path Aliases:**
- `@/` maps to `./src/` (configured in `vite.config.ts` and `vitest.config.ts`)
- Example: `import { logger } from '@/utils/logger'`

## Error Handling

**Patterns:**
- Error boundaries for React component errors (`ErrorBoundary.tsx`)
- Result type pattern for failable operations:
  ```typescript
  const result = safeLocalStorage.getItem<string>('key');
  if (result.success) { /* use result.data */ }
  ```
- Try-catch in service layer with logging:
  ```typescript
  try {
    // operation
  } catch (error) {
    logger.error('[Context]', error);
    throw error; // or return fallback
  }
  ```
- Fail-fast validation: Throw errors early for invalid environment/config
- Prod vs dev error messages: Sanitized in production, detailed in development

## Logging

**Framework:** Custom logger utility (`src/utils/logger.ts`)

**Patterns:**
- Prefixed messages: `logger.log('[Firebase] ✓ Successfully initialized')`
- Context tags: `[Firebase]`, `[App]`, `[Service]`
- Environment-aware: Production likely suppresses verbose logs
- Log levels: `logger.log()`, `logger.warn()`, `logger.error()`

## Comments

**When to Comment:**
- Complex logic or non-obvious behavior
- Firebase constants and validation logic heavily commented
- Type guards and validators include purpose comments
- Sparse comments overall (code is largely self-documenting)

**JSDoc/TSDoc:**
- Function-level JSDoc observed in services:
  ```typescript
  /**
   * Validates that all required Firebase environment variables are present
   *
   * @throws Error if any required variables are missing
   */
  function validateFirebaseEnvironment(): void { }
  ```
- Not universally applied (many functions have no JSDoc)

## Function Design

**Size:** 
- Mostly small, focused functions (5-30 lines)
- Some larger component functions (50-100 lines for complex views)

**Parameters:** 
- Use destructuring for multiple params
- Prefer named params via objects for >3 args
- Event handlers follow pattern: `handle*` name, inline or extracted

**Return Values:** 
- Explicit return types for services and utilities
- Inferred for simple component functions
- Result type pattern for failable operations (`{success, data?, error?}`)

## Module Design

**Exports:** 
- Named exports preferred: `export const app`, `export function validate()`
- Default export for React components: `export default App`
- Service modules export initialized instances: `export const database`

**Barrel Files:** 
- Not heavily used
- Each module exports what it needs directly
- No detected `index.ts` re-exports in utils/ or components/

## React-Specific Conventions

**Component Structure:**
- Functional components with TypeScript
- Props typed inline or via `type Props = {...}`
- Hooks at top of component before any conditionals
- Event handlers defined inside component
- Lazy state initialization for expensive reads: `useState(() => ...)`

**Hooks Usage:**
- Custom hooks in `src/hooks/`
- Standard hooks: `useState`, `useEffect`, `React.useEffect`
- Effect cleanup functions for subscriptions (Firebase listeners)

**Styling:**
- Tailwind utility classes
- className prop on all styled elements
- No inline styles detected (Tailwind-first approach)

---

*Convention analysis: 2026-02-10*
