import { Markup, Scenes } from "telegraf";
import { message } from "telegraf/filters";
import { MyContext } from "../models";

export const generationImageScene = new Scenes.BaseScene<MyContext>(
  "generationImage"
);

const OPTIONS_SIZE = Markup.inlineKeyboard([
  Markup.button.callback("1024x1024", "1024x1024"),
  Markup.button.callback("512x512", "512x512"),
  Markup.button.callback("256x256", "256x256"),
]);

generationImageScene.enter((ctx) => {
  ctx.replyWithMarkdownV2(
    "Elige el tamaño de imagen que se va a generar",
    OPTIONS_SIZE
  );
});

generationImageScene.action("1024x1024", (ctx) => {
  ctx.scene.session.imageSize = "1024x1024";
  ctx.reply("Has elegido la opción de 1024x1024", Markup.removeKeyboard());
  ctx.scene.enter("insertPromptImage")
});

generationImageScene.action("512x512", (ctx) => {
  ctx.scene.session.imageSize = "512x512";
  ctx.reply("Has elegido la opción de 512x512", Markup.removeKeyboard());
  ctx.scene.enter("insertPromptImage")
});

generationImageScene.action("256x256", (ctx) => {
  ctx.scene.session.imageSize = "256x256";
  ctx.reply("Has elegido la opción de 256x256", Markup.removeKeyboard());
  ctx.scene.enter("insertPromptImage")
});

generationImageScene.command("cancel", (ctx) => {
  
  ctx.reply("Has cancelado la generación, no gastarás nada.", Markup.removeKeyboard());
  ctx.scene.leave();
});

generationImageScene.on(message("text"), async (ctx) => {
  ctx.replyWithMarkdownV2(
    "Por favor, elige uno de los tamaños válidos",
    OPTIONS_SIZE
  );
});
