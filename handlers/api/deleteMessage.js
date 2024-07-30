const telegramApiRequest = require('../../lib/telegramApiRequest');

function deleteMessage(chatId, messageId) {
  const params = { chat_id: chatId, message_id: messageId };
  return telegramApiRequest('deleteMessage', params)
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error(error);
      throw error;
    });
}

module.exports = deleteMessage;
