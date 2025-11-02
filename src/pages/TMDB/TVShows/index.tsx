import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
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

const getGenres = async (): Promise<Genre[]> => {
  const response = await fetch(`${TMDB_API.tv.genres}?api_key=${TMDB_API_KEY}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: GenreResponse = await response.json();
  return data.genres;
};

const getTVShows = async (
  page: number,
  genreId?: string,
  sortBy: string = SORT_OPTIONS.popularity.value
): Promise<TMDBResponse<TVShow>> => {
  const genreParam = genreId && genreId !== 'all' ? `&with_genres=${genreId}` : '';
  const response = await fetch(
    `${TMDB_API.tv.discover}?api_key=${TMDB_API_KEY}&page=${page}&sort_by=${sortBy}&vote_count.gte=100${genreParam}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data: TMDBResponse<TVShow> = await response.json();
  return data;
};

const TVShows = () => {
  const navigate = useNavigate({ from: '/tmdb/tv-shows' });
  const searchParams = useSearch({ from: '/tmdb/tv-shows' });
  const page = Number(searchParams.page) || 1;
  const genreId = searchParams.genre || 'all';
  const sortKey = (searchParams.sort as SortOptionKey) || 'popularity';
  const sortBy = SORT_OPTIONS[sortKey]?.value || SORT_OPTIONS.popularity.value;

  const { data: genres = [], isPending: isPendingGenres } = useQuery({
    queryKey: ['tvGenres'],
    queryFn: getGenres,
  });

  const { data: tvShowsData = { results: [], total_pages: 0 }, isPending: isPendingShows } = useQuery({
    queryKey: ['tvShows', page, genreId, sortBy],
    queryFn: () => getTVShows(page, genreId, sortBy),
  });

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

  const handleSortChange = (newSortKey: SortOptionKey) => {
    navigate({
      search: (prev) => ({ ...prev, sort: newSortKey, page: 1 }),
    });
  };

  if (isPendingGenres || isPendingShows) {
    return <div className="text-center py-8">Loading TV shows...</div>;
  }

  if (!genres || !tvShowsData) return null;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">TV Shows</h2>
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
