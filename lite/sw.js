var cacheName = 'courses-01';
var cacheFiles = [
];

self.addEventListener('install', function (e) {
    console.log('Service Worker status： install '+cacheName);
    var cacheOpenPromise = caches.open(cacheName).then(function (cache) {
        return cache.addAll();
    });
    e.waitUntil(cacheOpenPromise);
    self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    console.log('Service Worker status： activate ' + cacheName);
    var cachePromise = caches.keys().then(function (keys) {
        return Promise.all(keys.map(function (key) {
            if (key !== cacheName) {
                return caches.delete(key);
            }
        }));
    })
    e.waitUntil(cachePromise);
    return self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.match(e.request).then(function (cache) {
            return cache || fetch(e.request);
        }).catch(function (err) {
            console.log(err);
            return fetch(e.request);
        })
    );
});

