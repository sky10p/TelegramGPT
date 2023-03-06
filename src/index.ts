import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";

import { TELEGRAM_CONFIG } from "./config/telegram.config";
import {
  getChatGptAnswser,
  sendMessages as sendChatGptMessages,
} from "./lib/chatgpt/chat";
import { ChatGptMessage } from "./lib/chatgpt/models";
import { getDailyUsage, getMonthlyUsage } from "./lib/chatgpt/usage";
import { GuardMiddleware } from "./lib/telegram/middlewares";
import { createStack } from "./lib/utils/stack";

const messages = createStack<ChatGptMessage>(4);

const bot = new Telegraf(TELEGRAM_CONFIG.KEY);

bot.start((ctx) =>
  ctx.reply("Este es un bot de Telegram usando la tecnología ChatGPT.")
);
bot.help((ctx) => {
  ctx.chat.id;
  ctx.reply("Simplemente habla conmigo y verás de lo que soy capaz.😋");
});




bot.command("usage_day", GuardMiddleware, async (ctx) => {
  const dailyUsage = await getDailyUsage();
  ctx.reply(
    `Hoy has usado ${dailyUsage.tokens} tokens y has generado ${dailyUsage.numImages} imágenes con un precio de ${dailyUsage.price} $`
  );
});

bot.command("usage_month", GuardMiddleware, async (ctx) => {
  const monthlyUsage = await getMonthlyUsage();
  ctx.reply(
    `Este mes has usado ${monthlyUsage.tokens} tokens y has generado ${monthlyUsage.numImages} imágenes con un precio de ${monthlyUsage.price} $`
  );
});

bot.on(message("text"), GuardMiddleware, async (ctx) => {
  const text = ctx.message?.text;
  messages.push({ role: "user", content: text });
  const responseChatGpt = await sendChatGptMessages({
    messages: messages.getElements(),
  });
  console.log(responseChatGpt);
  messages.push(responseChatGpt.choices[0].message);
  const answer = getChatGptAnswser(responseChatGpt);
  ctx.reply(answer, {
    parse_mode: answer.includes("```") ? "Markdown" : undefined,
  });
});

bot.launch();

console.log("Working bot.");
