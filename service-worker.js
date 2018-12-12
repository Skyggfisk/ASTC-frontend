//start install
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("astc_cache").then(cache => {
      console.log("[ServiceWorker] Opened cache");
      return cache.addAll([
        "index.html",
        "./views/astc-map.html",
        "./styles/style.css",
        "./styles/mapStyle.css",
        "./scripts/app.js",
        "./images/favicon.png",
        "./images/aalborgstor.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(async response => {
    console.log(response);
  });
});
