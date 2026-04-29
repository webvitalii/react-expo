import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/components/index/new')({
  beforeLoad: () => {
    throw redirect({ to: '/carousel' });
  },
});
