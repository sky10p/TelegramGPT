import { __ } from "../../../lib/i18n/i18n";
import { Markup, Scenes } from "telegraf";
import { message } from "telegraf/filters";
import { getChatGptAnswser, sendMessages } from "../../chatgpt/chat";
import { ChatGptMessage } from "../../chatgpt/models";
import { telegramGptRole } from "../../chatgpt/roles/telegramGptRole";
import { createStack } from "../../utils/stack";
import { GuardMiddleware } from "../middlewares";
import { MyContext } from "../models";


export const chatScene = new Scenes.BaseScene<MyContext>(
  "chat"
);
chatScene.enter((ctx) => {
  ctx.session.messages = createStack<ChatGptMessage>(4);
  ctx.reply(__`Comencemos a hablar😉`)
})

chatScene.command("cancel", (ctx) => {
  ctx.reply(
    __`Hasta la próxima😊`,
    Markup.removeKeyboard()
  );
  ctx.scene.leave();
});

chatScene.on(message("text"), GuardMiddleware, async (ctx) => {
  try {
    const text = ctx.message?.text;
    const messages = ctx.session.messages;
    messages.push({ role: "user", content: text });
    await ctx.telegram.sendChatAction(ctx.chat.id, 'typing')
    const responseChatGpt = await sendMessages({
      messages: messages.getElements(),
      role: telegramGptRole
    });
    console.log(responseChatGpt);
    messages.push(responseChatGpt.choices[0].message);
    const answer = getChatGptAnswser(responseChatGpt);
    ctx.reply(answer, {
      parse_mode: answer.includes("```") ? "Markdown" : undefined,
    });
  } catch (error) {
    ctx.reply(__`Ha habido un error enviando el mensaje a Open AI`)
  }
});


