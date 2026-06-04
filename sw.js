const CACHE = 'castle-match-v1';
const ASSETS = [
  '/castle-match/',
  '/castle-match/index.html',
  '/castle-match/manifest.json',
  '/castle-match/icon-192.png',
  '/castle-match/icon-512.png',
  'https://fonts.googleapis.com/css2?family=Luckiest+Guy&family=Nunito:wght@700;800;900&display=swap'
];

// Install: cache all assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS.filter(u => !u.startsWith('https://fonts'))))
      .then(() => self.skipWaiting())
  );
});

// Activate: delete old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch: network first, fallback to cache
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(res => {
        // Update cache with fresh response
        const clone = res.clone();
        caches.open(CACHE).then(cache => cache.put(e.request, clone));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
