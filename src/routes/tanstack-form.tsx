import { createFileRoute } from '@tanstack/react-router';
import TanStackFormPage from '@/pages/TanStackFormPage';

export const Route = createFileRoute('/tanstack-form')({
  component: TanStackFormPage,
});
