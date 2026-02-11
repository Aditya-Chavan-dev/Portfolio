# Testing Patterns

**Analysis Date:** 2026-02-10

## Test Framework

**Runner:**
- Vitest 4.0.18
- Config: `vitest.config.ts`

**Assertion Library:**
- Vitest built-in assertions (`expect`)
- Testing Library Jest-DOM 6.9.1 for DOM assertions

**Run Commands:**
```bash
npm run test              # Run all tests
npm run test:ui           # Interactive test UI
npm run test:coverage     # Run with coverage report
```

## Test File Organization

**Location:**
- Co-located with source via `__tests__` subdirectories
- Examples: `src/components/__tests__/`, `src/utils/__tests__/`

**Naming:**
- `*.test.tsx` for component tests: `ErrorBoundary.test.tsx`
- `*.test.ts` for utility tests: `safeStorage.test.ts`, `githubHelpers.test.ts`

**Structure:**
```
src/
├── components/
│   ├── ErrorBoundary.tsx
│   └── __tests__/
│       └── ErrorBoundary.test.tsx
└── utils/
    ├── safeStorage.ts
    └── __tests__/
        ├── safeStorage.test.ts
        └── githubHelpers.test.ts
```

## Test Structure

**Suite Organization:**
```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComponentName } from '../ComponentName'

describe('ComponentName', () => {
    it('renders children when there is no error', () => {
        render(<ComponentName>Test Content</ComponentName>)
        expect(screen.getByText('Test Content')).toBeInTheDocument()
    })

    it('handles error case', () => {
        // Test implementation
    })
})
```

**Patterns:**
- `describe()` for test suites (component/module name)
- `it()` for individual test cases
- `expect()` for assertions
- `vi.spyOn()` for mocking (e.g., console methods)
- `mockImplementation()` and `mockRestore()` for spy lifecycle

## Mocking

**Framework:** Vitest built-in mocking (`vi` import)

**Patterns:**
```typescript
// Suppressing console.error for error boundary tests
const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

// Cleanup
consoleSpy.mockRestore()
```

**What to Mock:**
- Console methods when testing error handling (avoid noise in test output)
- External APIs (Firebase, GitHub) - not yet observed but expected pattern
- Browser APIs (LocalStorage, navigator, window) - use safeStorage abstraction

**What NOT to Mock:**
- React component internals
- Simple utility functions (test them directly)
- Testing Library helpers

## Fixtures and Factories

**Test Data:**
- Not heavily formalized yet
- Inline test data in test files
- Error-throwing components created inline:
  ```typescript
  const ThrowError = () => { throw new Error('Test error') }
  ```

**Location:**
- No dedicated fixtures directory detected
- Test utilities in `src/test/setup.ts` (Testing Library Jest-DOM matchers)

## Coverage

**Requirements:** No enforced threshold detected

**Coverage Config:**
- Provider: v8
- Reporters: text, json, html
- Excludes: `node_modules/`, `src/test/`, `**/*.d.ts`, `**/*.config.*`, `**/mockData`, `dist/`

**View Coverage:**
```bash
npm run test:coverage
# Opens HTML report in coverage/ directory
```

## Test Types

**Unit Tests:**
- Testing individual functions and components in isolation
- Examples: `ErrorBoundary.test.tsx`, `safeStorage.test.ts`, `githubHelpers.test.ts`
- Approach: Test props, state, behavior, edge cases

**Integration Tests:**
- Not formally defined yet
- Would test component interactions, Firebase integration, data flow

**E2E Tests:**
- Not detected (no Playwright, Cypress, or similar framework)

## Common Patterns

### Component Testing
```typescript
import { render, screen } from '@testing-library/react'

it('renders correctly', () => {
    render(<Component prop="value" />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
})
```

### Error Testing
```typescript
it('handles errors gracefully', () => {
    const ThrowError = () => { throw new Error('Test') }
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    
    render(<ErrorBoundary><ThrowError /></ErrorBoundary>)
    
    expect(screen.getByText('Something went wrong')).toBeInTheDocument()
    spy.mockRestore()
})
```

### Async Testing
```typescript
// Pattern not yet observed, but Vitest supports:
it('handles async operations', async () => {
    const result = await asyncFunction()
    expect(result).toBe(expected)
})
```

## Testing Setup

**Global Setup:**
- File: `src/test/setup.ts`
- Loads: `@testing-library/jest-dom` matchers
- Enables: `.toBeInTheDocument()`, `.toHaveClass()`, etc. throughout tests

**Environment:**
- jsdom (simulates browser DOM)
- Globals enabled (no need to import `describe`, `it`, `expect` in every file)
- React plugin for JSX transformation

## Test Quality Notes

**Current State:**
- Limited test coverage (only 3 test files detected)
- Focus on critical infrastructure: ErrorBoundary, safeStorage, githubHelpers
- UI components largely untested

**Recommendations for Expansion:**
- Add tests for service layer (`firebase.ts`, `metricsService.ts`)
- Add component tests for key views (`App.tsx`, navigation components)
- Add integration tests for Firebase data flow
- Establish coverage thresholds (e.g., 80% for utils, 60% for components)

---

*Testing analysis: 2026-02-10*
