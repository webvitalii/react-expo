import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

export const supportedLanguages = ['en', 'fr'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
export const defaultLanguage: SupportedLanguage = 'en';

export const getLanguageFromPath = (pathname: string): SupportedLanguage => {
  const segments = pathname.split('/').filter(Boolean);
  const lang = segments[0];
  if (supportedLanguages.includes(lang as SupportedLanguage)) {
    return lang as SupportedLanguage;
  }
  return defaultLanguage;
};

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    ns: ['navbar'],
    defaultNS: 'navbar',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
