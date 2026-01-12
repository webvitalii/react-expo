import { createFileRoute } from '@tanstack/react-router';
import TanStackFormPage from '@/pages/TanStackFormPage';

export const Route = createFileRoute('/$lang/forms/tanstack-form')({
  component: TanStackFormPage,
});
