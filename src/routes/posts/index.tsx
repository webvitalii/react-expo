import { createFileRoute } from '@tanstack/react-router';
import PostsList from '@/pages/PostsPage/PostsList';

type PostsSearch = {
  page?: number;
};

export const Route = createFileRoute('/posts/')({
  component: PostsList,
  validateSearch: (search: Record<string, unknown>): PostsSearch => {
    return {
      page: search.page ? Number(search.page) : undefined,
    };
  },
});
