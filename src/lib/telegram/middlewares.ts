import { Context, Middleware } from "telegraf";
import { isAllowed } from "./permissions";

export const GuardMiddleware: Middleware<Context> = async (ctx: Context, next) => {
    const userId = ctx?.from?.id;
    if (userId && isAllowed({ telegramUserId: userId })) {
      await next();
    } else {
      ctx.reply("No tienes acceso, pregunta al administrador.");
    }
  }