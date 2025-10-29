import { createFileRoute } from '@tanstack/react-router';
import Movies from '@/pages/TMDB/Movies';

type MoviesSearch = {
  page?: number;
  genre?: string;
  sort?: string;
};

export const Route = createFileRoute('/tmdb/movies')({
  component: Movies,
  validateSearch: (search: Record<string, unknown>): MoviesSearch => ({
    page: Number(search.page) || undefined,
    genre: (search.genre as string) || undefined,
    sort: (search.sort as string) || undefined,
  }),
});
