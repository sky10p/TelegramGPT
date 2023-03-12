export enum Language {
  en = "en",
  de = "de",
  fr = "fr",
  it = "it",
  es = "es",
}
export const ALLOWED_LANGUAGES: Language[] = Object.values(Language);

export type TranslationsSource = Record<Language, Record<string, string>>;

const i18nFn = () => {
  let language = Language.es;
  let translations: TranslationsSource;

  return {
    configure: (lang: Language, translationsSource?: TranslationsSource) => {
      language = lang;
      if (translationsSource) {
        translations = translationsSource;
      }
    },
    getTranslations: () => translations[language],
  };
};

export let i18n = i18nFn();

const getKey = (
  strs: TemplateStringsArray,
  parameters: string[]
): string => {
  if (parameters.length === 0) {
    return strs[0];
  }

  return strs.reduce((acc, str, index) => {
    const parameter = parameters[index] !== undefined && parameters[index] !== null ? `{{${index}}}` : "";
    return `${acc}${str}${parameter}`;
  }, '');
};

export const __ = (
  strs: TemplateStringsArray,
  ...parameters: any[]
): string => {
  const translations = i18n.getTranslations();
  const key = getKey(strs, parameters);

  if(!translations[key]) {
    console.warn("No translation found for key: ", key);
  }
  let translation = translations ? translations[key] || key : key;

  for (let i = 0; i < parameters.length; i++) {
    translation = translation.replace(`{{${i}}}`, parameters[i]);
  }

  return translation;
};
