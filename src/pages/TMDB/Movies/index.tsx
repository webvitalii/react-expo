import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import Card from '@/components/TMDB/Card';
import Pagination from '@/components/TMDB/Pagination';
import { TMDB_API, TMDB_API_KEY, TMDB_CACHE_PERIOD } from '@/components/TMDB/config';
import { SortControl } from '@/components/TMDB/SortControl';
import { GenreControl } from '@/components/TMDB/GenreControl';
import type { Movie, TMDBResponse, Genre, GenreResponse } from '@/types/TMDB';
import type { SortOption } from '@/components/TMDB/SortControl';

const SORT_OPTIONS: Record<string, SortOption> = {
  popularity: { label: 'Popular', value: 'popularity.desc' },
  rating: { label: 'Top Rated', value: 'vote_average.desc' },
  votes: { label: 'Most Voted', value: 'vote_count.desc' },
  revenue: { label: 'Revenue', value: 'revenue.desc' },
} as const;

type SortOptionKey = keyof typeof SORT_OPTIONS;

const getGenres = async (): Promise<Genre[]> => {
  const response = await fetch(`${TMDB_API.movie.genres}?api_key=${TMDB_API_KEY}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: GenreResponse = await response.json();
  return data.genres;
};

const getMovies = async (
  page: number,
  genreId?: string,
  sortBy: string = SORT_OPTIONS.popularity.value
): Promise<TMDBResponse<Movie>> => {
  const genreParam = genreId && genreId !== 'all' ? `&with_genres=${genreId}` : '';
  const url = `${TMDB_API.movie.discover}?api_key=${TMDB_API_KEY}&page=${page}&sort_by=${sortBy}&vote_count.gte=100${genreParam}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: TMDBResponse<Movie> = await response.json();
  return data;
};

function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const genreId = searchParams.get('genre') || 'all';
  const sortKey = (searchParams.get('sort') as SortOptionKey) || 'popularity';
  const sortBy = SORT_OPTIONS[sortKey]?.value || SORT_OPTIONS.popularity.value;

  const { data: genres = [], isLoading: isLoadingGenres } = useQuery({
    queryKey: ['movieGenres'],
    queryFn: getGenres,
    staleTime: TMDB_CACHE_PERIOD,
  });

  const { data: moviesData, isLoading: isLoadingMovies } = useQuery({
    queryKey: ['movies', page, genreId, sortBy],
    queryFn: () => getMovies(page, genreId, sortBy),
    staleTime: TMDB_CACHE_PERIOD,
  });

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      prev.set('page', newPage.toString());
      return prev;
    });
  };

  const handleGenreChange = (newGenreId: string) => {
    setSearchParams((prev) => {
      prev.set('genre', newGenreId);
      prev.set('page', '1');
      return prev;
    });
  };

  const handleSortChange = (newSortKey: SortOptionKey) => {
    setSearchParams((prev) => {
      prev.set('sort', newSortKey);
      prev.set('page', '1');
      return prev;
    });
  };

  if (isLoadingGenres || isLoadingMovies) {
    return <div className="text-center py-8">Loading movies...</div>;
  }

  if (!genres || !moviesData) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Movies</h2>
        <div className="flex gap-2">
          <SortControl
            sortOptions={SORT_OPTIONS}
            selectedSort={sortKey}
            onSortChange={handleSortChange}
          />
          <GenreControl genres={genres} selectedGenre={genreId} onGenreChange={handleGenreChange} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {moviesData.results.map((movie) => (
          <Card key={movie.id} item={movie} genres={genres} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={moviesData.total_pages}
        onPrevious={() => handlePageChange(page - 1)}
        onNext={() => handlePageChange(page + 1)}
      />
    </div>
  );
}

export default Movies;
