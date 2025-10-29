import { createFileRoute } from '@tanstack/react-router';
import TableSimplePage from '@/pages/TableSimplePage';

export const Route = createFileRoute('/table-simple')({
  component: TableSimplePage,
});
