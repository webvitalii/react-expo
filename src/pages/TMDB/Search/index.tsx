import { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import Card from '@/components/TMDB/Card';
import Pagination from '@/components/TMDB/Pagination';
import Loading from '@/components/Loading';
import { searchQueryOptions } from '@/queries/tmdb';

interface SearchResultsProps {
  query: string;
  page: number;
  includeAdult: boolean;
  onPageChange: (newPage: number) => void;
}

function SearchResults({ query, page, includeAdult, onPageChange }: SearchResultsProps) {
  const { data } = useSuspenseQuery(searchQueryOptions(query, page, includeAdult));

  if (data.results.length === 0) {
    return <div className="text-center py-8">No results found for &quot;{query}&quot;</div>;
  }

  return (
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
        onPrevious={() => onPageChange(page - 1)}
        onNext={() => onPageChange(page + 1)}
      />
    </>
  );
}

const Search = () => {
  const navigate = useNavigate({ from: '/tmdb/search' });
  const searchParams = useSearch({ from: '/tmdb/search' });
  const query = searchParams.query || '';
  const page = Number(searchParams.page) || 1;
  const includeAdult = searchParams.include_adult === 'true';

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

      {query && (
        <Suspense fallback={<Loading message="Loading search results..." />}>
          <SearchResults
            query={query}
            page={page}
            includeAdult={includeAdult}
            onPageChange={handlePageChange}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Search;
