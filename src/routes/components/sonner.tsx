import { createFileRoute } from '@tanstack/react-router';
import SonnerPage from '@/pages/SonnerPage';

export const Route = createFileRoute('/components/sonner')({
  component: SonnerPage,
});
