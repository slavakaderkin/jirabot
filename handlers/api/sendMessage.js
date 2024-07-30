const telegramApiRequest = require('../../lib/telegramApiRequest');

function sendMessage(chatId, text, keyboard) {
  if (!text || text.trim() === '') {
    return Promise.reject(new Error('Message text is empty'));
  }

  const params = { chat_id: chatId, text };
  if (keyboard) params['reply_markup'] = keyboard;
  return telegramApiRequest('sendMessage', params)
    .then(response => {
      console.log("sendMessage ~ response:", response);
      return response;
    })
    .catch(error => {
      console.error("sendMessage ~ error:", error);
      throw error;
    });
}

module.exports = sendMessage;
