# Test Infrastructure Setup

## Overview
This document outlines the testing strategy and infrastructure for the portfolio project.

## Testing Stack (To Be Implemented)

### Unit & Component Testing
- **Framework**: Vitest
- **React Testing**: @testing-library/react
- **User Events**: @testing-library/user-event
- **Coverage**: vitest coverage (c8)

### Installation Commands
```bash
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom @vitest/ui
```

### Configuration
Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'c8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Setup File
Create `src/test/setup.ts`:
```typescript
import '@testing-library/jest-dom'
```

### Example Test
Create `src/components/__tests__/ErrorBoundary.test.tsx`:
```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ErrorBoundary } from '../ErrorBoundary'

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Content</div>
      </ErrorBoundary>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })
})
```

### Package.json Scripts
```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

## Testing Priorities

### Phase 1: Critical Components
1. ErrorBoundary
2. Loader
3. TransitionLoader

### Phase 2: Core Features
1. GitHub data fetching (githubService)
2. Performance monitoring
3. Navigation logic

### Phase 3: UI Components
1. Project cards
2. About Me sections
3. Certifications

## Coverage Goals
- **Unit Tests**: > 70%
- **Integration Tests**: > 50%
- **Critical Paths**: 100%

## Next Steps
1. Install testing dependencies
2. Create vitest.config.ts
3. Add setup file
4. Write first test
5. Add to CI/CD pipeline
