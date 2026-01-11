const CACHE_NAME = 'portfolio-v8.1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/manifest.json'
];

// 1. INSTALL: Cache Core Assets
self.addEventListener('install', (event) => {
    self.skipWaiting(); // Takeover immediately
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// 2. ACTIVATE: Cleanup Old Caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        Promise.all([
            self.clients.claim(), // Control clients immediately
            caches.keys().then((keys) => {
                return Promise.all(
                    keys.map((key) => {
                        if (key !== CACHE_NAME) {
                            return caches.delete(key);
                        }
                    })
                );
            })
        ])
    );
});

// 3. FETCH: The "Network-First" Strategy (The Fix)
// 3. FETCH: The "Network-First" Strategy (The Fix)
self.addEventListener('fetch', (event) => {
    // Only handle GET requests
    if (event.request.method !== 'GET') return;

    const url = new URL(event.request.url);

    // A. Navigation Requests (HTML) -> NETWORK FIRST
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                    return networkResponse;
                })
                .catch(() => {
                    return caches.match('/index.html');
                })
        );
        return;
    }

    // B. Assets (JS, CSS, Images) -> STALE-WHILE-REVALIDATE
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                // Check for valid response
                if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                    return networkResponse;
                }

                const responseToCache = networkResponse.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return networkResponse;
            });

            return cachedResponse || fetchPromise;
        })
    );
});
