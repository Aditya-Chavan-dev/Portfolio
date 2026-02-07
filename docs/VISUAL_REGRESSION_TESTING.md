# Visual Regression Testing

## Overview
Visual regression testing helps catch unintended UI changes by comparing screenshots.

## Recommended Tools

### 1. Percy (Recommended)
Cloud-based visual testing platform with GitHub integration.

#### Setup
```bash
npm install --save-dev @percy/cli @percy/storybook
```

#### Configuration
Create `.percy.yml`:
```yaml
version: 2
static:
  files: '**/*.html'
  ignore: 'node_modules/**'
snapshot:
  widths:
    - 375  # Mobile
    - 768  # Tablet
    - 1280 # Desktop
```

#### GitHub Action
```yaml
name: Visual Tests
on: [pull_request]
jobs:
  percy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - run: npx percy snapshot dist
        env:
          PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

### 2. Chromatic (Alternative)
Storybook-focused visual testing.

```bash
npm install --save-dev chromatic
```

### 3. Playwright Visual Comparisons
Self-hosted option using Playwright.

```bash
npm install --save-dev @playwright/test
```

#### Example Test
```typescript
import { test, expect } from '@playwright/test';

test('homepage visual regression', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page).toHaveScreenshot('homepage.png');
});
```

## Implementation Strategy

### Phase 1: Critical Pages
1. Landing page
2. Hero section
3. Project showcase

### Phase 2: Interactive Components
1. Navigation
2. Modals
3. Forms

### Phase 3: Responsive Views
Test all breakpoints:
- Mobile (375px)
- Tablet (768px)
- Desktop (1280px)

## Best Practices
1. Use consistent viewport sizes
2. Wait for animations to complete
3. Mock dynamic data (dates, random values)
4. Test both light and dark modes
5. Review changes in PR comments

## Integration
Add visual tests to CI/CD pipeline to run on every PR.

## Cost Considerations
- Percy: Free tier available (5,000 screenshots/month)
- Chromatic: Free for open source
- Playwright: Free (self-hosted)
