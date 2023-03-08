import { telegramGptBot } from "./lib/telegram/telegramGPTBot";
import i18n from 'i18n'
import path from "path";

i18n.configure({
  locales: ['en', 'es'], // idiomas soportados
  directory: path.join(__dirname, 'locales'), // ruta a los archivos de traducción
  defaultLocale: 'es', // idioma predeterminado
  queryParameter: 'lang', // parámetro de consulta para definir el idioma
});

i18n.setLocale('es')

telegramGptBot.launch();


console.log("Working bot.");
