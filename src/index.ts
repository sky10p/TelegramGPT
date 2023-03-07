import { Markup, Scenes, session, Telegraf } from "telegraf";
import { message } from "telegraf/filters";

import { TELEGRAM_CONFIG } from "./config/telegram.config";

import { getDailyUsage, getMonthlyUsage } from "./lib/chatgpt/usage";
import { GuardMiddleware } from "./lib/telegram/middlewares";
import { MyContext } from "./lib/telegram/models";
import { STAGE, stage } from "./lib/telegram/scenes";
import { helpMessage } from "./lib/telegram/staticMessages/help.message";


const bot = new Telegraf<MyContext>(TELEGRAM_CONFIG.KEY);

bot.start((ctx) =>
  ctx.reply("Este es un bot de Telegram usando la tecnología ChatGPT.")
);
bot.help((ctx) => {
  ctx.chat.id;
  ctx.reply(helpMessage);
});

bot.use(session());
bot.use(stage.middleware());


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

bot.command("generation_image", GuardMiddleware, async (ctx) => {
    ctx.scene.enter(STAGE.generationImage)
});

bot.command("chat", (ctx)=>{
  ctx.scene.enter(STAGE.chat)
})

bot.command("cancel", async (ctx) => {
    ctx.reply(
        `No estás en ningún proceso que se pueda cancelar.`, Markup.removeKeyboard()
      );
})

bot.on(message("text"), async (ctx) => {
  
  ctx.reply("Elige una de las acciones disponibles, si tienes dudas utiliza el comando /help😇");
});

bot.launch();

console.log("Working bot.");
