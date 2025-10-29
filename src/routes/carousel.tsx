import { createFileRoute } from '@tanstack/react-router';
import CarouselPage from '@/pages/CarouselPage';

export const Route = createFileRoute('/carousel')({
  component: CarouselPage,
});
