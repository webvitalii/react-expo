interface CardProps {
  title: string;
  date?: string;
  overview: string;
  posterPath?: string;
  mediaType?: string;
  vote_average?: number;
}

const Card = ({ title, date, overview, posterPath, mediaType, vote_average }: CardProps) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      {posterPath ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className="w-full h-auto rounded-lg"
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-400">No image available</span>
        </div>
      )}
      <h3 className="text-lg font-semibold mt-2 line-clamp-1">{title}</h3>

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {date && new Date(date).getFullYear()}
          {mediaType && <span className="uppercase"> | {mediaType}</span>}
        </span>
        <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
          {vote_average && vote_average.toFixed(1)}
        </span>
      </div>

      <p className="mt-2 text-sm text-gray-700 line-clamp-3">{overview}</p>
    </div>
  );
};

export default Card;
