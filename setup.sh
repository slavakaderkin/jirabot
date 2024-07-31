docker build -t jirabot .
docker run -d -p 3000:3000 -p 8443:8443 --name server \
  -e TELEGRAM_TOKEN=6366573468:AAGTgVseePeDdkxULsNksIow3fULFIXfgfc \
  -e JIRA_BASE_URL=slavakaderkin.atlassian.net \
  -e JIRA_USERNAME=slavakaderkin@gmail.com \
  -e JIRA_API_TOKEN=ATATT3xFfGF0klSO2AGCDdOvyP9xop5dc0jhsbldXJ6Kg4zPS2vSCOCE8qo0Jhf8p8tus2HqUPjGnZUW0zX5NegJTJVeNlPZ5zcAwPkK2KCsBK_hmTOQC9LAVp43p4-O2sv-ICLKphIsdDnAPY31QVuVnXuT85ZbcKSpu--93OIz2Wct2CbqeBM=83752392 \
  jirabot
