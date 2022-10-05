import 'regenerator-runtime/runtime';

export default null;
declare const self: ServiceWorkerGlobalScope;

const CACHE_NAME = 'mitdemokrati-v1';
const URLS_TO_CACHE = [self.location.origin];

self.addEventListener('install', (event) =>
  event.waitUntil(populateCacheOnInstall())
);

async function populateCacheOnInstall() {
  const cache = await caches.open(CACHE_NAME);

  return cache.addAll(URLS_TO_CACHE);
}

self.addEventListener('fetch', (event) => {
  const { request } = event;

  const updatableCacheFirstFetchResponse = new Promise<Response>((resolve) => {
    let resolved = false;

    // Resolve response from cache
    caches.match(request).then((cacheResponse) => {
      if (!resolved && cacheResponse) {
        resolved = true;
        resolve(cacheResponse);
      }
    });

    // Do not fetch from network when offline
    if (!navigator.onLine) {
      return;
    }

    // Resolve response from network and update cache
    fetch(request).then((fetchResponse) => {
      if (shouldCacheResponse(fetchResponse)) {
        cloneResponseToCache(request, fetchResponse);
      }

      if (!resolved) {
        resolved = true;
        resolve(fetchResponse);
      }
    });
  });

  event.respondWith(updatableCacheFirstFetchResponse);
});

// Only save good responses to cache
function shouldCacheResponse(response: Response) {
  return response && response.status === 200 && response.type === 'basic';
}

async function cloneResponseToCache(request: Request, response: Response) {
  const responseToCache = response.clone();

  const openCache = await caches.open(CACHE_NAME);
  openCache.put(request, responseToCache);
}
