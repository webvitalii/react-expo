import { createFileRoute, Outlet } from '@tanstack/react-router';
import PageLayout from '@/components/PageLayout';
import PageTitle from '@/components/PageTitle';
import Attribution from '@/components/TMDB/Attribution';
import Menu from '@/components/TMDB/Menu';

export const Route = createFileRoute('/tmdb')({
  component: TMDBLayout,
});

function TMDBLayout() {
  return (
    <PageLayout>
      <PageTitle>TMDB Database</PageTitle>
      <Menu />
      <Outlet />
      <Attribution />
    </PageLayout>
  );
}
