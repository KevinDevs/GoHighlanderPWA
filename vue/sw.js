var cacheName = 'parking-01';
var cacheFiles = [
    'parking_vue.html',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    'https://utils.gohighlander.app/cdn-cgi/apps/head/XGwGpgmQKOTAdQvFyOUPHn-6FLU.js',
    'https://code.jquery.com/jquery-3.6.1.min.js',
    'https://unpkg.com/vue@3.2.41/dist/vue.global.prod.js',
    'main.js',
    'manifest.json',
    '/images/apple-touch-icon.png',
    'https://unpkg.com/vue@3/dist/vue.global.prod.js',
    '/images/favicon.ico'
];

self.addEventListener('install', function (e) {
    console.log('Service Worker status： install '+cacheName);
    var cacheOpenPromise = caches.open(cacheName).then(function (cache) {
        return cache.addAll(cacheFiles);
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

