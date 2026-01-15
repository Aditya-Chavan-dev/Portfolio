// This service worker is designed to specifically UNREGISTER itself and kill any cache.
self.addEventListener('install', function (e) {
    self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    // Immediately unregister
    self.registration.unregister()
        .then(function () {
            // Take control of all clients
            return self.clients.matchAll();
        })
        .then(function (clients) {
            // Force reload all clients
            clients.forEach(client => client.navigate(client.url));
        });
});
