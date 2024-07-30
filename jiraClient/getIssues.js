const jiraApiRequest = require('../lib/jiraApiRequest');

function getAllIssues(jql = '', startAt = 0, maxResults = 50, fields = ['summary', 'status', 'assignee', 'priority'], user) {
  const path = `/rest/api/2/search`;
  const data = {
    jql,
    startAt,
    maxResults,
    fields
  };

  return jiraApiRequest(path, 'POST', data, user);
}

module.exports = getAllIssues;
