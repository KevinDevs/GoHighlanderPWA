var cacheName = 'litepwa-07';
var cacheFiles = [
    'index.html',
    '/pwa/',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://kit.fontawesome.com/e39a7f1b81.js',
    'https://fonts.googleapis.com/css?family=Nunito+Sans',
    'https://fonts.gstatic.com/s/materialicons/v118/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'https://fonts.gstatic.com/s/nunitosans/v8/pe0qMImSLYBIv1o4X1M8cce9I9tAcVwo.woff2'
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

