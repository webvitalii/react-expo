import { createFileRoute } from '@tanstack/react-router';
import Movies from '@/pages/TMDB/Movies';
import { moviesQueryOptions, movieGenresQueryOptions } from '@/queries/tmdb';
import { MOVIE_SORT_OPTIONS, type MovieSortKey } from '@/pages/TMDB/Movies';

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
  loaderDeps: ({ search: { page, genre, sort } }) => ({
    page: page ?? 1,
    genre: genre ?? 'all',
    sort: (sort as MovieSortKey) ?? 'popularity',
  }),
  loader: ({ context: { queryClient }, deps: { page, genre, sort } }) => {
    const sortBy = MOVIE_SORT_OPTIONS[sort]?.value ?? MOVIE_SORT_OPTIONS.popularity!.value;
    return Promise.all([
      queryClient.ensureQueryData(movieGenresQueryOptions),
      queryClient.ensureQueryData(moviesQueryOptions(page, genre, sortBy)),
    ]);
  },
});
