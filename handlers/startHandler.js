const Tg = require('./api');

function handleStart(message) {
  const chatId = message.chat.id;
  Tg.sendMessage(chatId, 'Привет! Перешлите мне сообщения для обработки.');
}

module.exports = handleStart;
