import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Card from '@/components/TMDB/Card';
import Pagination from '@/components/TMDB/Pagination';
import { TMDB_API, TMDB_API_KEY, TMDB_CACHE_PERIOD } from '@/components/TMDB/config';
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
      `${TMDB_API.tv.discover}?api_key=${TMDB_API_KEY}&page=${page}&sort_by=${sortBy}&vote_count.gte=100${genreParam}`
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
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = searchParams.get('page');
  const genreParam = searchParams.get('genre');
  const sortParam = searchParams.get('sort_by');

  const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);
  const [selectedGenre, setSelectedGenre] = useState<string>(genreParam || 'all');
  const [selectedSort, setSelectedSort] = useState<SortOptionKey>(
    (sortParam || 'popularity') as SortOptionKey
  );

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('page', page.toString());
    params.set('genre', selectedGenre);
    params.set('sort_by', selectedSort);
    setSearchParams(params);
  }, [page, selectedGenre, selectedSort, setSearchParams]);

  // Update state from URL on initial load
  useEffect(() => {
    if (pageParam) {
      const parsedPage = parseInt(pageParam);
      if (!isNaN(parsedPage) && parsedPage > 0) {
        setPage(parsedPage);
      }
    }
    if (genreParam) setSelectedGenre(genreParam);
    if (sortParam && Object.keys(SORT_OPTIONS).includes(sortParam)) {
      setSelectedSort(sortParam as SortOptionKey);
    }
  }, [pageParam, genreParam, sortParam]);

  const { data: genres, error: genresError } = useQuery({
    queryKey: ['tv-genres'],
    queryFn: fetchGenres,
    staleTime: TMDB_CACHE_PERIOD,
    gcTime: TMDB_CACHE_PERIOD,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['tv-shows', page, selectedGenre, selectedSort],
    queryFn: () => fetchTVShows(page, selectedGenre, SORT_OPTIONS[selectedSort].value),
    staleTime: TMDB_CACHE_PERIOD,
    gcTime: TMDB_CACHE_PERIOD,
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

  if (genresError) {
    return (
      <div className="text-center py-8 text-red-500">
        {genresError instanceof Error ? genresError.message : 'Error loading genres'}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error instanceof Error ? error.message : 'Error loading TV shows'}
      </div>
    );
  }
  
  if (isLoading) {
    return <div className="text-center py-8">Loading TV shows...</div>;
  }
  
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
