const https = require('https');
const { TELEGRAM_TOKEN } = require('../../config');

function getFile(fileId) {
  const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${TELEGRAM_TOKEN}/getFile?file_id=${fileId}`,
    method: 'GET'
  };

  return new Promise((resolve, reject) => {
    https.get(options, res => {
      let data = '';
      
      res.on('data', chunk => data += chunk);
      
      res.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          if (parsedData.ok) {
            resolve(parsedData.result);
          } else {
            reject(new Error(`Telegram API error: ${parsedData.description}`));
          }
        } catch (error) {
          reject(new Error(`Failed to parse response JSON: ${error.message}`));
        }
      });
    }).on('error', error => {
      reject(new Error(`Request error: ${error.message}`));
    });
  });
}

module.exports = getFile;
