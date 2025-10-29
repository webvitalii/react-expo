import { createFileRoute } from '@tanstack/react-router';
import DiffPage from '@/pages/DiffPage';

export const Route = createFileRoute('/diff')({
  component: DiffPage,
});
