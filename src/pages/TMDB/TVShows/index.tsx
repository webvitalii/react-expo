import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import Card from '@/components/TMDB/Card';
import Pagination from '@/components/TMDB/Pagination';
import { SortControl } from '@/components/TMDB/SortControl';
import { GenreControl } from '@/components/TMDB/GenreControl';
import { tvShowsQueryOptions, tvGenresQueryOptions } from '@/queries/tmdb';
import type { SortOption } from '@/components/TMDB/SortControl';

export const TV_SORT_OPTIONS: Record<string, SortOption> = {
  popularity: { label: 'Popular', value: 'popularity.desc' },
  rating: { label: 'Top Rated', value: 'vote_average.desc' },
  votes: { label: 'Most Voted', value: 'vote_count.desc' },
};

export type TVSortKey = keyof typeof TV_SORT_OPTIONS;

const TVShows = () => {
  const navigate = useNavigate({ from: '/tmdb/tv-shows' });
  const searchParams = useSearch({ from: '/tmdb/tv-shows' });
  const page = Number(searchParams.page) || 1;
  const genreId = searchParams.genre || 'all';
  const sortKey = (searchParams.sort as TVSortKey) || 'popularity';
  const sortBy = TV_SORT_OPTIONS[sortKey]?.value || TV_SORT_OPTIONS.popularity.value;

  const { data: genres } = useSuspenseQuery(tvGenresQueryOptions);
  const { data: tvShowsData } = useSuspenseQuery(tvShowsQueryOptions(page, genreId, sortBy));

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

  const handleSortChange = (newSortKey: TVSortKey) => {
    navigate({
      search: (prev) => ({ ...prev, sort: newSortKey, page: 1 }),
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">TV Shows</h2>
        <div className="flex gap-2">
          <SortControl
            sortOptions={TV_SORT_OPTIONS}
            selectedSort={sortKey}
            onSortChange={handleSortChange}
          />
          <GenreControl genres={genres} selectedGenre={genreId} onGenreChange={handleGenreChange} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tvShowsData.results.map((show) => (
          <Card key={show.id} item={show} genres={genres} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={tvShowsData.total_pages}
        onPrevious={() => handlePageChange(page - 1)}
        onNext={() => handlePageChange(page + 1)}
      />
    </div>
  );
};

export default TVShows;
