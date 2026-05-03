// js/update-modal.js

document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.getElementById("update-doc-trigger");

  if (trigger) {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      if (!document.getElementById("update-modal-backdrop")) {
        loadAndShowModal();
      } else {
        showModal();
      }
    });
  }
});

async function loadAndShowModal() {
  try {
    hidePreviousMenu(); // Ховаємо нижнє меню перед показом модалки

    const response = await fetch("pages/update-modal.html");
    if (!response.ok) throw new Error("Помилка завантаження");

    const modalHtml = await response.text();
    document.body.insertAdjacentHTML("beforeend", modalHtml);

    addModalStyles();
    setTimeout(showModal, 10);
  } catch (error) {
    console.error(error);
  }
}

function hidePreviousMenu() {
  const menu = document.querySelector(".modal-menu");
  const overlay = document.getElementById("modal-overlay");

  if (menu) {
    menu.style.display = "none";
    menu.classList.remove("active");
  }

  if (overlay) {
    overlay.style.display = "none";
    overlay.classList.remove("active");
  }
}

function showModal() {
  const backdrop = document.getElementById("update-modal-backdrop");
  if (backdrop) {
    backdrop.style.display = "flex";
    setTimeout(() => {
      backdrop.classList.add("active");
    }, 10);
  }
}

// ДОДАЙ ЦЕЙ БЛОК: Логіка закриття вікна
document.addEventListener("click", (e) => {
  // Перевіряємо, чи клікнули на контейнер з id="close-modal" (де твоя картинка скасування)
  if (e.target.closest("#close-modal")) {
    const backdrop = document.getElementById("update-modal-backdrop");
    if (backdrop) {
      backdrop.classList.remove("active");
      setTimeout(() => {
        backdrop.style.display = "none";
      }, 200); // Час має збігатися з transition в CSS
    }
  }
});

function addModalStyles() {
  if (document.getElementById("update-modal-styles")) return;

  const styles = `
        <style id="update-modal-styles">
            .update-modal-backdrop {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                opacity: 0;
                transition: opacity 0.2s ease;
            }

            .update-modal-backdrop.active {
                opacity: 1;
            }

            .update-modal-window {
                background-color: #ffffff;
                width: 82%; 
                border-radius: 20px;
                padding:  20px 10px;
                display: flex;
                gap: 20px;
                flex-direction: column;
                align-items: center;
                box-shadow: 0 5px 20px rgba(0,0,0,0.2);
                transform: scale(0.9);
                transition: transform 0.2s cubic-bezier(0.17, 0.89, 0.32, 1.28);
            }

            .update-modal-backdrop.active .update-modal-window {
                transform: scale(1);
            }

            .modal-img-content {
                width: 100%;
                height: auto;
            }

            .modal-img-btn {
                width: 100%;
                height: auto;
                display: block;

            }

            .modal-img-btn-small {
                width: 100%;
                height: auto;
            }

            .modal-btn-link {
                width: 100%;
                display: flex;
                justify-content: center;
                cursor: pointer;
                text-decoration: none;
            }
        </style>
    `;
  document.head.insertAdjacentHTML("beforeend", styles);
}

// // js/update-modal.js

// document.addEventListener("DOMContentLoaded", () => {
//   const trigger = document.getElementById("update-doc-trigger");

//   if (trigger) {
//     trigger.addEventListener("click", (e) => {
//       e.preventDefault(); // Запобігаємо переходу за посиланням

//       // Якщо модальне вікно ще не завантажене, завантажуємо його
//       if (!document.getElementById("update-modal-backdrop")) {
//         loadAndShowModal();
//       } else {
//         showModal();
//       }
//     });
//   }
// });

// async function loadAndShowModal() {
//   try {
//     // Завантажуємо HTML файл модального вікна
//     const response = await fetch("pages/update-modal.html");
//     if (!response.ok) throw new Error("Помилка завантаження модального вікна");

//     const modalHtml = await response.text();

//     // Вставляємо HTML в кінець body
//     document.body.insertAdjacentHTML("beforeend", modalHtml);

//     // Додаємо CSS
//     addModalStyles();

//     // Показуємо вікно з невеликою затримкою для анімації
//     setTimeout(showModal, 10);
//   } catch (error) {
//     console.error(error);
//   }
// }

// function showModal() {
//   const backdrop = document.getElementById("update-modal-backdrop");
//   if (backdrop) {
//     backdrop.style.display = "flex";
//     setTimeout(() => {
//       backdrop.classList.add("active");
//     }, 10);
//   }
// }

// function addModalStyles() {
//   if (document.getElementById("update-modal-styles")) return;

//   const styles = `
//         <style id="update-modal-styles">
//             .update-modal-backdrop {
//                 position: fixed;
//                 top: 0;
//                 left: 0;
//                 width: 100%;
//                 height: 100%;
//                 background-color: rgba(0, 0, 0, 0.5);
//                 display: none;
//                 justify-content: center;
//                 align-items: center;
//                 z-index: 10000;
//                 opacity: 0;
//                 transition: opacity 0.2s ease;
//             }

//             .update-modal-backdrop.active {
//                 opacity: 1;
//             }

//             .update-modal-window {
//                 background-color: #ffffff;
//                 width: 88%;
//                 max-width: 350px;
//                 border-radius: 30px;
//                 padding: 35px 20px;
//                 display: flex;
//                 flex-direction: column;
//                 align-items: center;
//                 box-shadow: 0 5px 20px rgba(0,0,0,0.2);
//                 transform: scale(0.9);
//                 transition: transform 0.2s cubic-bezier(0.17, 0.89, 0.32, 1.28);
//             }

//             .update-modal-backdrop.active .update-modal-window {
//                 transform: scale(1);
//             }

//             /* Основна картинка з текстом */
//             .modal-img-content {
//                 width: 100%;
//                 height: auto;
//             }

//             /* Картинки-кнопки */
//             .modal-img-btn {
//                 width: 100%;
//                 height: auto;
//                 display: block;
//             }

//             .modal-img-btn-small {
//                 width: 100%; /* Кнопка скасувати зазвичай візуально менша */
//                 height: auto;
//             }

//             .modal-btn-link {
//                 width: 100%;
//                 display: flex;
//                 justify-content: center;
//                 cursor: pointer;
//                 text-decoration: none;
//             }
//         </style>
//     `;
//   document.head.insertAdjacentHTML("beforeend", styles);
// }
// // function addModalStyles() {
// //   // Якщо стилі вже додані, нічого не робимо
// //   if (document.getElementById("update-modal-styles")) return;

// //   const styles = `
// //         <style id="update-modal-styles">
// //             /* Фон модального вікна */
// //             .update-modal-backdrop {
// //                 position: fixed;
// //                 top: 0;
// //                 left: 0;
// //                 width: 100%;
// //                 height: 100%;
// //                 background-color: rgba(0, 0, 0, 0.4); /* Напівпрозорий фон */
// //                 display: none; /* Спочатку приховане */
// //                 justify-content: center;
// //                 align-items: center;
// //                 z-index: 10000; /* Поверх усього */
// //                 opacity: 0;
// //                 transition: opacity 0.3s ease;
// //             }

// //             /* Активний стан фону (плавна поява) */
// //             .update-modal-backdrop.active {
// //                 opacity: 1;
// //             }

// //             /* Саме біле вікно */
// //             .update-modal-window {
// //                 background-color: #ffffff;
// //                 width: 80%; /* Відносна ширина */
// //                 max-width: 400px; /* Максимальна ширина */
// //                 border-radius: 20px; /* Закруглені кути як на скріні */
// //                 padding: 24px;
// //                 box-sizing: border-box;
// //                 box-shadow: 0 10px 25px rgba(0,0,0,0.1);

// //                 /* Початковий стан для анімації (зменшене) */
// //                 transform: scale(0.8);
// //                 transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
// //             }

// //             /* Активний стан вікна (збільшення до норми) */
// //             .update-modal-backdrop.active .update-modal-window {
// //                 transform: scale(1);
// //             }
// //         </style>
// //     `;
// //   document.head.insertAdjacentHTML("beforeend", styles);
// // }
