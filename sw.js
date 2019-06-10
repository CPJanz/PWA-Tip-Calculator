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
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});

// self.addEventListener("fetch", function(event) {
//   event.respondWith(
//     fetch(event.request).catch(function() {
//       return caches.match(event.request);
//     })
//   );
// let online = navigator.onLine;
// const req = e.request;
// if (online) {
//   console.log("Online");
// } else {
//   e.respondWith(cacheFirst(req));
//   console.log("Offline, serving cache.");
// }
// });

async function cacheFirst(req) {
  const cachedResponse = await caches.match(req);
  return cachedResponse || fetch(req);
}
