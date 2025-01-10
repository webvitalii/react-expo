import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import Card from '@/components/TMDB/Card';
import Pagination from '@/components/TMDB/Pagination';
import { TMDB_API, TMDB_API_KEY, TMDB_CACHE_PERIOD } from '@/components/TMDB/config';
import type { SearchResult, TMDBResponse } from '@/types/TMDB';

const fetchSearch = async (query: string, page: number): Promise<TMDBResponse<SearchResult>> => {
  if (!query) return { results: [], page: 1, total_pages: 0, total_results: 0 };
  const response = await fetch(
    `${TMDB_API.search.multi}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }
  const data: TMDBResponse<SearchResult> = await response.json();
  return data;
};

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('query');
  const pageParam = searchParams.get('page');

  const [searchQuery, setSearchQuery] = useState(queryParam || '');
  const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);

  // Update URL when state changes
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('query', searchQuery);
    params.set('page', page.toString());
    setSearchParams(params);
  }, [searchQuery, page, setSearchParams]);

  // Update state from URL on initial load
  useEffect(() => {
    if (queryParam) setSearchQuery(queryParam);
    if (pageParam) setPage(parseInt(pageParam));
  }, [queryParam, pageParam]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', searchQuery, page],
    queryFn: () => fetchSearch(searchQuery, page),
    enabled: !!searchQuery,
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

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search Movies & TV Shows</h2>
      <div className="flex gap-2 mb-6">
        <Input
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setPage(1); // Reset to first page when search query changes
          }}
          className="max-w-xl"
        />
      </div>

      {isLoading && <div className="text-center py-8">Loading search results...</div>}
      {error && (
        <div className="text-center py-8 text-red-500">
          {error instanceof Error ? error.message : 'Error loading search results'}
        </div>
      )}

      {data && data.results.length > 0 && (
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
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
          />
        </>
      )}

      {data && data.results.length === 0 && searchQuery && (
        <div className="text-center py-8">No results found for "{searchQuery}"</div>
      )}
    </div>
  );
};

export default Search;
