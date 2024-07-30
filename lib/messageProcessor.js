const Tg = require('../handlers/api');
const { processMessage } = require('../utils');
const { WEB_URL } = require('../config');

async function processForwardedMessages(forwardedMessages) {
  let comment = '';

  const filePromises = forwardedMessages.map(async (msg) => {
    if (msg.text) {
      comment += `${msg.text}\n`;
    } else if (msg.photo) {
      const fileId = msg.photo[msg.photo.length - 1].file_id;
      console.log(`Fetching photo file ${fileId}`);
      const file = await Tg.getFile(fileId);
      const fileName = await processMessage(file);
      if (msg?.caption) comment += `${msg.caption}\n`;
      comment += `!${WEB_URL}/assets/${fileName}!\n`;
    } else if (msg.document) {
      const fileId = msg.document.file_id;
      console.log(`Fetching document file ${fileId}`);
      const file = await Tg.getFile(fileId);
      const fileName = await processMessage(file);
      if (msg?.caption) comment += `${msg.caption}\n`;
      comment += `!${WEB_URL}/assets/${fileName}!\n`;
    }
  });

  await Promise.all(filePromises);
  return comment;
}

module.exports = {
  processForwardedMessages
};
