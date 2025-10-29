import { createFileRoute } from '@tanstack/react-router';
import Movies from '@/pages/TMDB/Movies';

export const Route = createFileRoute('/tmdb/movies')({
  component: Movies,
});
