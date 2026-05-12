import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import i18n, { defaultLanguage, isSupportedLanguage } from '@/i18n';

export const Route = createFileRoute('/$lang')({
  beforeLoad: async ({ params, preload }) => {
    const { lang } = params;
    if (!isSupportedLanguage(lang)) {
      throw redirect({ to: '/$lang', params: { lang: defaultLanguage } });
    }
    if (preload) {
      // Hover-time preload: warm the locale's resources into cache
      // WITHOUT flipping the global active language. `changeLanguage`
      // would cause every mounted `useTranslation()` to re-render in
      // the target language before the user has clicked.
      await i18n.loadLanguages(lang);
      return;
    }
    // Real navigation: switch the active language BEFORE child route
    // loaders run so they fetch the correct locale's namespaces
    // (e.g. /fr/tools/diff loads fr/diff.json).
    if (i18n.language !== lang) {
      await i18n.changeLanguage(lang);
    }
  },
  component: Outlet,
});
