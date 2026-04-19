import { createFileRoute } from '@tanstack/react-router';
import TablePage from '@/pages/TablePage';
import { allPostsQueryOptions } from '@/queries/posts';
import { pendingWithLayout, errorWithLayout } from '@/lib/routeHelpers';

const TABLE_TITLE = 'Table with sorting, filtering and pagination.';

export const Route = createFileRoute('/table')({
  component: TablePage,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(allPostsQueryOptions),
  pendingComponent: pendingWithLayout(TABLE_TITLE),
  errorComponent: errorWithLayout(TABLE_TITLE),
});
