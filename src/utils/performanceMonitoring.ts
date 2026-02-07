import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';

/**
 * Performance monitoring utility using Web Vitals
 * Tracks Core Web Vitals and logs to console in development
 */

const isDevelopment = import.meta.env.DEV;

function logMetric(metric: Metric) {
    const { name, value, rating, delta } = metric;

    const emoji = rating === 'good' ? '✅' : rating === 'needs-improvement' ? '⚠️' : '❌';

    console.log(
        `${emoji} [Web Vitals] ${name}:`,
        `${value.toFixed(2)}ms`,
        `(${rating})`,
        delta ? `Δ ${delta.toFixed(2)}ms` : ''
    );

    // In production, you could send to analytics
    // if (!isDevelopment) {
    //   sendToAnalytics(metric);
    // }
}

/**
 * Initialize performance monitoring
 * Call this once in your app entry point
 */
export function initPerformanceMonitoring() {
    if (isDevelopment) {
        console.log('🎯 Performance monitoring initialized');
    }

    // Core Web Vitals
    onCLS(logMetric);  // Cumulative Layout Shift
    onINP(logMetric);  // Interaction to Next Paint (replaces FID)
    onLCP(logMetric);  // Largest Contentful Paint

    // Additional metrics
    onFCP(logMetric);  // First Contentful Paint
    onTTFB(logMetric); // Time to First Byte
}

/**
 * Example analytics integration (commented out)
 */
// function sendToAnalytics(metric: Metric) {
//   const body = JSON.stringify({
//     name: metric.name,
//     value: metric.value,
//     rating: metric.rating,
//     delta: metric.delta,
//     id: metric.id,
//     navigationType: metric.navigationType,
//   });
//
//   // Send to your analytics endpoint
//   if (navigator.sendBeacon) {
//     navigator.sendBeacon('/analytics', body);
//   } else {
//     fetch('/analytics', { body, method: 'POST', keepalive: true });
//   }
// }
