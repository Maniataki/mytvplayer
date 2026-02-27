const CACHE_NAME = 'tv-app-v118';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  'https://img.icons8.com/fluency/192/television.png',
  'https://cdn.jsdelivr.net/npm/hls.js@latest',
  'https://cdn.dashjs.org/latest/dash.all.min.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});