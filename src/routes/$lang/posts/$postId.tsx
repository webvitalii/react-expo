import { createFileRoute } from '@tanstack/react-router';
import PostDetail from '@/pages/PostsPage/PostDetail';
import { postQueryOptions, postCommentsQueryOptions } from '@/queries/posts';

export const Route = createFileRoute('/$lang/posts/$postId')({
  component: PostDetail,
  loader: ({ context: { queryClient }, params: { postId } }) =>
    Promise.all([
      queryClient.ensureQueryData(postQueryOptions(postId)),
      queryClient.ensureQueryData(postCommentsQueryOptions(postId)),
    ]),
});
