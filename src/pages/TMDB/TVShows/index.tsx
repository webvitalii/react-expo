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
import type { TVShow, TMDBResponse, Genre, GenreResponse } from '@/types/TMDB';

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

const fetchTVShows = async (page: number, genreId?: string): Promise<TMDBResponse<TVShow>> => {
  try {
    const genreParam = genreId && genreId !== 'all' ? `&with_genres=${genreId}` : '';
    const response = await fetch(
      `${TMDB_API.tv.discover}?api_key=${TMDB_API_KEY}&page=${page}&sort_by=popularity.desc${genreParam}`
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

  const { data: genres, error: genresError } = useQuery({
    queryKey: ['tv-genres'],
    queryFn: fetchGenres,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['tv-shows', page, selectedGenre],
    queryFn: () => fetchTVShows(page, selectedGenre),
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

  if (genresError) return <div>Error loading genres</div>;
  if (error) return <div>Error loading TV shows</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">TV Shows</h2>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.results.map((show) => (
          <Card key={show.id} item={show} />
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
