# Деплой и запуск

## Настройка окружения
* `sh env.sh`
* Положите сертификат в директорию `cert`
Откройте доступ к сертификатам в файле  `bot.js`. Замените модуль на `https` `const http = require('https');` в файле `server.js`.

## Переменные окружения и пользователи
Добавьте в скрипт `setup.sh` свои API ключи, а также свяжите пользователей `users.js` Jira с Telegram id
```
-e TELEGRAM_TOKEN=your_token \
  -e JIRA_BASE_URL=jira_url \
  -e JIRA_USERNAME=jira_username \
  -e JIRA_API_TOKEN=jira_token \
```

```
{
  1795394319: 'slavakaderkin@gmail.com',
};
```
Добавьте в конфиг домен до сервера и путь до хука (домен + `/webhook`). Домен должен быть с `https`.

## Запуск
* `sh setup.sh`

