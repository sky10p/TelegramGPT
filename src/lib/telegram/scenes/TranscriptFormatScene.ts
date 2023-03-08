import { transcriptAudio, TranscriptAudioResult } from "../../../lib/chatgpt/whisper";
import { Markup, Scenes } from "telegraf";
import { message } from "telegraf/filters";
import { GuardMiddleware } from "../middlewares";
import { MyContext } from "../models";
import { MAX_RESPONSE_TEXT_LENGTH } from "../constants";



export const transcriptFormatScene = new Scenes.BaseScene<MyContext>(
  "transcriptFormat"
);
const OPTIONS_SIZE = Markup.inlineKeyboard([
    Markup.button.callback("Text", "text"),
    Markup.button.callback("JSON", "verbose_json"),
    Markup.button.callback("srt", "srt"),
    Markup.button.callback("vtt", "vtt"),
  ]);

  
  transcriptFormatScene.enter((ctx) => {
    ctx.reply(`Inserta el formato de resultado:`, OPTIONS_SIZE);
  });


  transcriptFormatScene.action(/text|verbose_json|srt|vtt/, GuardMiddleware, async (ctx) => {
    const fileUrl = ctx.session.transcriptUrl;
    const audioResultFormat: TranscriptAudioResult = (ctx?.match?.[0] ?? 'text') as TranscriptAudioResult;
    console.log(`transcript ${fileUrl}`);
    await ctx.reply("Transcription is processing...")
    const transcription = await transcriptAudio({transcriptUrl: fileUrl, transcriptAudioResult: audioResultFormat});
    if(transcription.length < MAX_RESPONSE_TEXT_LENGTH){
       await ctx.reply(transcription);
    }else{
        const buffer = Buffer.from(transcription);
        await ctx.replyWithDocument({source: buffer, filename: 'transcription.txt'})
        
    }

    ctx.scene.leave();
  });


  transcriptFormatScene.command("cancel", (ctx) => {
    ctx.reply(
      "Has cancelado la operación",
      Markup.removeKeyboard()
    );
    ctx.scene.leave();
  });
