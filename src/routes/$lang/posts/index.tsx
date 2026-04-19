import { createFileRoute } from '@tanstack/react-router';
import PostsList from '@/pages/PostsPage/PostsList';
import { postsListQueryOptions } from '@/queries/posts';

type PostsSearch = {
  page?: number;
};

export const Route = createFileRoute('/$lang/posts/')({
  component: PostsList,
  validateSearch: (search: Record<string, unknown>): PostsSearch => {
    return {
      page: search.page ? Number(search.page) : undefined,
    };
  },
  loaderDeps: ({ search: { page } }) => ({ page: page ?? 1 }),
  loader: ({ context: { queryClient }, deps: { page } }) =>
    queryClient.ensureQueryData(postsListQueryOptions(page)),
});
