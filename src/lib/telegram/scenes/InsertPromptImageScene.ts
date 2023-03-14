import { __ } from "@easy-i18n/core";
import { Markup, Scenes } from "telegraf";
import { message } from "telegraf/filters";
import { generationImage, getUrlImage } from "../../chatgpt/generation";
import { MyContext } from "../models";



export const insertPromptImageScene = new Scenes.BaseScene<MyContext>('insertPromptImage');

insertPromptImageScene.enter((ctx) => {
    ctx.reply(__`Describe un prompt para generar tu imagen`)
});


insertPromptImageScene.command("cancel", (ctx) => {
    ctx.reply(__`Has cancelado la generación, no gastarás nada.`, Markup.removeKeyboard());
    ctx.scene.leave();
})

insertPromptImageScene.on(message("text"), async (ctx) => {
    const prompt = ctx.message?.text;
    const imageSize = ctx.session.imageSize;
    ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
    const imageResponse = await generationImage({prompt, imageSize});
    const url = getUrlImage(imageResponse);
    ctx.replyWithPhoto(url, {caption: prompt});
    ctx.scene.leave()
  });