import { TELEGRAM_CONFIG } from "../../config/telegram.config";
import { getDailyUsage, getMonthlyUsage } from "../../lib/chatgpt/usage";
import { Telegraf, session, Markup } from "telegraf";
import { message } from "telegraf/filters";
import { GuardMiddleware } from "./middlewares";
import { MyContext } from "./models";
import { stage, STAGE } from "./scenes";
import { __ } from "@easy-i18n/core";
import { sendGptMessage } from "./utils/sendGptMessage";
import { chatRoles } from "../../lib/chatgpt/roles/chatRoles";
import { DalleImageSize } from "../../lib/chatgpt/models";
import { generationImage } from "../../lib/chatgpt/generation";
import { getUrlImage } from "../../lib/chatgpt/generation";

export const telegramGptBot = new Telegraf<MyContext>(TELEGRAM_CONFIG.KEY);

telegramGptBot.start((ctx) =>
  ctx.reply(__`Este es un bot de Telegram usando la tecnología ChatGPT.`)
);
telegramGptBot.help((ctx) => {
  ctx.chat.id;
  ctx.reply(__`help_message`);
});
telegramGptBot.use(session());

telegramGptBot.use(stage.middleware());

telegramGptBot.command("usage_day", GuardMiddleware, async (ctx) => {
  ctx.telegram.sendChatAction(ctx.chat.id, "typing");
  const dailyUsage = await getDailyUsage();
  ctx.reply(
    __`Hoy has usado ${dailyUsage.tokens} tokens y has generado ${dailyUsage.numImages} imágenes con un precio de ${dailyUsage.price} $`
  );
});

telegramGptBot.command("usage_month", GuardMiddleware, async (ctx) => {
  ctx.telegram.sendChatAction(ctx.chat.id, "typing");
  const monthlyUsage = await getMonthlyUsage();
  ctx.reply(__`Este mes has gastado ${monthlyUsage} $`);
});

telegramGptBot.command("generation_image", GuardMiddleware, async (ctx) => {
  ctx.scene.enter(STAGE.generationImage);
});

telegramGptBot.command("chat", (ctx) => {
  ctx.scene.enter(STAGE.chat);
});

telegramGptBot.command("transcript", (ctx) => {
  ctx.scene.enter(STAGE.transcript);
});

telegramGptBot.command("summarize", (ctx) => {
  ctx.session.chatAction = "summarize";
  ctx.scene.enter(STAGE.askLanguage);
});

telegramGptBot.command("key_points", (ctx) => {
  ctx.session.chatAction = "key_points";

  ctx.scene.enter(STAGE.askLanguage);
});

telegramGptBot.command("improve", (ctx) => {
  ctx.session.chatAction = "improve";

  ctx.scene.enter(STAGE.askLanguage);
});

telegramGptBot.command("cancel", async (ctx) => {
  ctx.reply(
    __`No estás en ningún proceso que se pueda cancelar.`,
    Markup.removeKeyboard()
  );
});

telegramGptBot.on("inline_query", async (ctx) => {
  const query = ctx.inlineQuery.query;
  console.log(query);
  if (!query ?? query === "") {
    return [];
  }

  const replyMarkup = {
    inline_keyboard: [
      [
        {
          text: "Procesar",
          callback_data: "chat_gpt_process",
        },
      ],
    ],
  };

  return ctx.answerInlineQuery([
    {
      type: "article",
      id: "ask",
      title: `Ask something`,
      description: `Ask o chat something with chat GPT`,
      input_message_content: {
        message_text: `chat: ${query}...`,
      },
      reply_markup: replyMarkup,
    },
    {
      type: "article",
      id: "english",
      title: "English",
      description: "Improve and translate the text with chat GPT",
      input_message_content: {
        message_text: __`Improving and translating: ${query}`,
      },
      reply_markup: replyMarkup,
    },
    {
      type: "article",
      id: "spanish",
      title: "Spanish",
      description: "Improve and translate the text with chat GPT",
      input_message_content: {
        message_text: __`Improving and translating: ${query}`,
      },
      reply_markup: replyMarkup,
    },
    {
      type: "article",
      id: "image",
      title: "Generate image",
      description: "Generate an image with Dall-e",
      input_message_content: {
        message_text: __`Creating an image with Dall-e...`,
      },
      reply_markup: replyMarkup,
    },
  ]);
});

telegramGptBot.on("chosen_inline_result", GuardMiddleware, async (ctx) => {
  const { query, result_id, inline_message_id } = ctx.chosenInlineResult;

  switch (result_id) {
    case "ask":
      ctx.telegram.editMessageText(
        undefined,
        undefined,
        inline_message_id,
        await sendGptMessage({ message: query })
      );
      break;
    case "english":
      ctx.telegram.editMessageText(
        undefined,
        undefined,
        inline_message_id,
        await sendGptMessage({
          message: query,
          role: { role: "system", content: chatRoles["improve"]("Inglés") },
        })
      );

      break;
    case "spanish":
      ctx.telegram.editMessageText(
        undefined,
        undefined,
        inline_message_id,
        await sendGptMessage({
          message: query,
          role: { role: "system", content: chatRoles["improve"]("Español") },
        })
      );
      break;
    case "image":
      const imageSize: DalleImageSize = "1024x1024";
      const imageResponse = await generationImage({ prompt: query, imageSize });
      const url = getUrlImage(imageResponse);
      ctx.telegram.editMessageText(
        undefined,
        undefined,
        inline_message_id,
        query + " " + url
      );
      break;
    default:
      ctx.reply("This should not happen");
      break;
  }
});

telegramGptBot.on(message("text"), async (ctx) => {
  ctx.reply(
    __`Elige una de las acciones disponibles, si tienes dudas utiliza el comando /help😇`
  );
});
