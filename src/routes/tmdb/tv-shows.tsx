import { createFileRoute } from '@tanstack/react-router';
import TVShows from '@/pages/TMDB/TVShows';

type TVShowsSearch = {
  page?: number;
  genre?: string;
  sort?: string;
};

export const Route = createFileRoute('/tmdb/tv-shows')({
  component: TVShows,
  validateSearch: (search: Record<string, unknown>): TVShowsSearch => ({
    page: Number(search.page) || undefined,
    genre: (search.genre as string) || undefined,
    sort: (search.sort as string) || undefined,
  }),
});
