const fs = require('fs');
const path = require('path');
const handleStart = require('./handlers/startHandler');
const handleMessage = require('./handlers/messageHandler');
const Tg = require('./handlers/api')

async function handleRequest(req, res) {
  if (req.method === 'POST' && req.url.startsWith(`/webhook/`)) {
    let body = '';

    req.on('data', chunk => body += chunk);
    req.on('end', async () => {
      const update = JSON.parse(body);

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

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'ok' }));
    });
  } else if (req.method === 'GET' && req.url.startsWith(`/assets/`)) {
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'File Not Found' }));
      } else {
        res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
        res.end(data);
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
}

module.exports = handleRequest;
