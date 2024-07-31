module.exports = {
  TELEGRAM_TOKEN: process.env.TELEGRAM_TOKEN,
  JIRA_BASE_URL: process.env.JIRA_BASE_URL,
  JIRA_USERNAME: process.env.JIRA_USERNAME,
  JIRA_API_TOKEN: process.env.JIRA_API_TOKEN,
  WEBHOOK_URL: process.env.WEBHOOK_URL || 'https://muddy-glade-27725.pktriot.net/webhook/',
  WEB_URL: process.env.WEB_URL || 'https://muddy-glade-27725.pktriot.net',
  SERVER_PORT: 8443
};
