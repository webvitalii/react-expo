import type { Movie, TVShow, SearchResult, Genre } from '@/types/TMDB';

interface CardProps {
  item: Movie | TVShow | SearchResult;
  genres?: Genre[];
}

const Card = ({ item, genres = [] }: CardProps) => {
  const getTitle = () => {
    if ('title' in item) {
      return item.title;
    }
    return item.name;
  };

  const getDate = () => {
    if ('release_date' in item) {
      return item.release_date;
    }
    return item.first_air_date;
  };

  const getTMDBUrl = () => {
    const mediaType = 'media_type' in item ? item.media_type : 'title' in item ? 'movie' : 'tv';
    return `https://www.themoviedb.org/${mediaType}/${item.id}`;
  };

  const getGenres = () => {
    if (!genres?.length || !item.genre_ids?.length) return [];
    return genres.filter((genre) => item.genre_ids.includes(genre.id));
  };

  const itemGenres = getGenres();

  return (
    <section className="border rounded-lg">
      <a href={getTMDBUrl()} target="_blank" rel="noopener noreferrer" className="block">
        {item.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={getTitle()}
            className="w-full h-auto rounded-lg hover:opacity-80 transition-opacity duration-300"
          />
        ) : (
          <div />
        )}
      </a>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 line-clamp-1">
          <a
            href={getTMDBUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition-colors duration-300"
          >
            {getTitle()}
          </a>
        </h3>

        {itemGenres.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {itemGenres.map((genre) => (
              <span
                key={genre.id}
                className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-gray-600"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex justify-between items-center mb-1">
          <span className="text-sm text-gray-500">
            {getDate() && new Date(getDate()).getFullYear()}
            {'media_type' in item && <span className="uppercase"> | {item.media_type}</span>}
            {'original_language' in item && (
              <span className="uppercase"> | {item.original_language}</span>
            )}
          </span>
          <span className="text-sm text-gray-500">
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
              {item.vote_average && item.vote_average.toFixed(1)}
            </span>
            <span className="text-sm text-gray-500">({item.vote_count})</span>
          </span>
        </div>

        <p className="text-sm text-gray-700 line-clamp-4">{item.overview}</p>
      </div>
    </section>
  );
};

export default Card;
