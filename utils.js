const fs = require('fs');
const path = require('path');
const https = require('https');
const { TELEGRAM_TOKEN } = require('./config');

function processMessage(file) {
  return new Promise((resolve, reject) => {
    const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_TOKEN}/${file.file_path}`;
    const fileName = path.basename(file.file_path);
    const dest = fs.createWriteStream(`assets/${fileName}`);

    https.get(fileUrl, res => {
      res.pipe(dest);
      
      dest.on('finish', () => {
        dest.close(() => resolve(fileName));
      });

      dest.on('error', (err) => {
        fs.unlink(fileName, () => reject(err));
      });
    }).on('error', (err) => {
      fs.unlink(fileName, () => reject(err));
    });
  });
}

module.exports = {
  processMessage
};
