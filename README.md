# Деплой и запуск

## Настройка окружения
* `sh env.sh`

## Загрузка кода
* `git clone https://github.com/slavakaderkin/jirabot.git`,

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

## Запуск
* `sh setup.sh`

