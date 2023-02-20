const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatMessages = document.querySelector('.chat-messages');

// Function to format the message with HTML
function formatMessage(message, type) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(type);
  messageElement.innerHTML = `<div class="message-content">${message}</div>`;
  return messageElement;
}

// Function to add message to the chat window
function addMessageToChat(message, type) {
  const messageElement = formatMessage(message, type);
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to send message to ChatGPT API and get a response
async function getBotMessage(message) {
  const response = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      'prompt': `Q: ${message}\nA:`,
      'max_tokens': 50,
      'temperature': 0.7,
      'n': 1,
      'stop': '\n'
    })
  });
  const data = await response.json();
  return data.choices[0].text.trim();
}

// Event listener for chat form submission
chatForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const message = chatInput.value;
  addMessageToChat(message, 'message-user');
  chatInput.value = '';
  const botMessage = await getBotMessage(message);
  addMessageToChat(botMessage, 'message-bot');
});