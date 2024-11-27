import tmdbLogo from '@/assets/tmdb_logo.svg';

const TMDBAttribution = () => {
  return (
    <div className="flex flex-col items-center gap-2 text-sm text-gray-500 my-4">
      {/* https://www.themoviedb.org/about/logos-attribution */}
      <img src={tmdbLogo} alt="TMDB Logo" className="h-3 w-auto" />
      <p className="text-center">
        This website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise
        approved by TMDB.
      </p>
    </div>
  );
};

export default TMDBAttribution;
