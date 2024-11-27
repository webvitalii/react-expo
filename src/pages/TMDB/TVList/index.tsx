import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Pagination from '@/components/TMDB/Pagination';
import { TMDB_API, TMDB_API_KEY } from '@/components/TMDB/config';

interface TVShow {
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  first_air_date: string;
}

interface TVResponse {
  results: TVShow[];
  page: number;
  total_pages: number;
  total_results: number;
}

const fetchTVShows = async (page: number): Promise<TVResponse> => {
  const response = await fetch(`${TMDB_API.tv.popular}?api_key=${TMDB_API_KEY}&page=${page}`);
  const data: TVResponse = await response.json();
  return data;
};

const TVList = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['tv', page],
    queryFn: () => fetchTVShows(page),
  });

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    if (data && page < data.total_pages) {
      setPage((prev) => prev + 1);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading TV shows</div>;
  if (!data) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Popular TV Shows</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.results.map((show) => (
          <div key={show.id} className="border rounded-lg p-4">
            <img
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              className="w-full h-auto rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{show.name}</h3>
            <p className="text-sm text-gray-600">{show.first_air_date}</p>
            <p className="mt-2">{show.overview}</p>
          </div>
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

export default TVList;
