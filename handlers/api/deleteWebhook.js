const telegramApiRequest = require('../../lib/telegramApiRequest');

function deleteWebhook() {
  return telegramApiRequest('deleteWebhook', {});
}

module.exports = deleteWebhook;
