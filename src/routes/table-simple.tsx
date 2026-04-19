import { createFileRoute } from '@tanstack/react-router';
import TableSimplePage from '@/pages/TableSimplePage';
import { allPostsQueryOptions } from '@/queries/posts';
import { pendingWithLayout, errorWithLayout } from '@/lib/routeHelpers';

const TITLE = 'Table Simple';

export const Route = createFileRoute('/table-simple')({
  component: TableSimplePage,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(allPostsQueryOptions),
  pendingComponent: pendingWithLayout(TITLE),
  errorComponent: errorWithLayout(TITLE),
});
