# Medium Severity Issues 🟡

**Total Issues**: 13  
**Severity**: MEDIUM - Code quality and maintainability issues  
**Priority**: FIX DURING REGULAR REFACTORING

---

## Issue #26: Hardcoded Cache Keys Scattered Everywhere

### What's the Problem?

Imagine you have a secret password to access your safe. Instead of keeping it in one secure location, you write it on sticky notes all over your house (on the fridge, bathroom mirror, car dashboard, etc.).

Now if you need to change the password, you have to find and update ALL the sticky notes. Miss one, and that door won't open anymore.

**That's what's happening with our cache storage keys.**

### Where It Happens

**Files**:
- `useGithubProjects.ts` - Uses key `'github-flagship-projects'`
- `useGithubData.ts` - Uses keys `'github-user'`, `'github-stats'`, `'github-contributions'`
- Other files - Define their own keys

### What the Code Does

We save temporary data (cache) to the browser's storage. To identify each piece of data, we use a "key" (like a label on a filing cabinet drawer).

**Current approach** (scattered):
```javascript
// File 1:
localStorage.getItem('github-flagship-projects')

// File 2:
localStorage.getItem('github-user')

// File 3:  
localStorage.getItem('github-stats')

// File 4:
localStorage.getItem('github-contributions')
```

Each file defines its own keys inline (directly in the code).

### Why This is a Problem

1. **Typos**: Easy to write `'github-stats'` in one place, `'github-stat'` (missing 's') in another → different storage locations
2. **Hard to Change**: Rename a key? Search entire codebase for all occurrences
3. **No Visibility**: Can't easily see all cache keys used across the app
4. **Namespace Collisions**: Two files might accidentally use the same key

### Real-World Example

**What we're doing** (risky):
```
Filing Cabinet Room:
Person A labels drawer "Projects-2024"
Person B labels drawer "Projects 2024" (different spacing!)
Person C labels drawer "projects_2024" (different case!)

Now we have 3 drawers for the same thing
```

**Better approach**:
```
Filing Cabinet Manual (shared document):
- PROJECTS_DRAWER = "projects-2024"
- STATS_DRAWER = "stats-2024"
- USER_DRAWER = "user-2024"

Everyone uses the manual → consistent labels
```

### What Could Go Wrong

**Scenario**: Developer makes a typo

```javascript
// Saving data (typo):
save('github-contributions', data)

// Loading data (correct):
load('github-contribution') // Missing 's'

Result: Load returns nothing (different key!)
User sees "no data" even though it was saved
```

### Impact on Users

- **Cache Misses**: Data is saved but can't be found (different keys)
- **Duplicate Storage**: Same data saved under multiple keys (wastes space)
- **Confusing Behavior**: Sometimes cache works, sometimes doesn't (depending on typo)

### The Fix (In Simple Terms)

Create a constants file with ALL cache keys defined once:

```javascript
// constants.ts - SINGLE SOURCE OF TRUTH
export const CACHE_KEYS = {
    GITHUB_PROJECTS: 'github-flagship-projects',
    GITHUB_USER: 'github-user',
    GITHUB_STATS: 'github-stats',
    GITHUB_CONTRIBUTIONS: 'github-contributions',
};

// useGithubProjects.ts - USE the constant
import { CACHE_KEYS } from './constants';
localStorage.setItem(CACHE_KEYS.GITHUB_PROJECTS, data);

// useGithubData.ts - USE the constant
import { CACHE_KEYS } from './constants';
localStorage.setItem(CACHE_KEYS.GITHUB_USER, data);
```

**Benefits**:
- One place to see all keys
- Typos caught by TypeScript autocomplete
- Easy bulk rename
- Clear documentation

---

## Issue #27: No Expiration Policy Documentation

### What's the Problem?

Your refrigerator has milk that expires in 7 days, yogurt that expires in 14 days, and vegetables that expire in 3 days. But there's no list on the fridge explaining these rules.

Each family member has to remember (or guess) when each item expires. This leads to confusion and food waste.

**That's our cache expiration policy.**

### Where It Happens

**Throughout the codebase** - various cache timeouts are hardcoded

### What the Code Does

Different pieces of cached data expire at different times:
- Projects cache: 2 hours
- GitHub stats: 2 hours
- Contributions: 2 hours (probably? Not documented)

But these numbers are scattered in the code with no explanation of "why 2 hours?"

### Why This is a Problem

1. **No Documentation**: Why did we choose 2 hours specifically?
2. **Hard to Change**: Want to make caches last longer? Find all timeout values
3. **No consistency check**: Are all similar caches using the same timeout?
4. **No understanding**: New developers don't know the reasoning

### Real-World Example

**What we have** (undocumented):
```
Milk: Expires in 168 hours (why 168?)
Cheese: Expires in 336 hours (why 336?)
Yogurt: Expires in 336 hours
```

**What we should have**:
```
Dairy Products Expiration Policy:
- Fresh milk: 7 days (168 hours) - Pasteurized, sensitive
- Hard cheese: 14 days (336 hours) - Aged, more stable
- Yogurt: 14 days (336 hours) - Fermented, preservatives

Documented, explained, consistent
```

### Impact on Users

- **Stale Data**: Cache might be too long, users see outdated information
- **Slow App**: Cache might be too short, app re-fetches data unnecessarily
- **Inconsistent Experience**: Some caches refresh faster than others with no good reason

### The Fix (In Simple Terms)

Create a documented expiration policy:

```javascript
// constants.ts
export const CACHE_DURATIONS = {
    // GitHub data changes frequently (commits, stars)
    // Refresh every 2 hours to stay reasonably current
    // without hammering the API
    GITHUB_DATA: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
    
    // User profile rarely changes
    // Refresh daily to save API calls
    USER_PROFILE: 24 * 60 * 60 * 1000, // 24 hours
    
    // Project list is semi-static
    // Refresh every 6 hours
    PROJECT_LIST: 6 * 60 * 60 * 1000, // 6 hours
};
```

Now it's clear:
- What the timeout values are
- Why we chose them
- Easy to adjust all at once

---

## Issue #28: Duplicate Project Filtering Logic

### What's the Problem?

You write instructions for how to sort your bookshelf (fiction vs. non-fiction). Instead of writing it once, you write the exact same instructions twice in two different places.

Now if you want to add a new category (biography), you have to update both sets of instructions.

### Where It Happens

**Files**:
- `useGithubProjects.ts` - Filters flagship from other projects
- `ProjectDesktop.tsx` - Filters flagship again!

### What the Code Does

We need to separate the flagship project from all others. This logic exists in two places:

**In the hook**:
```javascript
const otherProjects = sorted.filter(r => r.id !== flagship.id);
```

**In the component**:
```javascript  
const allProjects = flagship 
    ? [flagship, ...projects.filter(p => p.id !== flagship.id)] 
    : projects;
```

The component is RE-FILTERING something that was already filtered!

### Why This is a Problem

1. **Unnecessary Work**: Filtering twice for no reason
2. **Code Duplication**: Same logic in two places
3. **Potential Bugs**: If the filter logic changes, need to update both

### The Fix (In Simple Terms)

The hook should return fully prepared data:

```javascript
// useGithubProjects.ts
return {
    flagship,
    otherProjects, // Already filtered
    allProjects: flagship ? [flagship, ...otherProjects] : otherProjects // Pre-computed
};

// ProjectDesktop.tsx just uses it:
const { allProjects } = useGithubProjects();
// No re-filtering needed!
```

---

## Issue #29: Missing Display Names for React.memo Components

### What's the Problem?

You're looking at a family photo album, but instead of names under photos, it just says "Person" under every picture.

"Who's who? I can't tell!"

**That's React DevTools when components don't have display names.**

### Where It Happens

**File**: `components.tsx`
- `TypewriterText` component
- `Cursor` component

### What the Code Does

We use `React.memo` to optimize performance (prevents unnecessary re-renders). But these optimized components don't have display names.

**In React DevTools**:
```
<Memo />  <- Which component is this?
  <Memo />  <- And this?
    <Memo />  <- Or this?
```

All show as "Memo" with no way to distinguish them!

### Why This is a Problem

1. **Hard to Debug**: Can't identify which component is which
2. **Performance Profiling**: Can't see which "Memo" is slow
3. **Developer Experience**: Frustrating when debugging complex trees
4. **Professional**: Well-written libraries always include display names

### Real-World Example

**What we have** (confusing):
```
Family Tree:
Person
  └── Person
      └── Person

(Which person is grandpa? No idea!)
```

**What we should have** (clear):
```
Family Tree:
John Smith
  └── Mary Smith
      └── Tom Smith

(Clear hierarchy!)
```

### The Fix (In Simple Terms)

Add display names to all memoized components:

```javascript
export const TypewriterText = React.memo((props) => {
    // ... component code
});
TypewriterText.displayName = 'TypewriterText';

export const Cursor = React.memo((props) => {
    // ... component code
});
Cursor.displayName = 'Cursor';
```

Now in React DevTools:
```
<TypewriterText />  <- Clear!
  <Cursor />  <- Clear!
```

---

## Issue #30: Particle Animation Performance

### What's the Problem?

Every time you open a book, it generates a new random bookmark position. Close the book, open it again, and the bookmark is in a different spot.

This is wasteful - why not just keep the bookmark in one spot?

**That's what's happening with particle positions in the Loader.**

### Where It Happens

**File**: `Loader.tsx`

### What the Code Does

The loader creates floating particles for visual effect. Their positions are "random" - calculated when the component loads.

**Current code**:
```javascript
const [particles] = useState(() =>
    Array.from({ length: 6 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        // ...
    }))
);
```

**Problem**: If the Loader unmounts and remounts, particles regenerate with new random positions → visual "jump."

### Why This is a Problem

1. **Visual Inconsistency**: Particles jump to new positions on remount
2. **Unnecessary Computation**: Recalculating random values
3. **Not Actually Random**: Same pattern on most page loads (random seed is time-based)

### The Fix (In Simple Terms)

Calculate particles once (outside component) and reuse:

```javascript
// OUTSIDE component - calculated once when file loads
const PARTICLES = Array.from({ length: 6 }).map(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: 4 + Math.random() * 2,
    delay: Math.random() * 4
}));

export const Loader = ({ onComplete, message }) => {
    // Use the static particles (no recalculation)
    const particles = PARTICLES;
    // ...
};
```

Now particles are truly consistent across all instances.

---

## Issue #31-38: Additional Medium Issues

Quick summary of remaining medium-severity issues:

### Issue #31: Complex Acronym Generation Logic
- Edge cases not handled (empty strings, special chars)
- **Fixed**: Add validation for edge cases

### Issue #32: No Memoization for getProjectMetadata
- Recalculated on every render
- **Fixed**: Wrap in `useMemo`

### Issue #33: Missing Error Messages
- Errors happen silently
- **Fixed**: Add user-facing error messages

### Issue #34: Inconsistent File Naming
- Some PascalCase, some camelCase
- **Fixed**: Standardize to PascalCase for components

### Issue #35: No PropTypes or JSDoc on Components
- Hard to understand component APIs
- **Fixed**: Add JSDoc comments

### Issue #36: Switch Case Without Type Safety
- Switch statements don't enforce exhaustiveness - adding new cases doesn't trigger compile errors
- **Fix**: Use discriminated unions with type guards or const assertions to ensure all cases are handled

### Issue #37: Incomplete getLanguageColor Function
- Falls back to gray for most languages
- **Fixed**: Add more language colors

### Issue #38: State Update on Unmounted Component
- Console warnings in development
- **Fixed**: Add isMounted checks

---

## Summary

| Issue | What It's Like | Impact |
|-------|----------------|---------|
| #26 Hardcoded Keys | Password on sticky notes everywhere | Typos, hard to change |
| #27 No Expiration Docs | No fridge expiration list | Confusion, inconsistency |
| #28 Duplicate Filtering | Sorting bookshelf twice | Unnecessary work |
| #29 Missing Display Names | Photos labeled "Person" | Hard to debug |
| #30 Particle Performance | Bookmark moves every time | Visual jumps |
| #31-38 Misc | Various quality issues | Code maintainability |

**Total Estimated Fix Time**: 3-4 hours  
**User Impact if Not Fixed**: Minor performance issues, developer frustration  
**Priority**: FIX DURING REGULAR REFACTORING
