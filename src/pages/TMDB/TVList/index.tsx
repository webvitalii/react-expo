import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Card from '@/components/TMDB/Card';
import Pagination from '@/components/TMDB/Pagination';
import { TMDB_API, TMDB_API_KEY } from '@/components/TMDB/config';
import type { TVShow, TMDBResponse } from '@/types/TMDB';

const fetchTVShows = async (page: number): Promise<TMDBResponse<TVShow>> => {
  const response = await fetch(`${TMDB_API.tv.popular}?api_key=${TMDB_API_KEY}&page=${page}`);
  const data: TMDBResponse<TVShow> = await response.json();
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
          <Card
            key={show.id}
            title={show.name}
            date={show.first_air_date}
            overview={show.overview}
            posterPath={show.poster_path}
            vote_average={show.vote_average}
          />
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
