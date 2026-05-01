import { createFileRoute } from '@tanstack/react-router';
import ErrorBoundaryPage from '@/pages/ErrorBoundaryPage';

export const Route = createFileRoute('/error-boundary')({
  component: ErrorBoundaryPage,
});
