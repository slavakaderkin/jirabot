const https = require('https');
const { JIRA_BASE_URL, JIRA_USERNAME, JIRA_API_TOKEN } = require('../config');
const users = require('../users');
const Tg = require('../handlers/api');

function jiraApiRequest(path, method, data, user) {
  const username = users[user?.id];

  if (!username) {
    Tg.sendMessage(user.id, 'Пользователь не найден в JIRA.');
    return;
  }

  const options = {
    hostname: JIRA_BASE_URL,
    port: 443,
    path,
    method,
    headers: {
      'Authorization': `Basic ${Buffer.from(
        `${JIRA_USERNAME}:${JIRA_API_TOKEN}` // username
      ).toString('base64')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(data ? { 'Content-Length': Buffer.byteLength(JSON.stringify(data)) } : {})
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(JSON.parse(responseData));
          } else {
            reject(new Error(`Request failed with status code ${res.statusCode}: ${responseData}`));
          }
           
        } catch (error) {
          reject(new Error(`Failed to parse response JSON: ${error.message}`));
        }
      });
    });

    req.on('error', (error) => {
      console.error(`Request error: ${error.message}`);
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

module.exports = jiraApiRequest;
