# Architecture

**Analysis Date:** 2026-02-10

## Pattern Overview

**Overall:** Component-Based SPA with View State Machine

**Key Characteristics:**
- Single root component (`App.tsx`) managing global view state
- View-based navigation system (no React Router)
- Persistent layout pattern for related sections (QuickNav subsections)
- Framer Motion for all transitions and animations
- Error boundaries for resilience

## Layers

**Presentation Layer (Components):**
- Purpose: UI components and view containers
- Location: `src/components/`, `src/HeroSection/`, `src/QuickNavigation/`, etc.
- Contains: React components, page sections, shared UI primitives
- Depends on: Services, utils, hooks, types
- Used by: App root orchestrator

**Service Layer:**
- Purpose: External API communication and data management
- Location: `src/services/`
- Contains: Firebase integration (`firebase.ts`), metrics service (`metricsService.ts`), GitHub service (`githubService.ts`)
- Depends on: Utils (logger), Firebase SDK
- Used by: Components via hooks or direct imports

**Utilities Layer:**
- Purpose: Pure functions and helper utilities
- Location: `src/utils/`
- Contains: Logger, safe storage wrapper, performance monitoring, GitHub helpers
- Depends on: Nothing (pure utilities)
- Used by: Services, components, hooks

**Hooks Layer:**
- Purpose: Reusable React logic and state management
- Location: `src/hooks/`
- Contains: Custom React hooks for shared behavior
- Depends on: Services, utils
- Used by: Components

**Types Layer:**
- Purpose: TypeScript type definitions and interfaces
- Location: `src/types/`
- Contains: Shared type definitions
- Depends on: Nothing
- Used by: All layers

## Data Flow

**View Navigation Flow:**

1. User interacts with navigation (button click, "Start Journey", etc.)
2. Event handler in current view calls navigation callback prop
3. Callback updates view state in `App.tsx` root component
4. React re-renders with new view via AnimatePresence
5. LocalStorage persists view state for session restoration

**Firebase Data Flow:**

1. Service initializes Firebase connection on app startup (`src/services/firebase.ts`)
2. Components/hooks call service methods (e.g., `metricsService.ts`)
3. Service sets up realtime listener via `onValue()`
4. Data updates trigger React state updates via hooks
5. Component re-renders with fresh data
6. Cleanup function removes listener on unmount

**State Management:**
- React `useState` for component-local state
- Props drilling for cross-component communication
- LocalStorage for view persistence (`safeLocalStorage.setItem/getItem`)
- Firebase Realtime Database listeners for external data

## Key Abstractions

**View State Machine:**
- Purpose: Centralized navigation control
- Examples: `src/App.tsx` (lines 18-41)
- Pattern: Discriminated union type `ViewState`, validated navigation, persistent state

**Error Boundaries:**
- Purpose: Graceful error handling at component tree boundaries
- Examples: `src/components/ErrorBoundary.tsx`
- Pattern: React error boundary class component, logs errors, shows fallback UI

**Safe Storage Wrapper:**
- Purpose: Resilient LocalStorage access with error handling
- Examples: `src/utils/safeStorage.ts`
- Pattern: Result type pattern (`{success, data, error}`), try/catch wrappers

**Animation Layout Groups:**
- Purpose: Coordinated animations across view transitions
- Examples: `src/App.tsx` (LayoutGroup, AnimatePresence)
- Pattern: Framer Motion `LayoutGroup` + `AnimatePresence` with `mode="popLayout"`

## Entry Points

**Browser Entry:**
- Location: `src/main.tsx`
- Triggers: Browser loads `index.html`, Vite injects this module
- Responsibilities: React root initialization, mounts `<App />` in StrictMode

**Application Entry:**
- Location: `src/App.tsx`
- Triggers: Rendered by `main.tsx`
- Responsibilities: View orchestration, navigation handling, performance monitoring init, error boundary wrapping

**Firebase Initialization:**
- Location: `src/services/firebase.ts`
- Triggers: Module import (runs on app startup)
- Responsibilities: Validate environment, initialize Firebase, export singleton instances

## Error Handling

**Strategy:** Defensive programming with error boundaries and safe wrappers

**Patterns:**
- ErrorBoundary component catches React render errors
- Result type pattern for storage operations (`{success, data?, error?}`)
- Environment validation throws errors early (fail-fast on misconfiguration)
- Prod vs dev error messages (sanitized in production, detailed in development)
- Safe navigation (validate view state before setting)

## Cross-Cutting Concerns

**Logging:** 
- Custom logger utility (`src/utils/logger.ts`)
- Environment-aware (suppressed in production, verbose in dev)
- Prefixed messages (e.g., `[Firebase]`, `[App]`)

**Validation:** 
- Firebase environment variable validation at startup
- View state validation before navigation
- LocalStorage data validation via `isValidView()`

**Authentication:** 
- Not applicable (public portfolio, no auth required)

---

*Architecture analysis: 2026-02-10*
