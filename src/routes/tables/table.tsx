import { createFileRoute } from '@tanstack/react-router';
import TablePage from '@/pages/TablePage';
import { allPostsQueryOptions } from '@/queries/posts';

export const Route = createFileRoute('/tables/table')({
  component: TablePage,
  loader: ({ context: { queryClient } }) => queryClient.ensureQueryData(allPostsQueryOptions),
});
