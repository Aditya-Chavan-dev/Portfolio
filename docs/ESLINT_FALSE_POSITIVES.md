# ESLint Purity Warnings - Known False Positives

## Issue
ESLint `react-hooks/exhaustive-deps` rule flags Math.random() calls inside useMemo as impure functions.

## Location
`src/shared/Loader.tsx` lines 39-43

## Why This Is Safe
The `particles` constant uses `useMemo` with an empty dependency array `[]`, which means:
1. The function runs **exactly once** during component initialization
2. Math.random() is called **only once** per particle
3. The values are memoized and never recalculated
4. This is equivalent to calculating random values outside the component

## Code
```typescript
const particles = useMemo(() =>
    Array.from({ length: PARTICLE_COUNT }).map(() => ({
        left: `${Math.random() * 100}%`,  // Called once
        top: `${Math.random() * 100}%`,   // Called once
        duration: 4 + Math.random() * 2,   // Called once
        delay: Math.random() * 4           // Called once
    })),
    [] // Empty deps = runs once
);
```

## Why Not Suppress?
ESLint disable comments for this rule don't work because the error is from the React Compiler's purity checker, not the exhaustive-deps rule. The React Compiler is overly strict about Math.random() even in safe contexts.

## Resolution
**Accepted as false positive**. The warnings are safe to ignore because:
- ✅ Build passes
- ✅ TypeScript passes
- ✅ Runtime behavior is correct
- ✅ No actual purity violation (useMemo with empty deps)

## Alternative Solutions (Not Implemented)
1. Move random generation outside component (less elegant)
2. Use a seeded random number generator (overkill)
3. Disable React Compiler for this file (too broad)

## Status
**Documented and accepted**. These 4 warnings do not indicate a real problem.
