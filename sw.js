var cacheName = 'gh-387';
var cacheFiles = [
    '/pwa/index.html',
    '/pwa/swipe.js',
    'https://kit.fontawesome.com/e39a7f1b81.js',
    '/e39a7f1b81.js',
    '/fa2.js',
    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js',
    '/courses/mycoursesV3firebaseauto.html',
    'https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js',
    'https://www.gstatic.com/firebasejs/8.6.8/firebase-auth.js',
    'https://www.gstatic.com/firebasejs/8.6.8/firebase-database.js',
    'https://cdn.jsdelivr.net/npm/chart.js',
    '/pwa/',
    '/pwa/?app=app',
    '/about.html',
    '/map/ucrmap.html',
    'https://api.mapbox.com/styles/v1/kevinsomeone/cl9d88y22004j14p5gs6zhbbc?access_token=pk.eyJ1Ijoia2V2aW5zb21lb25lIiwiYSI6ImNreWVhZWhqODBicHUycGxobjB4a2RtaXoifQ.62h4nM-5YwmHup3j1rJCDA',
    'https://fonts.googleapis.com/icon?family=Material+Icons',
    'https://fonts.googleapis.com/css?family=Nunito+Sans',
    'https://ka-f.fontawesome.com/releases/v5.15.4/webfonts/free-fa-solid-900.woff2',
    'https://fonts.gstatic.com/s/materialicons/v140/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'https://fonts.gstatic.com/s/nunitosans/v15/pe1mMImSLYBIv1o4X1M8ce2xCx3yop4tQpF_MeTm0lfGWVpNn64CL7U8upHZIbMV51Q42ptCp5F5bxqqtQ1yiU4G1ilXs1UlIfM0qh1d.woff2',
    'https://fonts.gstatic.com/s/materialicons/v118/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'https://fonts.gstatic.com/s/nunitosans/v8/pe0qMImSLYBIv1o4X1M8cce9I9tAcVwo.woff2',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
    'https://fonts.gstatic.com/s/materialicons/v141/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'https://code.jquery.com/jquery-3.6.1.min.js',
    'https://unpkg.com/vue@3.2.41/dist/vue.global.prod.js',
    '/vue/main.js',
    '/courses/nextclass_litev2.html',
    '/coursedifficulty/main.js',
    '/courses/courses_paramsv2.html',
    '/courses/icsgen_scan.html',
    '/map/ucrmap.js',
    'https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css',
    'https://fonts.googleapis.com/css?family=Open+Sans',
    'https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js',
    '/vue/manifest.json',
    '/map/index.html',
    '/map/main.js',
    '/map/manifest.json',
    '/images/apple-touch-icon.png',
    'https://unpkg.com/vue@3/dist/vue.global.prod.js',
    '/images/favicon.ico',
    'https://docs.google.com/spreadsheets/d/1s0G7YPaCTQvvHEzg0eeMXcgoa292pzLw80hl531S_U4/gviz/tq?tqx=out:json',
    'https://docs.google.com/spreadsheets/d/1qiy_Oi8aFiPmL4QSTR3zHe74kmvc6e_159L1mAUUlU0/gviz/tq?tqx=out:json',
    'https://docs.google.com/spreadsheets/d/1x2ZIfxx6TAxOy4yhQIMRyR-JDgY_rIclr-ugC0dnriM/gviz/tq?tqx=reqId%3A0',
    '/map/location_details_short.html',
    '/map/location_details_short.js',
    '/map/',
    '/map/location_details.html',
    'https://utils.gohighlander.app/images/192x192.png',
    '/rscan/',
    '/rscan/index.html',
    '/pwa/detechNotch.js',
    '/pwa/topbar.css',
    '/pwa/manifest.json',
    'https://fonts.gstatic.com/s/nunitosans/v12/pe0qMImSLYBIv1o4X1M8cce9I9tAcVwo.woff2',
    '/courses/myschedule.html',
    '/courses/coursesv2.html',
    '/courses/mycourses.html',
    'https://cdn.jsdelivr.net/npm/sweetalert2@11',
    '/courses/ics.js',
    '/courses/gzip.js',
    'https://cdnjs.cloudflare.com/ajax/libs/pako/2.0.4/pako.min.js',
    'https://cdn.jsdelivr.net/npm/clipboard@2.0.10/dist/clipboard.min.js',
    'https://fonts.gstatic.com/s/materialicons/v139/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
    'https://ka-f.fontawesome.com/releases/v5.15.4/css/free.min.css?token=e39a7f1b81',
    'https://ka-f.fontawesome.com/releases/v5.15.4/css/free-v4-shims.min.css?token=e39a7f1b81',
    ' https://ka-f.fontawesome.com/releases/v5.15.4/css/free-v4-font-face.min.css?token=e39a7f1b81',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css.map',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta3/dist/css/bootstrap-select.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap-select@1.14.0-beta3/dist/js/bootstrap-select.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/darkreader@4.9.58/darkreader.min.js',
    '/coursedifficulty/',
    '/coursedifficulty/index.html',
    '/courses/nextclass.html',
    '/courses/nextclass_lite.html',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js',
    '/courses/term_selector.html',
    '/courses/courses_termv2.html',
    'https://cdn.jsdelivr.net/gh/khmyznikov/pwa-install@497d352feeabc9aa6c65a6f93133804b83321758/dist/pwa-install.bundle.js',
    '/map/mapview.js',
    'https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js',
    '/offline.html',
    '/courses/myschedulev2.html',
    '/courses/mycoursesv2.html',
    'https://cdnjs.cloudflare.com/ajax/libs/pulltorefreshjs/0.1.22/index.umd.min.js',
    'https://cdn.jsdelivr.net/npm/marked/marked.min.js',
    '/icsevent.html',
    'https://fonts.gstatic.com/s/materialicons/v143/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
];

self.addEventListener('message', event => {
    if (event.data && event.data.action === 'clearCache') {
        clearCaches().then(() => {
            // Inform the web page that the cache was cleared
            event.source.postMessage('cacheCleared');
        });
    }
});

function clearCaches() {
    return caches.keys().then(cacheNames => {
        return Promise.all(cacheNames.map(cacheName => {
            return caches.delete(cacheName);
        }));
    });
}

self.addEventListener('install', function (e) {
    console.log('Service Worker status: install ' + cacheName);

    var cacheOpenPromise = caches.open(cacheName).then(function (cache) {
        var cachePromises = cacheFiles.map(function (url) {
            return cache.add(url).catch(function (error) {
                console.error('Failed to cache:', url, error);
            });
        });

        return Promise.all(cachePromises);
    });

    e.waitUntil(
        cacheOpenPromise.catch(function (error) {
            console.error('Error caching files:', error);
        })
    );

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

self.addEventListener('fetch', function(event) {
  var requestUrl = new URL(event.request.url);

  // Check if the request URL belongs to docs.google.com
  if (requestUrl.hostname === 'docs.google.com') {
    event.respondWith(
      caches.open(cacheName).then(function(cache) {
        return cache.match(event.request).then(function(response) {
          // Clone the response to serve to the page
          var responseClone = response.clone();

          // Fetch the updated version of the file in the background
          var fetchPromise = fetch(event.request).then(function(networkResponse) {
            // If the file is in the cache and the network response is successful (status 200),
            // update the cache with the new version
            if (response && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }

            return networkResponse;
          }).catch(function(error) {
            // Handle fetch errors
            console.error('Fetch error:', error);
            throw error;
          });

          // Return the cached response to the page immediately
          // while updating the cache in the background
          event.waitUntil(fetchPromise);
          return responseClone || fetchPromise;
        });
      })
    );
  } else {
    // For URLs that don't belong to docs.google.com, respond with the cached version if available
    event.respondWith(
    caches.match(event.request)
	    .then(function(response) {
	      // The response is found in the cache, return it
	      if (response) {
	        return response;
	      }
	
	      // No response found in cache. Fetch from network...
	      return fetch(event.request)
	        .catch(function() {
	          // If fetch fails, return a default offline HTML page
	          return caches.match('/offline.html');
	        });
	    })
	);
  }
});


