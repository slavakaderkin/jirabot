const http = require('https'); // change to https
const Tg = require('./handlers/api');
const { WEBHOOK_URL, SERVER_PORT } = require('./config');
const handleRequest = require('./router');

class Server {
  async start(options = {}) {
    const server = http.createServer(options, handleRequest);

    server.listen(SERVER_PORT, async () => {
      console.log(`Server is listening on port ${SERVER_PORT}`);
      try {
        const response = await Tg.setWebhook(WEBHOOK_URL);
        console.log("🚀 ~ Server ~ server.listen ~ response:", response)
        if (response && response.ok) {
          console.log('Webhook was set successfully');
        } else {
          console.error('Error setting webhook:', response);
        }
      } catch (error) {
        console.error('Error setting webhook:', error);
      }
    });

    async function cleanup() {
      console.log('Cleaning up...');
      try {
        const response = await Tg.deleteWebhook();
        console.log("🚀 ~ Server ~ cleanup ~ response:", response)
        if (response && response.ok) {
          console.log('Webhook was deleted successfully');
        } else {
          console.error('Error deleting webhook:', response);
        }
      } catch (error) {
        console.error('Error deleting webhook:', error);
      }
      process.exit(0);
    }

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    process.on('uncaughtException', (err) => {
      console.error('Uncaught Exception:', err);
      cleanup();
    });
  }
}

module.exports = new Server();
