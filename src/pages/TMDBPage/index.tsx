import { useQuery } from '@tanstack/react-query';
import PageLayout from '@/components/PageLayout';
import PageTitle from '@/components/PageTitle';
import { useState } from 'react';
import Attribution from '@/components/TMDB/Attribution';
import Pagination from '@/components/TMDB/Pagination';
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

const TMDBPage = () => {
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

  return (
    <PageLayout>
      <PageTitle>Popular Movies</PageTitle>

      {isLoading && <div className="p-4">Loading...</div>}
      {error && <div className="p-4 text-red-500">Error fetching movies</div>}

      {data?.results && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {data.results.map((movie) => (
              <div key={movie.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={TMDB_API.image.poster(movie.poster_path)}
                  alt={movie.title}
                  className="w-full"
                />

                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                  <p className="text-gray-600 text-sm mb-2">{movie.overview.slice(0, 150)}...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      {new Date(movie.release_date).getFullYear()}
                    </span>
                    <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                      {movie.vote_average.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={data.total_pages}
            onPrevious={handlePreviousPage}
            onNext={handleNextPage}
          />

          <Attribution />
        </>
      )}
    </PageLayout>
  );
};

export default TMDBPage;
