import { createFileRoute, Outlet } from '@tanstack/react-router';
import PageLayout from '@/components/PageLayout';
import Attribution from '@/components/TMDB/Attribution';
import Menu from '@/components/TMDB/Menu';

export const Route = createFileRoute('/tmdb')({
  component: TMDBLayout,
});

function TMDBLayout() {
  return (
    <PageLayout title="TMDB Database">
      <Menu />
      <Outlet />
      <Attribution />
    </PageLayout>
  );
}
