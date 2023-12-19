const express = require('express');
require('dotenv').config()
const TelegramBot = require('node-telegram-bot-api');

// Inisialisasi bot Telegram
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// This informs the Telegram servers of the new webhook.
bot.setWebHook(process.env.GITHUB_WEBHOOK_URL)

const app = express();
const port = 3000;

app.use(express.json());

app.post('/github-webhook', (req, res) => {
  const { body } = req;

  bot.processUpdate(body)

  bot.sendMessage(process.env.TELEGRAM_CHAT_ID, '[UPDATE] ' + body.commits[0].message + ' 🚀 \nurl: ' + body.commits[0].url);
  res.status(200).send('Webhook received successfully.');
});

bot.onText(/\/version/, async(msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Bot Version 1.0');
});


app.listen(port, () => {
  console.log(`Server listening at ${port}`);
});


