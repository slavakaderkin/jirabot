const jiraApiRequest = require('../lib/jiraApiRequest');

function getIssue(issueId, user) {
  const path = `/rest/api/2/issue/${issueId}`;
  return jiraApiRequest(path, 'GET', null, user);
}

module.exports = getIssue;
