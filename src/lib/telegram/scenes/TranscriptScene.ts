import { ALLOWED_EXTENSIONS } from "../../../lib/chatgpt/whisper";
import { Markup, Scenes } from "telegraf";
import { message } from "telegraf/filters";
import { GuardMiddleware } from "../middlewares";
import { MyContext } from "../models";

export const transcriptScene = new Scenes.BaseScene<MyContext>(
  "transcript"
);
transcriptScene.enter((ctx) => {
    ctx.reply(`Envía un audio o video`)
})

transcriptScene.on(message("audio"), GuardMiddleware, async (ctx) => {
    const audio = ctx.message?.audio;
    const file = await ctx.telegram.getFileLink(audio.file_id);
    const fileUrl = file.href;
    if(ALLOWED_EXTENSIONS.some((ext) => fileUrl.includes(ext))){
      ctx.session.transcriptUrl = fileUrl;
      ctx.scene.enter("transcriptFormat");
    }else{
      ctx.reply(`Solo se permiten los siguientes formatos de audio o video (m4a, mp3, mp4, mpeg, mpga, wav, webm)`)
      ctx.scene.leave();
    }

  });

  transcriptScene.on(message("voice"), GuardMiddleware, async (ctx) => {
    const voice = ctx.message?.voice;
    const file = await ctx.telegram.getFileLink(voice.file_id);
    const fileUrl = file.href;
    if(ALLOWED_EXTENSIONS.some((ext) => fileUrl.includes(ext))){
      ctx.session.transcriptUrl = fileUrl;
      ctx.scene.enter("transcriptFormat");
    }else{
      ctx.reply(`Solo se permiten los siguientes formatos de audio o video (m4a, mp3, mp4, mpeg, mpga, wav, webm)`)
      ctx.scene.leave();
    }

  });

  transcriptScene.on(message("video"), GuardMiddleware, async (ctx) => {
    const video = ctx.message?.video;
    const file = await ctx.telegram.getFileLink(video.file_id);
    const fileUrl = file.href;
    if(ALLOWED_EXTENSIONS.some((ext) => fileUrl.includes(ext))){
      ctx.session.transcriptUrl = fileUrl;
      ctx.scene.enter("transcriptFormat");
    }else{
      ctx.reply(`Solo se permiten los siguientes formatos de audio o video (m4a, mp3, mp4, mpeg, mpga, wav, webm)`)
      ctx.scene.leave();
    }

  });

  transcriptScene.command("cancel", (ctx) => {
    ctx.reply(
      "Has cancelado la operación",
      Markup.removeKeyboard()
    );
    ctx.scene.leave();
  });
