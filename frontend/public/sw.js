const CACHE_NAME = 'portfolio-v6';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json'
];

// Install SW
self.addEventListener('install', (event) => {
    // Force immediate takeover
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Listen for requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Cache hit - return response
                if (response) {
                    return response;
                }

                // Navigation fallback for SPA
                if (event.request.mode === 'navigate') {
                    return caches.match('/index.html')
                        .then((cacheRes) => {
                            return cacheRes || fetch(event.request);
                        });
                }

                return fetch(event.request);
            })
    );
});

// Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        Promise.all([
            // Take control of all clients immediately
            self.clients.claim(),
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheWhitelist.indexOf(cacheName) === -1) {
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
        ])
    );
});
