import { Markup, Scenes, session } from "telegraf";
import { STAGE } from ".";
import { GuardMiddleware } from "../middlewares";
import { MyContext } from "../models";

export const askLanguageScene = new Scenes.BaseScene<MyContext>("askLanguage");

const OPTIONS_SIZE = Markup.inlineKeyboard([
  Markup.button.callback("Español", "Español"),
  Markup.button.callback("Inglés", "Inglés"),
]);
askLanguageScene.enter((ctx) => {
  ctx.reply(`Inserta el idioma:`, OPTIONS_SIZE);
});

askLanguageScene.action(/.*/, GuardMiddleware, (ctx) => {
  const text = ctx.match[0];
  if (["Español", "Inglés"].includes(text)) {
    ctx.session.language = text;
    ctx.scene.enter(STAGE.askPrompt);
  } else {
    ctx.reply("Inserta un idioma correcto");
  }
});

askLanguageScene.command("cancel", (ctx) => {
  ctx.reply("Has cancelado la operación", Markup.removeKeyboard());
  ctx.scene.leave();
});
