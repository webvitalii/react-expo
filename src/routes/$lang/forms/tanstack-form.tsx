import { createFileRoute } from '@tanstack/react-router';
import TanStackForm2Page from '@/pages/TanStackForm2Page';

export const Route = createFileRoute('/$lang/forms/tanstack-form')({
  component: TanStackForm2Page,
});
