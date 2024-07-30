const jiraApiRequest = require('../lib/jiraApiRequest');

function addComment(issueId, comment, accountId, user) {
  const path = `/rest/api/2/issue/${issueId}/comment`;
  const data = { body: comment };
  return jiraApiRequest(path, 'POST', data, user);
}

module.exports = addComment;
