import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';

export const supportedLanguages = ['en', 'fr'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];
export const defaultLanguage: SupportedLanguage = 'en';

export const isSupportedLanguage = (v: unknown): v is SupportedLanguage =>
  typeof v === 'string' && (supportedLanguages as readonly string[]).includes(v);

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    supportedLngs: supportedLanguages,
    // Only globally-visible namespaces are preloaded. Per-page namespaces
    // are fetched by route loaders via `i18n.loadNamespaces(...)`.
    ns: ['navbar'],
    defaultNS: 'navbar',
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
  })
  .catch((err: unknown) => console.error('i18n init failed', err));

export default i18n;
