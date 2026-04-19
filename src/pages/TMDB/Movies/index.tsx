import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import Card from '@/components/TMDB/Card';
import Pagination from '@/components/TMDB/Pagination';
import { SortControl } from '@/components/TMDB/SortControl';
import { GenreControl } from '@/components/TMDB/GenreControl';
import { moviesQueryOptions, movieGenresQueryOptions } from '@/queries/tmdb';
import type { SortOption } from '@/components/TMDB/SortControl';

export const MOVIE_SORT_OPTIONS: Record<string, SortOption> = {
  popularity: { label: 'Popular', value: 'popularity.desc' },
  rating: { label: 'Top Rated', value: 'vote_average.desc' },
  votes: { label: 'Most Voted', value: 'vote_count.desc' },
  revenue: { label: 'Revenue', value: 'revenue.desc' },
};

export type MovieSortKey = keyof typeof MOVIE_SORT_OPTIONS;

function Movies() {
  const navigate = useNavigate({ from: '/tmdb/movies' });
  const searchParams = useSearch({ from: '/tmdb/movies' });
  const page = Number(searchParams.page) || 1;
  const genreId = searchParams.genre || 'all';
  const sortKey = (searchParams.sort as MovieSortKey) || 'popularity';
  const sortBy = MOVIE_SORT_OPTIONS[sortKey]?.value || MOVIE_SORT_OPTIONS.popularity.value;

  const { data: genres } = useSuspenseQuery(movieGenresQueryOptions);
  const { data: moviesData } = useSuspenseQuery(moviesQueryOptions(page, genreId, sortBy));

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({ ...prev, page: newPage }),
    });
  };

  const handleGenreChange = (newGenreId: string) => {
    navigate({
      search: (prev) => ({ ...prev, genre: newGenreId, page: 1 }),
    });
  };

  const handleSortChange = (newSortKey: MovieSortKey) => {
    navigate({
      search: (prev) => ({ ...prev, sort: newSortKey, page: 1 }),
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Movies</h2>
        <div className="flex gap-2">
          <SortControl
            sortOptions={MOVIE_SORT_OPTIONS}
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
