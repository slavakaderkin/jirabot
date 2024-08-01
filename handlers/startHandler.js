const Tg = require('./api');

function handleStart(message, userStates) {
  const chatId = message.chat.id;
  delete userStates[chatId];
  Tg.sendMessage(chatId, 'Привет! Перешлите мне сообщения для обработки.');
}

module.exports = handleStart;
