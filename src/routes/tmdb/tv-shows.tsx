import { createFileRoute } from '@tanstack/react-router';
import TVShows, { TV_SORT_OPTIONS, type TVSortKey } from '@/pages/TMDB/TVShows';
import { tvShowsQueryOptions, tvGenresQueryOptions } from '@/queries/tmdb';

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
  loaderDeps: ({ search: { page, genre, sort } }) => ({
    page: page ?? 1,
    genre: genre ?? 'all',
    sort: (sort as TVSortKey) ?? 'popularity',
  }),
  loader: ({ context: { queryClient }, deps: { page, genre, sort } }) => {
    const sortBy = TV_SORT_OPTIONS[sort]?.value ?? TV_SORT_OPTIONS.popularity!.value;
    return Promise.all([
      queryClient.ensureQueryData(tvGenresQueryOptions),
      queryClient.ensureQueryData(tvShowsQueryOptions(page, genre, sortBy)),
    ]);
  },
});
