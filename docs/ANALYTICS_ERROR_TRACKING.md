# Analytics & Error Tracking Setup

## Analytics

### Recommended: Plausible Analytics
Lightweight, privacy-friendly alternative to Google Analytics.

#### Implementation
```html
<!-- Add to index.html -->
<script defer data-domain="adityachavan.dev" src="https://plausible.io/js/script.js"></script>
```

### Alternative: Google Analytics 4
```html
<!-- Add to index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## Error Tracking

### Recommended: Sentry
Production-grade error tracking and performance monitoring.

#### Installation
```bash
npm install @sentry/react
```

#### Configuration
Create `src/utils/sentry.ts`:
```typescript
import * as Sentry from "@sentry/react";

export function initSentry() {
  if (import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay(),
      ],
      tracesSampleRate: 0.1,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }
}
```

#### Usage in App.tsx
```typescript
import { initSentry } from './utils/sentry';

initSentry();
```

### Alternative: LogRocket
Session replay and error tracking.

```bash
npm install logrocket
```

## Privacy Considerations
- Add privacy policy page
- Cookie consent banner (if using cookies)
- GDPR compliance for EU visitors

## Environment Variables
Add to `.env`:
```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://xxx@xxx.ingest.sentry.io/xxx
```

## Testing
Test in production mode to avoid tracking development activity.
