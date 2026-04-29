import { createFileRoute } from '@tanstack/react-router';
import BmiPage from '@/pages/BmiPage';

export const Route = createFileRoute('/tools/bmi')({
  component: BmiPage,
});
