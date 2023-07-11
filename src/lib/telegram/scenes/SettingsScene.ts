import { __ } from "@easy-i18n/core";
import { Markup, Scenes } from "telegraf";
import { GuardMiddleware } from "../middlewares";
import { MyContext } from "../models";
import { ChatGptModelEnum } from "../../../lib/chatgpt/models";
import { setModel } from "../../chatgpt/settings";

export const settingsScene = new Scenes.BaseScene<MyContext>("settings");

const OPTIONS_SIZE = Markup.inlineKeyboard([
  Markup.button.callback(__`gpt3`, ChatGptModelEnum.GPT_3),
  Markup.button.callback(__`gpt4`, ChatGptModelEnum.GPT_4),
]);
settingsScene.enter((ctx) => {
  ctx.reply(__`Elige el modelo gpt:`, OPTIONS_SIZE);
});

settingsScene.action(/.*/, GuardMiddleware, async (ctx) => {
  const text = ctx.match[0];
  if ([ChatGptModelEnum.GPT_3.toString(), ChatGptModelEnum.GPT_4.toString()].includes(text)) {
    await setModel(text as ChatGptModelEnum);
    await ctx.reply(__`Modelo gpt cambiado a ${text}`);
  } else {
    ctx.reply(__`Inserta un modelo de gpt correcto`);
  }
});

settingsScene.command("cancel", (ctx) => {
  ctx.reply("Has cancelado la operación", Markup.removeKeyboard());
  ctx.scene.leave();
});
