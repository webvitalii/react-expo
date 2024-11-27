import type { Movie, TVShow, SearchResult } from '@/types/TMDB';

interface CardProps {
  item: Movie | TVShow | SearchResult;
}

const Card = ({ item }: CardProps) => {
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

  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      {item.poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={getTitle()}
          className="w-full h-auto rounded-lg"
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">No image available</span>
        </div>
      )}
      <h3 className="text-lg font-semibold mt-2 line-clamp-1">{getTitle()}</h3>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {getDate() && new Date(getDate()).getFullYear()}
          {'media_type' in item && <span className="uppercase"> | {item.media_type}</span>}
        </span>
        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
          {item.vote_average && item.vote_average.toFixed(1)}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-700 line-clamp-3">{item.overview}</p>
    </div>
  );
};

export default Card;
