import { createFileRoute } from '@tanstack/react-router';
import TableSimplePage from '@/pages/TableSimplePage';
import { allPostsQueryOptions } from '@/queries/posts';

export const Route = createFileRoute('/table-simple')({
  component: TableSimplePage,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(allPostsQueryOptions),
});
