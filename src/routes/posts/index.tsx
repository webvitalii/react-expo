import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import PostsList from '@/pages/PostsPage/PostsList';

const postsSearchSchema = z.object({
  page: z.number().int().positive().catch(1),
});

export const Route = createFileRoute('/posts/')({
  component: PostsList,
  validateSearch: postsSearchSchema,
});
