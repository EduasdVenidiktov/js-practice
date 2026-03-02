
// 3. ЗАПУСК ТА ЛОГІКА СТРІЧКИ
const runningLine = document.getElementById("running-line");

if (runningLine) {
  const infoText = getFormattedOldDate();
  // Дублюємо текст для ефекту нескінченності
  // Повторюємо текст 5-6 разів, щоб заповнити всю ширину екрана
  const content = `${infoText} • `;
  runningLine.textContent = content.repeat(60);
}

// Запускаємо годинник
updateClock();
setInterval(updateClock, 1000);
