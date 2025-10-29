import { createFileRoute } from '@tanstack/react-router';
import RatingPage from '@/pages/RatingPage';

export const Route = createFileRoute('/rating')({
  component: RatingPage,
});
