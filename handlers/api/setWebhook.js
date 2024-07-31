const telegramApiRequest = require('../../lib/telegramApiRequest');

function setWebhook(url) {
  console.log("🚀 ~ setWebhook ~ url:", url)
  const params = { url, allowed_updates: ['message', 'callback_query'] };
  return telegramApiRequest('setWebhook', params);
}

module.exports = setWebhook;
