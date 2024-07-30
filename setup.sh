docker build -t jirabot .
docker run -d -p 3000:3000 --name server \
  -e TELEGRAM_TOKEN=your_token \
  -e JIRA_BASE_URL=jira_url \
  -e JIRA_USERNAME=jira_username \
  -e JIRA_API_TOKEN=jira_token \
  jirabot
