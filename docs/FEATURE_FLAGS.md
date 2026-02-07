# Feature Flags System

## Overview
Simple feature flag implementation for controlling feature rollouts.

## Implementation

### Create Feature Flags Service
`src/utils/featureFlags.ts`:
```typescript
interface FeatureFlags {
  enableNewProjectView: boolean;
  enableDarkMode: boolean;
  enableExperimentalAnimations: boolean;
  enableAnalytics: boolean;
}

const defaultFlags: FeatureFlags = {
  enableNewProjectView: false,
  enableDarkMode: true,
  enableExperimentalAnimations: false,
  enableAnalytics: import.meta.env.PROD,
};

class FeatureFlagService {
  private flags: FeatureFlags;

  constructor() {
    this.flags = this.loadFlags();
  }

  private loadFlags(): FeatureFlags {
    // Load from environment variables
    const envFlags: Partial<FeatureFlags> = {
      enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
    };

    // Load from localStorage (for development)
    const localFlags = this.getLocalFlags();

    return {
      ...defaultFlags,
      ...envFlags,
      ...localFlags,
    };
  }

  private getLocalFlags(): Partial<FeatureFlags> {
    if (import.meta.env.DEV) {
      const stored = localStorage.getItem('featureFlags');
      return stored ? JSON.parse(stored) : {};
    }
    return {};
  }

  isEnabled(flag: keyof FeatureFlags): boolean {
    return this.flags[flag];
  }

  setFlag(flag: keyof FeatureFlags, value: boolean) {
    if (import.meta.env.DEV) {
      this.flags[flag] = value;
      localStorage.setItem('featureFlags', JSON.stringify(this.flags));
    }
  }
}

export const featureFlags = new FeatureFlagService();
```

### Usage in Components
```typescript
import { featureFlags } from '@/utils/featureFlags';

function MyComponent() {
  if (featureFlags.isEnabled('enableNewProjectView')) {
    return <NewProjectView />;
  }
  return <OldProjectView />;
}
```

### Development Tools
Add to browser console for testing:
```javascript
// Enable a feature
localStorage.setItem('featureFlags', JSON.stringify({
  enableExperimentalAnimations: true
}));

// Reload page
location.reload();
```

## Environment Variables
Add to `.env`:
```
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_NEW_FEATURES=false
```

## Advanced: Remote Config
For production feature flags, consider:
- Firebase Remote Config
- LaunchDarkly
- Split.io

## Best Practices
1. Always have a default value
2. Clean up old flags after rollout
3. Document flag purpose and owner
4. Use TypeScript for type safety
