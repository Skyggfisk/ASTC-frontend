//start install
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open("astc_cache").then(function(cache) {
      console.log("Opened cache");
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

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response !== undefined) {
        return response;
      } else {
        return fetch(event.request).then(function(response) {
          let responseClone = response.clone();

          caches.open("astc_cache").then(function(cache) {
            cache.put(event.request, responseClone);
          });
          console.log(response);
          return response;
        });
      }
    })
  );
});
