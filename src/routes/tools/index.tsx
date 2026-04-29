import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/tools/')({
  beforeLoad: () => {
    throw redirect({ to: '/tools/bmi' });
  },
});
