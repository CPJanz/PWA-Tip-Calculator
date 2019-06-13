const staticAssets = [
  "./",
  "./assets/style/reset.css",
  "./assets/style/style.css",
  "./app.js"
];

self.addEventListener("install", async e => {
  const cache = await caches.open("new-static");
  cache.addAll(staticAssets);
});

self.addEventListener("fetch", e => {
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
