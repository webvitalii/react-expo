import { queryOptions } from '@tanstack/react-query';
import { TMDB_API, TMDB_API_KEY } from '@/components/TMDB/config';
import type { Movie, TVShow, SearchResult, Genre, GenreResponse, TMDBResponse } from '@/types/TMDB';

const fetchJson = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

export const movieGenresQueryOptions = queryOptions({
  queryKey: ['movieGenres'],
  queryFn: async () => {
    const data = await fetchJson<GenreResponse>(`${TMDB_API.movie.genres}?api_key=${TMDB_API_KEY}`);
    return data.genres as Genre[];
  },
});

export const tvGenresQueryOptions = queryOptions({
  queryKey: ['tvGenres'],
  queryFn: async () => {
    const data = await fetchJson<GenreResponse>(`${TMDB_API.tv.genres}?api_key=${TMDB_API_KEY}`);
    return data.genres as Genre[];
  },
});

export const moviesQueryOptions = (page: number, genreId: string, sortBy: string) =>
  queryOptions({
    queryKey: ['movies', page, genreId, sortBy],
    queryFn: () => {
      const genreParam = genreId && genreId !== 'all' ? `&with_genres=${genreId}` : '';
      return fetchJson<TMDBResponse<Movie>>(
        `${TMDB_API.movie.discover}?api_key=${TMDB_API_KEY}&page=${page}&sort_by=${sortBy}&vote_count.gte=100${genreParam}`,
      );
    },
  });

export const tvShowsQueryOptions = (page: number, genreId: string, sortBy: string) =>
  queryOptions({
    queryKey: ['tvShows', page, genreId, sortBy],
    queryFn: () => {
      const genreParam = genreId && genreId !== 'all' ? `&with_genres=${genreId}` : '';
      return fetchJson<TMDBResponse<TVShow>>(
        `${TMDB_API.tv.discover}?api_key=${TMDB_API_KEY}&page=${page}&sort_by=${sortBy}&vote_count.gte=100${genreParam}`,
      );
    },
  });

export const searchQueryOptions = (query: string, page: number, includeAdult: boolean) =>
  queryOptions({
    queryKey: ['search', query, page, includeAdult],
    queryFn: () =>
      fetchJson<TMDBResponse<SearchResult>>(
        `${TMDB_API.search.multi}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
          query,
        )}&page=${page}&include_adult=${includeAdult}`,
      ),
  });
