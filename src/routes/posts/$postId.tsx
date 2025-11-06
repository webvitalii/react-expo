import { createFileRoute } from '@tanstack/react-router';
import PostDetail from '@/pages/PostsPage/PostDetail';

export const Route = createFileRoute('/posts/$postId')({
  component: PostDetail,
});
