let deferredPrompt;
const installBtn = document.getElementById("installBtn");

// Слухаємо подію перед встановленням
window.addEventListener("beforeinstallprompt", (e) => {
  // Запобігаємо автоматичному вікну браузера
  e.preventDefault();
  // Зберігаємо подію
  deferredPrompt = e;

  // Якщо кнопка існує на цій сторінці — показуємо її
  if (installBtn) {
    installBtn.style.display = "block";
  }
});

// Логіка натискання на кнопку
if (installBtn) {
  installBtn.addEventListener("click", async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`Результат встановлення: ${outcome}`);
      deferredPrompt = null;
      installBtn.style.display = "none";
    }
  });
}

// Ховаємо кнопку, якщо вже встановлено
window.addEventListener("appinstalled", () => {
  deferredPrompt = null;
  if (installBtn) installBtn.style.display = "none";
});
