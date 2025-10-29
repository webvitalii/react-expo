import { createFileRoute } from '@tanstack/react-router';
import TVShows from '@/pages/TMDB/TVShows';

export const Route = createFileRoute('/tmdb/tv-shows')({
  component: TVShows,
});
