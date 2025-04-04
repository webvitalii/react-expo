import tmdbLogo from '@/assets/tmdb_logo.svg';

const Attribution = () => {
  return (
    <div className="flex items-center justify-center gap-2 text-sm text-gray-500 my-4">
      {/* https://www.themoviedb.org/about/logos-attribution */}
      <img src={tmdbLogo} alt="TMDB Logo" className="h-3 w-auto" />
      <p>
        This website uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise
        approved by TMDB.
      </p>
    </div>
  );
};

export default Attribution;
