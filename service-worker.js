const CACHE_NAME = "kalender-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/styles.css",
    "/icon-192x192.png",
    "/icon-512x512.png"
];

// Installera service workern och cacha resurser
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Serve resurser från cachen
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Uppdatera service workern och rensa gammal cache
self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
