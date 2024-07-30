const jiraApiRequest = require('../lib/jiraApiRequest');

async function getUser(accountId, user) {
  const path = `/rest/api/2/user?accountId=${accountId}`;
  return jiraApiRequest(path, 'GET', null, user);
}

module.exports = getUser;
