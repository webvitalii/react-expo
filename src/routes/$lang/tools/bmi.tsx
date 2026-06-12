import { createFileRoute } from '@tanstack/react-router';
import i18n from '@/i18n';
import BmiPage from '@/pages/BmiPage';

export const Route = createFileRoute('/$lang/tools/bmi')({
  loader: () => i18n.loadNamespaces('bmi'),
  component: BmiPage,
});
