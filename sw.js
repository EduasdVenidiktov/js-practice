const CACHE_NAME = "js-practice-v3";
const urlsToCache = [
  "./", // Корінь (важливо для офлайн-доступу)
  "./index.html", // Головна сторіюза, над якою ви зараз працюєте
  "./css/menu.css",
  "./task-5.html", // Сторінка, над якою ви зараз працюєте
  "./task-6.html", // Сторінка, над якою ви зараз працюєте
  "./task-7.html", // Сторінка, над якою ви зараз працюєте

  "./manifest.json", // Маніфест додатка

  "./css/task-5.css", // Стилі (маленькими літерами)
  "./css/task-6.css", // Стилі (маленькими літерами)
  "./css/task-7.css", // Стилі (маленькими літерами)

  "./js/install.js",
  "./js/task-5.js", // Скрипти (маленькими літерами)
  "./js/task-6.js", // Скрипти (маленькими літерами)
  "./js/task-7.js", // Скрипти (маленькими літерами)

  "./pages/page-alert.html", // Підсторінка
  "./pages/page-alert-5.html", // Підсторінка
  "./pages/page-alert-6.html", // Підсторінка
  "./pages/page-alert-7.html", // Підсторінка
  "./pages/page-alertV.html", // Підсторінка

  "./pages/page-plus.html", // Підсторінка (папка з маленької літери!)
  "./pages/page-plus-5.html", // Підсторінка (папка з маленької літери!)
  "./pages/page-plus-6.html", // Підсторінка (папка з маленької літери!)
  "./pages/page-plus-7.html", // Підсторінка (папка з маленької літери!)
  "./pages/page-plusV.html", // Підсторінка (папка з маленької літери!)

  "./pages/update-screen.html", // Підсторінка (папка з маленької літери!)

  "./photo/3.png", // Зображення (папка з маленької літери!)
  "./photo/4.png", // Зображення (папка з маленької літери!)

  "./photo/back-icon.png", // Зображення (папка з маленької літери!)
  "./photo/button-bell.png", // Зображення (папка з маленької літери!)
  "./photo/info.png",
  "./photo/pdf.png",
  "./photo/plus-window.png", // Зображення (папка з маленької літери!)
  "./photo/plus-windowV.png", // Зображення (папка з маленької літери!)

  "./photo/plus.png", // Зображення (папка з маленької літери!)
  "./photo/refresh-window.jpg", // Зображення (папка з маленької літери!)
  "./photo/swipe.png", // Зображення
  "./photo/update-screen.jpg",

  "./icon-192.png", // Іконка для PWA
  "./icon-512.png", // Іконка для PWA
  "./icon-5121.png", // Іконка для PWA
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
