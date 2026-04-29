import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/tables/')({
  beforeLoad: () => {
    throw redirect({ to: '/tables/table-simple' });
  },
});
