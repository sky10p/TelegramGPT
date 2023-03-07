import { Markup, Scenes } from "telegraf";
import { message } from "telegraf/filters";
import { STAGE } from ".";
import { MyContext } from "../models";

export const generationImageScene = new Scenes.BaseScene<MyContext>(
  "generationImage"
);

const OPTIONS_SIZE = Markup.inlineKeyboard([
  [Markup.button.callback("1024x1024(0.02$)", "1024x1024")],
  [Markup.button.callback("512x512(0.018$)", "512x512")],
  [Markup.button.callback("256x256(0.016$)", "256x256")],
]);

generationImageScene.enter((ctx) => {
  ctx.replyWithMarkdownV2(
    "Elige el tamaño de imagen que se va a generar",
    OPTIONS_SIZE
  );
});

generationImageScene.action("1024x1024", async (ctx) => {
  ctx.session.imageSize = "1024x1024";
  await ctx.reply(
    "Has elegido la opción de 1024x1024",
    Markup.removeKeyboard()
  );
  ctx.scene.enter(STAGE.insertPromptImage);
});

generationImageScene.action("512x512", async (ctx) => {
  ctx.session.imageSize = "512x512";
  await ctx.reply("Has elegido la opción de 512x512", Markup.removeKeyboard());
  ctx.scene.enter(STAGE.insertPromptImage);
});

generationImageScene.action("256x256", async (ctx) => {
  ctx.session.imageSize = "256x256";
  await ctx.reply("Has elegido la opción de 256x256", Markup.removeKeyboard());
  ctx.scene.enter(STAGE.insertPromptImage);
});

generationImageScene.command("cancel", (ctx) => {
  ctx.reply(
    "Has cancelado la generación, no gastarás nada.",
    Markup.removeKeyboard()
  );
  ctx.scene.leave();
});

generationImageScene.on(message("text"), async (ctx) => {
  ctx.replyWithMarkdownV2(
    "Por favor, elige uno de los tamaños válidos",
    OPTIONS_SIZE
  );
});
