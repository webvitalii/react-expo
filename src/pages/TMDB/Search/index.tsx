import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Card from '@/components/TMDB/Card';
import Pagination from '@/components/TMDB/Pagination';
import { TMDB_API, TMDB_API_KEY, TMDB_CACHE_PERIOD } from '@/components/TMDB/config';
import type { SearchResult, TMDBResponse } from '@/types/TMDB';

const getSearchResults = async (
  query: string,
  page: number,
  includeAdult: boolean
): Promise<TMDBResponse<SearchResult>> => {
  if (!query) return { results: [], page: 1, total_pages: 0, total_results: 0 };

  const response = await fetch(
    `${TMDB_API.search.multi}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(
      query
    )}&page=${page}&include_adult=${includeAdult}`
  );
  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }
  const data: TMDBResponse<SearchResult> = await response.json();
  return data;
};

const Search = () => {
  const navigate = useNavigate({ from: '/tmdb/search' });
  const searchParams = useSearch({ from: '/tmdb/search' });
  const query = searchParams.query || '';
  const page = Number(searchParams.page) || 1;
  const includeAdult = searchParams.include_adult === 'true';

  const { data = { results: [], total_pages: 0 }, isPending } = useQuery({
    queryKey: ['search', query, page, includeAdult],
    queryFn: () => getSearchResults(query, page, includeAdult),
    enabled: !!query,
    staleTime: TMDB_CACHE_PERIOD,
  });

  const handleSearch = (newQuery: string) => {
    navigate({
      search: (prev) => ({
        ...prev,
        query: newQuery || undefined,
        page: 1,
      }),
    });
  };

  const handlePageChange = (newPage: number) => {
    navigate({
      search: (prev) => ({ ...prev, page: newPage }),
    });
  };

  const handleAdultContentChange = (checked: boolean) => {
    navigate({
      search: (prev) => ({ ...prev, include_adult: checked.toString() }),
    });
  };

  if (isPending) {
    return <div className="text-center py-8">Loading search results...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Search Movies & TV Shows</h2>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
        <Input
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full md:w-80"
        />
        <div className="flex items-center space-x-2">
          <Checkbox
            id="include_adult"
            checked={includeAdult}
            onCheckedChange={(checked) => handleAdultContentChange(checked === true)}
          />
          <label
            htmlFor="include_adult"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Include adult content
          </label>
        </div>
      </div>

      {data?.results.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.results.map((result) => {
              if (result.media_type === 'person') return null;
              return <Card key={result.id} item={result} />;
            })}
          </div>
          <Pagination
            currentPage={page}
            totalPages={data.total_pages}
            onPrevious={() => handlePageChange(page - 1)}
            onNext={() => handlePageChange(page + 1)}
          />
        </>
      )}

      {data?.results.length === 0 && query && (
        <div className="text-center py-8">No results found for "{query}"</div>
      )}
    </div>
  );
};

export default Search;
