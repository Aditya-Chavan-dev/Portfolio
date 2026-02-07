# PWA & Service Worker Setup

## Overview
This document outlines the approach for adding Progressive Web App (PWA) capabilities.

## Implementation Strategy

### Using Vite PWA Plugin

#### Installation
```bash
npm install -D vite-plugin-pwa
```

#### Configuration
Add to `vite.config.ts`:
```typescript
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Aditya Chavan - Portfolio',
        short_name: 'Portfolio',
        description: 'Full-stack developer portfolio showcasing projects and skills',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/api\.github\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'github-api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ]
})
```

## Features

### Offline Support
- Cache static assets for offline viewing
- Cache GitHub API responses
- Fallback pages for offline state

### Install Prompt
- Add-to-home-screen capability
- Native app-like experience

### Background Sync
- Queue failed requests for retry when online

## Testing
1. Build production version: `npm run build`
2. Serve locally: `npx serve dist`
3. Test in Chrome DevTools > Application > Service Workers

## Deployment
Service worker will be automatically registered in production builds.

## Future Enhancements
- Push notifications
- Background data sync
- Advanced caching strategies
