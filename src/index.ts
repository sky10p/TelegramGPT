import { Telegraf } from "telegraf";
import { message } from 'telegraf/filters';

import { TELEGRAM_CONFIG } from "./config/telegram.config";
import { getChatGptAnswser, getDailyUsage, sendMessages as sendChatGptMessages } from "./lib/chatgpt/chatgpt";
import { ChatGptMessage } from "./lib/chatgpt/models";
import { createStack } from "./lib/utils/stack";

const messages = createStack<ChatGptMessage>(4);

const bot = new Telegraf(TELEGRAM_CONFIG.KEY);

bot.start((ctx) => ctx.reply("Este es un bot de Telegram usando la tecnología ChatGPT."))
bot.help((ctx) => {
    ctx.chat.id
    ctx.reply("Simplemente habla conmigo y verás de lo que soy capaz.😋")
});

bot.command('usage_day', async (ctx) => {
    const dailyUsage = await getDailyUsage();
    ctx.reply(`Hoy has usado ${dailyUsage.tokens} tokens, con un precio de ${dailyUsage.price}`)
})

bot.on(message('text'), async (ctx )=> {
    const userId = ctx.from.id;
    if(userId == 83730624){
        const text = ctx.message?.text;
        messages.push({role: 'user', content: text});
        const responseChatGpt = await sendChatGptMessages({messages: messages.getElements()});
        console.log(responseChatGpt)
        messages.push(responseChatGpt.choices[0].message)
        const answer = getChatGptAnswser(responseChatGpt);
        ctx.reply(answer, {parse_mode: answer.includes('```') ? "Markdown" : undefined});
    }else{
        ctx.reply("No tienes acceso, pregunta al administrador.")
    }
    
});

bot.launch();

console.log("Working bot.")