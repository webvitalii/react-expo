import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import Pagination from '@/components/TMDB/Pagination';
import Card from '@/components/TMDB/Card';
import { TMDB_API, TMDB_API_KEY } from '@/components/TMDB/config';

interface SearchResult {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string;
  media_type: 'movie' | 'tv' | 'person';
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
}

interface SearchResponse {
  results: SearchResult[];
  page: number;
  total_pages: number;
  total_results: number;
}

const fetchSearchResults = async (query: string, page: number): Promise<SearchResponse> => {
  if (!query) return { results: [], page: 1, total_pages: 0, total_results: 0 };
  const response = await fetch(
    `${TMDB_API.search.multi}?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  const data: SearchResponse = await response.json();
  return data;
};

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['search', searchQuery, page],
    queryFn: () => fetchSearchResults(searchQuery, page),
    enabled: !!searchQuery,
  });

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    if (data && page < data.total_pages) {
      setPage((prev) => prev + 1);
    }
  };

  const getTitle = (result: SearchResult) => {
    if (result.media_type === 'movie') return result.title;
    if (result.media_type === 'tv') return result.name;
    return '';
  };

  const getDate = (result: SearchResult) => {
    if (result.media_type === 'movie') return result.release_date;
    if (result.media_type === 'tv') return result.first_air_date;
    return '';
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search Movies & TV Shows</h2>
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Search for movies or TV shows..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-xl"
        />
      </div>

      {isLoading && <div>Loading...</div>}
      {error && <div>Error loading search results</div>}

      {data && data.results.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.results.map((result) => {
              if (result.media_type === 'person') return null;
              return (
                <Card
                  key={result.id}
                  title={getTitle(result)}
                  date={getDate(result)}
                  overview={result.overview}
                  posterPath={result.poster_path}
                  mediaType={result.media_type}
                  vote_average={result.vote_average}
                />
              );
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
