import { useQuery } from '@tanstack/react-query';
import PageLayout from '@/components/PageLayout';
import PageTitle from '@/components/PageTitle';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
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
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=3486f39b28a881925228f179ea6ddaf9&page=${page}`
  );
  const data: MovieResponse = await response.json();
  return data;
};

const MoviesPage = () => {
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
                {/* poster_path */}
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
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

          <div className="flex justify-center items-center gap-4 mt-6 mb-8">
            <Button onClick={handlePreviousPage} disabled={page === 1} variant="outline">
              Previous
            </Button>
            <span className="text-sm">
              Page {page} of {data.total_pages}
            </span>
            <Button onClick={handleNextPage} disabled={page >= data.total_pages} variant="outline">
              Next
            </Button>
          </div>
        </>
      )}
    </PageLayout>
  );
};

export default MoviesPage;
