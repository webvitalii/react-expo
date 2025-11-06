import { createFileRoute, Outlet } from '@tanstack/react-router';
import PageLayout from '@/components/PageLayout';
import PageTitle from '@/components/PageTitle';

export const Route = createFileRoute('/posts')({
  component: PostsLayout,
});

function PostsLayout() {
  return (
    <PageLayout>
      <PageTitle>Posts</PageTitle>
      <Outlet />
    </PageLayout>
  );
}
