import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from '@/components/TMDB/Card';
import Pagination from '@/components/TMDB/Pagination';
import { TMDB_API, TMDB_API_KEY } from '@/components/TMDB/config';
import { SortControl } from '@/components/TMDB/SortControl';
import { GenreControl } from '@/components/TMDB/GenreControl';
import type { TVShow, TMDBResponse, Genre, GenreResponse } from '@/types/TMDB';
import type { SortOption } from '@/components/TMDB/SortControl';

const SORT_OPTIONS: Record<string, SortOption> = {
  popularity: { label: 'Popular', value: 'popularity.desc' },
  rating: { label: 'Top Rated', value: 'vote_average.desc' },
  votes: { label: 'Most Voted', value: 'vote_count.desc' },
} as const;

type SortOptionKey = keyof typeof SORT_OPTIONS;

const fetchGenres = async (): Promise<Genre[]> => {
  try {
    const response = await fetch(`${TMDB_API.tv.genres}?api_key=${TMDB_API_KEY}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: GenreResponse = await response.json();
    return data.genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

const fetchTVShows = async (
  page: number,
  genreId?: string,
  sortBy: string = SORT_OPTIONS.popularity.value
): Promise<TMDBResponse<TVShow>> => {
  try {
    const genreParam = genreId && genreId !== 'all' ? `&with_genres=${genreId}` : '';
    const response = await fetch(
      `${TMDB_API.tv.discover}?api_key=${TMDB_API_KEY}&page=${page}&sort_by=${sortBy}&vote_count.gte=200${genreParam}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: TMDBResponse<TVShow> = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching TV shows:', error);
    throw error;
  }
};

const TVShows = () => {
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<SortOptionKey>('popularity');

  const { data: genres, error: genresError } = useQuery({
    queryKey: ['tv-genres'],
    queryFn: fetchGenres,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['tv-shows', page, selectedGenre, selectedSort],
    queryFn: () => fetchTVShows(page, selectedGenre, SORT_OPTIONS[selectedSort].value),
  });

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    if (data && page < data.total_pages) {
      setPage((prev) => prev + 1);
    }
  };

  const handleGenreChange = (value: string) => {
    setSelectedGenre(value);
    setPage(1); // Reset to first page when changing genre
  };

  const handleSortChange = (value: string) => {
    setSelectedSort(value as SortOptionKey);
    setPage(1); // Reset to first page when changing sort
  };

  if (genresError) return <div>Error loading genres</div>;
  if (error) return <div>Error loading TV shows</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">TV Shows</h2>
        <div className="flex gap-2">
          <SortControl
            sortOptions={SORT_OPTIONS}
            selectedSort={selectedSort}
            onSortChange={handleSortChange}
          />
          <GenreControl
            genres={genres}
            selectedGenre={selectedGenre}
            onGenreChange={handleGenreChange}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.results.map((show) => (
          <Card key={show.id} item={show} genres={genres} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={data.total_pages}
        onPrevious={handlePreviousPage}
        onNext={handleNextPage}
      />
    </div>
  );
};

export default TVShows;
