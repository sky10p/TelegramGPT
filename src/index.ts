import { telegramGptBot } from "./lib/telegram/telegramGPTBot";
import { i18n, Language } from "./lib/i18n/i18n";
import { en } from "./lib/i18n/en";
import { es } from "./lib/i18n/es";

i18n.configure(Language.es, {
  en: en,
  es: es,
  de: {},
  fr: {},
  it: {},
});

telegramGptBot.launch();


console.log("Working bot.");
