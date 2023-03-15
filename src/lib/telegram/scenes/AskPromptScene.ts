import { getChatGptAnswser, sendMessages } from "../../chatgpt/chat";
import { Markup, Scenes } from "telegraf";
import { message } from "telegraf/filters";
import { GuardMiddleware } from "../middlewares";
import { MyContext } from "../models";
import { chatRoles } from "../../../lib/chatgpt/roles/chatRoles";
import { __ } from "@easy-i18n/core";

export const askPromptScene = new Scenes.BaseScene<MyContext>(
  "askPrompt"
);
askPromptScene.enter((ctx) => {
    ctx.reply(__`Inserta el prompt:`)
})


askPromptScene.on(message("text"), GuardMiddleware, async (ctx) => {
    const text = ctx.message?.text;
    const chatAction = ctx.session.chatAction;
    const language = ctx.session.language;
    ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
    const responseChatGpt = await sendMessages({
      messages: [{role: 'user', content: text}],
      role: {role: 'system', content: chatRoles[chatAction](language)}
    })
    console.log(responseChatGpt);
    const answer = getChatGptAnswser(responseChatGpt);
    await ctx.reply(answer, {
      parse_mode: answer.includes("```") ? "Markdown" : undefined,
    });
    ctx.scene.leave();
  });

  askPromptScene.command("cancel", (ctx) => {
    ctx.reply(
      __`Has cancelado la operación`,
      Markup.removeKeyboard()
    );
    ctx.scene.leave();
  });
