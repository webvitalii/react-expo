import { createFileRoute } from '@tanstack/react-router';
import TablePage from '@/pages/TablePage';

export const Route = createFileRoute('/table')({
  component: TablePage,
});
