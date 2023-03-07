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
    ctx.scene.session.messages = createStack<ChatGptMessage>(4);
    ctx.reply("Comencemos a hablar😉")
})

chatScene.on(message("text"), GuardMiddleware, async (ctx) => {
    const text = ctx.message?.text;
    const messages = ctx.scene.session.messages;
    messages.push({ role: "user", content: text });
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
  });

  chatScene.command("cancel", (ctx) => {
    ctx.reply(
      "Hasta la próxima😊",
      Markup.removeKeyboard()
    );
    ctx.scene.leave();
  });
