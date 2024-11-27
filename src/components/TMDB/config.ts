export const TMDB_API_KEY = '3486f39b28a881925228f179ea6ddaf9';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const TMDB_API = {
  movie: {
    popular: `${TMDB_BASE_URL}/movie/popular`,
    upcoming: `${TMDB_BASE_URL}/movie/upcoming`,
    details: (id: number) => `${TMDB_BASE_URL}/movie/${id}`,
    reviews: (id: number) => `${TMDB_BASE_URL}/movie/${id}/reviews`,
    similar: (id: number) => `${TMDB_BASE_URL}/movie/${id}/similar`,
    recommendations: (id: number) => `${TMDB_BASE_URL}/movie/${id}/recommendations`,
  },
  image: {
    poster: (path: string) => `${TMDB_IMAGE_BASE_URL}/w500${path}`,
    backdrop: (path: string) => `${TMDB_IMAGE_BASE_URL}/w1280${path}`,
  },
  search: {
    movie: `${TMDB_BASE_URL}/search/movie`,
  },
};
