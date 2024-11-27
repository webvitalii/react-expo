import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Pagination from '@/components/TMDB/Pagination';
import Card from '@/components/TMDB/Card';
import { TMDB_API, TMDB_API_KEY } from '@/components/TMDB/config';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}

interface MovieResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

const fetchMovies = async (page: number): Promise<MovieResponse> => {
  const response = await fetch(`${TMDB_API.movie.popular}?api_key=${TMDB_API_KEY}&page=${page}`);
  const data: MovieResponse = await response.json();
  return data;
};

const MovieList = () => {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery({
    queryKey: ['movies', page],
    queryFn: () => fetchMovies(page),
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
  if (error) return <div>Error loading movies</div>;
  if (!data) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Popular Movies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.results.map((movie) => (
          <Card
            key={movie.id}
            title={movie.title}
            date={movie.release_date}
            overview={movie.overview}
            posterPath={movie.poster_path}
            vote_average={movie.vote_average}
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

export default MovieList;
