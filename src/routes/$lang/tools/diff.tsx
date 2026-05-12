import { createFileRoute } from '@tanstack/react-router';
import i18n from '@/i18n';
import DiffPage from '@/pages/DiffPage';

export const Route = createFileRoute('/$lang/tools/diff')({
  loader: () => i18n.loadNamespaces('diff'),
  component: DiffPage,
});
