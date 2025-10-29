import { createFileRoute, Navigate } from '@tanstack/react-router';

export const Route = createFileRoute('/tmdb/')({
  component: () => <Navigate to="/tmdb/movies" />,
});
