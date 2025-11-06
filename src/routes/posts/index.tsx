import { createFileRoute } from '@tanstack/react-router';
import PostsList from '@/pages/PostsPage/PostsList';

export const Route = createFileRoute('/posts/')({
  component: PostsList,
});
