// Додайте цей код у content.js файл

// Створення нового аудіо об'єкту
const synth = window.speechSynthesis;

// Функція для озвучування тексту
function speakText(text) {
  // Створення нового об'єкту для голосу
  const voice = new SpeechSynthesisUtterance();
  // Встановлюємо текст для озвучування
  voice.text = text;
  // Запускаємо озвучування
  synth.speak(voice);
}

// Функція для визначення тексту на сторінці та його озвучування
function readPage() {
  // Знаходимо всі елементи з класом 'chatgpt-response' та озвучуємо їх текст
  const elements = document.getElementsByClassName('chatgpt-response');
  for (let i = 0; i < elements.length; i++) {
    speakText(elements[i].textContent);
  }
}

// Викликаємо функцію при натисканні на іконку розширення
chrome.browserAction.onClicked.addListener(() => {
  readPage();
});

// Викликаємо функцію при завантаженні сторінки
readPage();