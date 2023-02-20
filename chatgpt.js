// Клас, що інкапсулює взаємодію з ChatGPT API
class GPTChatBot {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.openai.com/v1';
    this.headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    };
  }

  async getChatResponse(userMessage) {
    // Створюємо запит до ChatGPT API
    const requestBody = {
      prompt: userMessage,
      temperature: 0.7,
      max_tokens: 50,
      frequency_penalty: 0,
      presence_penalty: 0
    };
    const response = await fetch(`${this.baseUrl}/engines/davinci-codex/completions`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(requestBody)
    });
    // Розпаковуємо відповідь з формату JSON
    const responseData = await response.json();
    // Повертаємо згенеровану відповідь
    return responseData.choices[0].text;
  }
}

// Отримуємо відповідь на запит користувача
function getResponse(chatbot, userMessage) {
  // Відображаємо повідомлення користувача в інтерфейсі
  const chatContainer = document.getElementById('chat-container');
  const userMessageDiv = document.createElement('div');
  userMessageDiv.className = 'message user';
  userMessageDiv.innerHTML = userMessage;
  chatContainer.appendChild(userMessageDiv);
  // Запитуємо відповідь від ChatGPT API
  chatbot.getChatResponse(userMessage)
    .then(response => {
      // Відображаємо відповідь в інтерфейсі
      const botMessageDiv = document.createElement('div');
      botMessageDiv.className = 'message bot';
      botMessageDiv.innerHTML = response;
      chatContainer.appendChild(botMessageDiv);
      // Озвучуємо відповідь
      const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(response);
      synth.speak(utterance);
    })
    .catch(error => console.error(error));
}

// Обробник натискання на кнопку "Надіслати"
const sendButton = document.getElementById('send-button');
sendButton.addEventListener('click', () => {
  const userMessageInput = document.getElementById('user-message');
  const userMessage = userMessageInput.value;
  if (userMessage) {
    // Очищуємо поле вводу
    userMessageInput.value = '';
    // Створюємо новий екземпляр GPTChatBot з API-ключем
    const chatbot = new GPTChatBot('<YOUR_API_KEY>');
    // Отримуємо відповідь на запит користувача
    getResponse(chatbot, userMessage);
    function getResponse(chatbot, userMessage) {
      // Отримуємо відповідь на запит користувача
      chatbot.getChatResponse(userMessage).then((response) => {
        // Виводимо отриману відповідь в консоль
        console.log(response);
        // Додаємо отриману відповідь до елементу чату
        let chatContainer = document.getElementById('chat-container');
        let chatMessage = document.createElement('div');
        chatMessage.classList.add('chat-message');
        chatMessage.innerHTML = response;
        chatContainer.appendChild(chatMessage);
        // Відтворюємо звуковий ефект
        let audio = new Audio('https://notificationsounds.com/soundfiles/26d09616d39b0f071c4407a840d05c18/file-rocket-ship.mp3');
        audio.play();
      }).catch((error) => {
        console.log(`Error: ${error}`);
      });
    }
  }
  function sendMessage() {
    // Отримуємо введене користувачем повідомлення
    let messageInput = document.getElementById('message-input');
    let userMessage = messageInput.value;
    // Додаємо повідомлення користувача до елементу чату
    let chatContainer = document.getElementById('chat-container');
    let chatMessage = document.createElement('div');
    chatMessage.classList.add('chat-message');
    chatMessage.innerHTML = userMessage;
    chatContainer.appendChild(chatMessage);
    // Відтворюємо звуковий ефект
    let audio = new Audio('https://notificationsounds.com/soundfiles/26d09616d39b0f071c4407a840d05c18/file-rocket-ship.mp3');
    audio.play();
    // Очищаємо поле введення повідомлення
    messageInput.value = '';
    // Отримуємо відповідь на повідомлення користувача
    getResponse(chatbot, userMessage);
  }
// Отримуємо елементи веб-сторінки
let sendButton = document.getElementById('send-button');
let messageInput = document.getElementById('message-input');

// Додаємо
}
  
