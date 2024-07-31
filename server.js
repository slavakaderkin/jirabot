const http = require('http');
const Tg = require('./handlers/api');
const { SERVER_PORT } = require('./config');
const handleRequest = require('./router');

const handleStart = require('./handlers/startHandler');
const handleMessage = require('./handlers/messageHandler');
const telegramApiRequest = require('./lib/telegramApiRequest');
const TIMEOUT = 1000;

async function handleUpdate(update) {
  if (update.message) {
    if (update.message.text === '/start') {
      handleStart(update.message);
    } else {
      await handleMessage(update.message);
    }
  } else if (update?.callback_query) {
    const text = update?.callback_query?.data;
    const message = { ...update?.callback_query?.message, text };
    await handleMessage(message);
    await Tg.deleteMessage(message?.chat?.id, message?.message_id);
  } else if (update.messages && Array.isArray(update.messages)) {
    for (const message of update.messages) {
      if (message.text === '/start') {
        handleStart(message);
      } else {
        await handleMessage(message);
      }
    }
  }
}

async function getUpdates(offset) {
  const params = { timeout: TIMEOUT, offset };
  try {
    const updates = await telegramApiRequest('getUpdates', params);
    console.log("getUpdates ~ updates:", updates);
    if (updates?.result?.length > 0) {
      updates.result.forEach(update => {
        handleUpdate(update);
      });
      const newOffset = updates.result[updates.result?.length - 1].update_id + 1;
      await getUpdates(newOffset);
    } else {
      await getUpdates(offset);
    };
  } catch (error) {
    console.error("getUpdates ~ error:", error);
    await getUpdates(offset);
  }
}

class Server {
  async start(options = {}) {
    const server = http.createServer(options, handleRequest);

    server.listen(SERVER_PORT, async () => {
      console.log(`Server is listening on port ${SERVER_PORT}`);
    });

    const response = await Tg.deleteWebhook();
    if (response && response.ok) {
      console.log('Webhook was deleted successfully');
      getUpdates(0);
    } else {
      console.error('Error deleting webhook:', response);
    }

    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
    });
  }
}

module.exports = new Server();
