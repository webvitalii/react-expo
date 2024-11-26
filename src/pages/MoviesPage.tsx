import { useQuery } from "@tanstack/react-query";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";

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
}

const fetchMovies = async (): Promise<Movie[]> => {
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=3486f39b28a881925228f179ea6ddaf9"
  );
  const data: MovieResponse = await response.json();
  return data.results;
};

const MoviesPage = () => {
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  return (
    <PageLayout>
      <PageTitle>Popular Movies</PageTitle>

      {isLoading && <div className="p-4">Loading...</div>}
      {error && <div className="p-4 text-red-500">Error fetching movies</div>}
      
      {movies && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[400px] object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{movie.title}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  {movie.overview.slice(0, 150)}...
                </p>
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
      )}
    </PageLayout>
  );
};

export default MoviesPage;
