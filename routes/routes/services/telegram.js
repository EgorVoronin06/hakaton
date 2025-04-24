const TelegramBot = require('node-telegram-bot-api');
const bot = new TelegramBot(process.env.TELEGRAM_TOKEN);

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Введите ваш код привязки:");
});

// Привязка аккаунта
bot.on('message', async (msg) => {
  const code = msg.text;
  const user = await User.findOne({ telegramCode: code });
  
  if (user) {
    user.telegramChatId = msg.chat.id;
    await user.save();
    bot.sendMessage(msg.chat.id, "Аккаунт успешно привязан!");
  }
});
