const CACHE_NAME = 'portfolio-v7.0';
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
self.addEventListener('fetch', (event) => {
    const url = new URL(event.request.url);

    // A. Navigation Requests (HTML) -> NETWORK FIRST
    // This ensures the user ALWAYS gets the latest version if online.
    if (event.request.mode === 'navigate') {
        event.respondWith(
            fetch(event.request)
                .then((networkResponse) => {
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, networkResponse.clone());
                        return networkResponse;
                    });
                })
                .catch(() => {
                    // Offline? Fallback to cache
                    return caches.match('/index.html');
                })
        );
        return;
    }

    // B. Assets (JS, CSS, Images) -> STALE-WHILE-REVALIDATE
    // Serve fast from cache, but update it in the background.
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, networkResponse.clone());
                });
                return networkResponse;
            });

            return cachedResponse || fetchPromise;
        })
    );
});
