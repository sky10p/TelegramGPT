import { TELEGRAM_CONFIG } from "../../config/telegram.config";
import { getDailyUsage, getMonthlyUsage } from "../../lib/chatgpt/usage";
import { Telegraf, session, Markup } from "telegraf";
import { message } from "telegraf/filters";
import { GuardMiddleware } from "./middlewares";
import { MyContext } from "./models";
import { stage, STAGE } from "./scenes";
import { helpMessage } from "./staticMessages/help.message";
import { __ } from "../../lib/i18n/i18n";

export const telegramGptBot = new Telegraf<MyContext>(TELEGRAM_CONFIG.KEY);

telegramGptBot.start((ctx) =>
  ctx.reply(__`Este es un bot de Telegram usando la tecnología ChatGPT.`)
);
telegramGptBot.help((ctx) => {
  ctx.chat.id;
  ctx.reply(helpMessage);
});
telegramGptBot.use(session());

telegramGptBot.use(stage.middleware());


telegramGptBot.command("usage_day", GuardMiddleware, async (ctx) => {
  const dailyUsage = await getDailyUsage();
  ctx.reply(
    __`Hoy has usado ${dailyUsage.tokens} tokens y has generado ${dailyUsage.numImages} imágenes con un precio de ${dailyUsage.price} $`
  );
});

telegramGptBot.command("usage_month", GuardMiddleware, async (ctx) => {
  const monthlyUsage = await getMonthlyUsage();
  ctx.reply(
    __`Este mes has usado ${monthlyUsage.tokens} tokens y has generado ${monthlyUsage.numImages} imágenes con un precio de ${monthlyUsage.price} $`
  );
});

telegramGptBot.command("generation_image", GuardMiddleware, async (ctx) => {
    ctx.scene.enter(STAGE.generationImage)
});

telegramGptBot.command("chat", (ctx)=>{
  ctx.scene.enter(STAGE.chat)
})

telegramGptBot.command("transcript", (ctx)=>{
  ctx.scene.enter(STAGE.transcript)
})

telegramGptBot.command("summarize", (ctx)=>{
  ctx.session.chatAction= 'summarize'
  ctx.scene.enter(STAGE.askLanguage)
})

telegramGptBot.command("key_points", (ctx)=>{
  ctx.session.chatAction= 'key_points'

  ctx.scene.enter(STAGE.askLanguage)
})

telegramGptBot.command("improve", (ctx)=>{
  ctx.session.chatAction= 'improve'

  ctx.scene.enter(STAGE.askLanguage)
})

telegramGptBot.command("cancel", async (ctx) => {
    ctx.reply(
        __`No estás en ningún proceso que se pueda cancelar.`, Markup.removeKeyboard()
      );
})

telegramGptBot.on(message("text"), async (ctx) => {
  
  ctx.reply(__`Elige una de las acciones disponibles, si tienes dudas utiliza el comando /help😇`);
});