# Performance Budgets

## Bundle Size Targets

### JavaScript
- **Main Bundle**: < 500 KB (gzipped)
- **Vendor Bundle**: < 300 KB (gzipped)
- **Total JS**: < 800 KB (gzipped)

### CSS
- **Total CSS**: < 50 KB (gzipped)

### Images/Assets
- **Individual Images**: < 200 KB
- **Total Assets**: < 2 MB

## Performance Metrics (Core Web Vitals)

### Largest Contentful Paint (LCP)
- **Good**: < 2.5s
- **Needs Improvement**: 2.5s - 4.0s
- **Poor**: > 4.0s

### First Input Delay (FID)
- **Good**: < 100ms
- **Needs Improvement**: 100ms - 300ms
- **Poor**: > 300ms

### Cumulative Layout Shift (CLS)
- **Good**: < 0.1
- **Needs Improvement**: 0.1 - 0.25
- **Poor**: > 0.25

### First Contentful Paint (FCP)
- **Good**: < 1.8s
- **Needs Improvement**: 1.8s - 3.0s
- **Poor**: > 3.0s

### Time to First Byte (TTFB)
- **Good**: < 800ms
- **Needs Improvement**: 800ms - 1800ms
- **Poor**: > 1800ms

## Lighthouse Scores

### Target Scores (All Categories)
- **Performance**: ≥ 90
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 95
- **SEO**: ≥ 100

## Monitoring

Run `npm run build` and check bundle sizes in output.
Use browser DevTools Performance tab for runtime metrics.
Web Vitals are logged to console in production (see `performanceMonitoring.ts`).

## Actions on Budget Violations

1. Analyze bundle with `npm run build -- --mode analyze` (if configured)
2. Consider code splitting for large routes
3. Lazy load heavy components
4. Optimize images (use WebP, compress)
5. Review and remove unused dependencies
