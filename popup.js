<!DOCTYPE html>
<html>
  <head>
    <title>ChatGPT API Demo</title>
    <!-- Включаємо CSS-стилі -->
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <h1>ChatGPT API Demo</h1>
    <div id="chat-window">
        <div id="output"></div>
        <input id="input" type="text" placeholder="Напишіть своє повідомлення...">
        <button id="send-button">Відправити</button>
      </div>
      
    <!-- Включаємо JavaScript-код, що інтегрує ChatGPT API -->
    <script src="chatgpt.js"></script>
    <script>
      const chatbot = new GPTChatBot('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');
      const sendButton = document.getElementById('send-button');
      sendButton.addEventListener('click', () => {
        const userMessage = document.getElementById('input').value;
        getResponse(chatbot, userMessage);
      });
    </script>
  </body>
</html>
