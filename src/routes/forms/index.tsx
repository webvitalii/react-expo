import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/forms/')({
  component: () => <Navigate to="/forms/tanstack-form" />,
});
