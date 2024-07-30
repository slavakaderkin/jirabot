const Jira = require('../jiraClient');
const Tg = require('./api');
const { processForwardedMessages } = require('../lib/messageProcessor');

let userStates = {};
const MESSAGE_WAIT_TIME = 1000; // 5 секунд

async function handleMessage(message) {
  const chatId = message.chat.id;
  const userId = message.chat.id;
  const user = message.chat;

  if (!userStates[userId]) {

    userStates[userId] = {
      forwardedMessages: [],
      state: '',
      timer: null
    };
  }

  clearTimeout(userStates[userId].timer);
  if (
    !userStates[userId].state
    && (message.text || message.caption || message.photo || message.document)
  ) {
      userStates[userId].forwardedMessages.push(message);
      userStates[userId].timer = setTimeout(() => {
        requestTaskNumber(userId, chatId, user);
      }, MESSAGE_WAIT_TIME);
  } else if (userStates[userId].state === 'awaiting_task_number' && /^[A-Z]+-\d+$/.test(message?.text || message?.caption)) {
    //console.log(`User ${userId} provided task number: ${message?.text || message?.caption}`);
    try {
      await processTaskNumber(message, userId, chatId, user);
    } catch (error) {
      console.error('Error processing task number:', error);
    }
  } else if (userStates[userId].state === 'awaiting_comment') {
    //console.log(`User ${userId} provided comment header: ${message?.text || message?.caption}`);
    try {
      await processComment(message, userId, chatId, user);
    } catch (error) {
      console.error('Error processing comment:', error);
    }
  } else {
    //console.log(`User ${userId} sent unknown command: ${message?.text || message?.caption}`);
    try {
      await Tg.sendMessage(chatId, 'Неизвестная команда. Попробуйте снова.');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }
}

async function processTaskNumber(message, userId, chatId, chat) {
  const issueId = message?.text || message?.caption;
  console.log(`Processing task number ${issueId} for user ${userId}`);

  try {
    const issue = await Jira.getIssue(issueId, chat);
    //console.log(`Issue ${issueId} found:`, issue);
    userStates[userId].issueId = issueId;
    userStates[userId].accountId = issue?.fields?.assignee?.accountId;
    userStates[userId].state = 'awaiting_comment';
    await Tg.sendMessage(chatId, 'Задача найдена. Пожалуйста, охарактеризуйте полученные сообщения.');
  } catch (error) {
    console.error(`Error fetching issue ${issueId}:`, error);
    await Tg.sendMessage(chatId, 'Задача не найдена. Попробуйте снова.');
  }
}

async function processComment(message, userId, chatId, chat) {
  const commentHeader = message.text || message.caption;
  const forwardedMessages = userStates[userId].forwardedMessages;
  //console.log(`Processing comment for user ${userId} with header: ${commentHeader}`);

  
  let comment = '';
  comment += `{panel:title=${commentHeader}}\n`;
  comment += await processForwardedMessages(forwardedMessages);
  comment += `\n{panel}`;

  try {
    const user = await Jira.getUser(userStates?.[userId]?.accountId, chat);
    if (!user) {
      throw new Error('Пользователь не найден в JIRA.');
    }

    await Jira.addComment(userStates[userId].issueId, comment, userStates?.[userId]?.accountId, chat);
    //console.log(`Comment added to issue ${userStates[userId].issueId}`);
    await Tg.sendMessage(chatId, 'Комментарий добавлен в задачу.');
    delete userStates[userId];
  } catch (error) {
    console.error(`Error adding comment to issue ${userStates[userId].issueId}:`, error);
    await Tg.sendMessage(chatId, 'Ошибка при добавлении комментария.');
    delete userStates[userId];
  }
}

async function requestTaskNumber(userId, chatId, chat) {
  userStates[userId].state = 'awaiting_task_number';
  const messages = userStates[userId].forwardedMessages;
  if (messages.length > 0) {
    //console.log(`Requesting task number from user ${userId}`);
    const issues = await Jira.getIssues(null, null, null, null, chat);
    const keyboard = issues?.issues ? JSON.stringify({ inline_keyboard: [issues?.issues.map(({ key }) => ({ text: key, callback_data: key }))] }) : '';
    Tg.sendMessage(chatId, 'Сообщения получены. Пожалуйста, введите номер задачи или выберите из доступных задач:', keyboard)
      .then(() => console.log('Task number request sent'))
      .catch((error) => {
        console.error('Error sending message:', error);
      });
  }
}

module.exports = handleMessage;
