import { Markup, Scenes } from "telegraf";
import { message } from "telegraf/filters";
import { generationImage, getUrlImage } from "../../chatgpt/generation";
import { MyContext } from "../models";



export const insertPromptImageScene = new Scenes.BaseScene<MyContext>('insertPromptImage');

insertPromptImageScene.enter((ctx) => {
    ctx.reply("Describe un prompt para generar tu imagen")
});


insertPromptImageScene.command("cancel", (ctx) => {
    ctx.reply("Has cancelado la generación, no gastarás nada.", Markup.removeKeyboard());
    ctx.scene.leave();
})

insertPromptImageScene.on(message("text"), async (ctx) => {
    const prompt = ctx.message?.text;
    const imageSize = ctx.scene.session.imageSize;
    const imageResponse = await generationImage({prompt, imageSize});
    const url = getUrlImage(imageResponse);
    ctx.replyWithPhoto(url, {caption: prompt});
    ctx.scene.leave()
  });