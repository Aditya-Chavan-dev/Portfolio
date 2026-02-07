# File Naming Standards

## Current State
The codebase uses a mix of naming conventions that should be standardized.

## Naming Conventions

### Components (PascalCase)
**Rule**: All React component files should use PascalCase.

✅ **Correct**:
- `ErrorBoundary.tsx`
- `ProjectCard.tsx`
- `GithubStats.tsx`

❌ **Incorrect**:
- `errorBoundary.tsx`
- `project-card.tsx`

### Utilities & Services (camelCase)
**Rule**: Utility files, services, and hooks should use camelCase.

✅ **Correct**:
- `githubService.ts`
- `useParallax.ts`
- `performanceMonitoring.ts`

❌ **Incorrect**:
- `GithubService.ts`
- `UseParallax.ts`

### Types & Interfaces (camelCase)
**Rule**: Type definition files should use camelCase.

✅ **Correct**:
- `project.ts`
- `github.ts`

### Constants (SCREAMING_SNAKE_CASE or camelCase)
**Rule**: Constant files can use either format, but be consistent.

✅ **Correct**:
- `API_CONSTANTS.ts`
- `humorousLines.ts`

## Directory Structure
```
src/
├── components/          # Shared components (PascalCase)
├── QuickNavigation/     # Feature modules (PascalCase)
│   ├── AboutMe/
│   ├── Project/
│   └── Certifications/
├── services/            # API services (camelCase)
├── utils/               # Utility functions (camelCase)
├── hooks/               # Custom hooks (camelCase, use* prefix)
└── types/               # Type definitions (camelCase)
```

## Migration Plan
1. Audit all files for naming violations
2. Rename files following conventions
3. Update all imports
4. Test build and runtime

## Enforcement
Consider adding ESLint plugin for file naming:
```bash
npm install --save-dev eslint-plugin-filename-rules
```
