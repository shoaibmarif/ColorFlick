// Minimal safe Service Worker for Color Guessing Game
// Strictly avoids caching HTML, sitemap, robots, and manifest to prevent stale versions

const CACHE_NAME = 'color-guessing-game-v1';
const STATIC_ASSETS = [
  '/',
  '/favicon.svg',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).catch(() => {
      // Offline cache fallback ignore
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Never cache sitemap, robots, manifest, or HTML navigations
  if (
    url.pathname.endsWith('sitemap.xml') ||
    url.pathname.endsWith('robots.txt') ||
    url.pathname.endsWith('manifest.webmanifest') ||
    event.request.mode === 'navigate'
  ) {
    // Network first, fallback to network
    event.respondWith(fetch(event.request));
    return;
  }

  // Network first for other assets
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
