const CACHE_NAME = "js-practice-v1";
const urlsToCache = [
  "./",
  "./index.html", // або task-5.html — залежно від імені твого файлу
  "./css/task-5.css",
  "./js/task-5.js",
  "./icon-192.png",
  "./icon-512.png",
  // додай інші важливі файли/зображення, якщо є
];

self.addEventListener("install", (event) => {
  console.log("[SW] Install");
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("[SW] Caching app shell");
        return cache.addAll(urlsToCache);
      })
      .catch((err) => console.error("[SW] Cache addAll failed:", err)),
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activate");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name)),
      );
    }),
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Cache hit — повертаємо з кешу
      if (response) {
        return response;
      }
      // Інакше йдемо в мережу
      return fetch(event.request).catch(() => {
        // Якщо мережа недоступна — можна повернути офлайн-сторінку
        // return caches.match('./offline.html'); // якщо створиш таку
      });
    }),
  );
});
