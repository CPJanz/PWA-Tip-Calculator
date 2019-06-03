const staticAssets = [
  "./",
  "./assets/style/style.css",
  "./assets/style/style.css",
  "./app.js"
];

self.addEventListener("install", async e => {
  const cache = await caches.open("new-static");
  cache.addAll(staticAssets);
});

self.addEventListener("fetch", e => {
  let online = navigator.onLine;
  console.log("online?", online);
  const req = e.request;
  e.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
  const cachedResponse = await caches.match(req);
  return cachedResponse || fetch(req);
}
