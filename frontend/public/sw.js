// KILL SWITCH SERVICE WORKER
// This worker replaces the previous caching worker to force a clean slate.

const CACHE_NAME = 'portfolio-kill-switch-v1';

self.addEventListener('install', (event) => {
    // Activate immediately, displacing the old worker
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // Take control of all clients immediately
    event.waitUntil(
        Promise.all([
            self.clients.claim(),
            // DELETE ALL CACHES
            caches.keys().then((keys) => {
                return Promise.all(
                    keys.map((key) => {
                        console.log('[SW] Deleting cache:', key);
                        return caches.delete(key);
                    })
                );
            })
        ])
    );
});

// Pass through all requests to network (No Caching)
self.addEventListener('fetch', (event) => {
    // Just simple fetch, no intercept logic
    return;
});
