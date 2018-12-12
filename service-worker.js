//start install
self.addEventListener('install', function (event) {

    event.waitUntil(
        caches.open('astc_cache')
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(
                    './index.html',
                    './views/astc-map.html',
                    './styles/style.css',
                    './styles/mapStyle.css',
                    './scripts/app.js',
                    './images/favicon.png',
                    './images/aalborgstor.png'
                );
            })
    );
    console.log('Caching done');
});

//self.addEventListener('fetch')