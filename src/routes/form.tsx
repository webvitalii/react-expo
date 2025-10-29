import { createFileRoute } from '@tanstack/react-router';
import FormPage from '@/pages/FormPage';

export const Route = createFileRoute('/form')({
  component: FormPage,
});
