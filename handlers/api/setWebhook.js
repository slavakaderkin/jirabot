const telegramApiRequest = require('../../lib/telegramApiRequest');

function setWebhook(url) {
  const params = { url, allowed_updates: ['message', 'callback_query'] };
  return telegramApiRequest('setWebhook', params);
}

module.exports = setWebhook;
