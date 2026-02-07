# CDN Configuration for Firebase Hosting

## Overview
Firebase Hosting automatically provides CDN capabilities through Google's global infrastructure.

## Automatic CDN Features

### Global Edge Network
- Content is automatically cached at edge locations worldwide
- No additional configuration needed
- Automatic SSL/TLS certificates

### Cache Control
Firebase Hosting respects standard HTTP cache headers. Configure in `firebase.json`:

```json
{
  "hosting": {
    "public": "dist",
    "headers": [
      {
        "source": "**/*.@(jpg|jpeg|gif|png|webp|svg)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "index.html",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=0, must-revalidate"
          }
        ]
      }
    ]
  }
}
```

## Optimization Tips

### 1. Asset Hashing
Vite automatically adds content hashes to built assets, enabling long-term caching.

### 2. Compression
Firebase Hosting automatically serves gzip and Brotli compressed versions.

### 3. HTTP/2
All Firebase Hosting sites support HTTP/2 by default.

## Monitoring
Use Firebase Hosting analytics to track CDN performance and bandwidth usage.

## Custom Domain
Configure custom domain in Firebase Console for production deployment.
