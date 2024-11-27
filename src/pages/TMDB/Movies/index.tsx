import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from '@/components/TMDB/Card';
import Pagination from '@/components/TMDB/Pagination';
import { TMDB_API, TMDB_API_KEY } from '@/components/TMDB/config';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Movie, TMDBResponse, Genre, GenreResponse } from '@/types/TMDB';

const SORT_OPTIONS = {
  popularity: { label: 'Popular', value: 'popularity.desc' },
  rating: { label: 'Top Rated', value: 'vote_average.desc' },
  votes: { label: 'Most Voted', value: 'vote_count.desc' },
  revenue: { label: 'Revenue', value: 'revenue.desc' },
} as const;

type SortOption = keyof typeof SORT_OPTIONS;

const fetchGenres = async (): Promise<Genre[]> => {
  try {
    const response = await fetch(`${TMDB_API.movie.genres}?api_key=${TMDB_API_KEY}`);
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

const fetchMovies = async (
  page: number,
  genreId?: string,
  sortBy: string = SORT_OPTIONS.popularity.value
): Promise<TMDBResponse<Movie>> => {
  try {
    const genreParam = genreId && genreId !== 'all' ? `&with_genres=${genreId}` : '';
    const url = `${TMDB_API.movie.discover}?api_key=${TMDB_API_KEY}&page=${page}&sort_by=${sortBy}&vote_count.gte=200${genreParam}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: TMDBResponse<Movie> = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

function Movies() {
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<SortOption>('popularity');

  const { data: genres, error: genresError } = useQuery({
    queryKey: ['movie-genres'],
    queryFn: fetchGenres,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['movies', page, selectedGenre, selectedSort],
    queryFn: () => fetchMovies(page, selectedGenre, SORT_OPTIONS[selectedSort].value),
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

  const handleSortChange = (value: SortOption) => {
    setSelectedSort(value);
    setPage(1); // Reset to first page when changing sort
  };

  if (genresError) return <div>Error loading genres</div>;
  if (error) return <div>Error loading movies</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Movies</h2>
        <div className="flex gap-2">
          <Select value={selectedSort} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(SORT_OPTIONS).map(([key, { label }]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedGenre} onValueChange={handleGenreChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {genres?.map((genre) => (
                <SelectItem key={genre.id} value={genre.id.toString()}>
                  {genre.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.results.map((movie) => (
          <Card key={movie.id} item={movie} />
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
}

export default Movies;
