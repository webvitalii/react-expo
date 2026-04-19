import { createFileRoute, Outlet } from '@tanstack/react-router';
import PageLayout from '@/components/PageLayout';

export const Route = createFileRoute('/$lang/posts')({
  component: PostsLayout,
});

function PostsLayout() {
  return (
    <PageLayout title="Posts">
      <Outlet />
    </PageLayout>
  );
}
