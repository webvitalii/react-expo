import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Genre } from '@/types/TMDB';

type GenreControlProps = {
  genres: Genre[] | undefined;
  selectedGenre: string;
  onGenreChange: (value: string) => void;
  className?: string;
};

export function GenreControl({
  genres,
  selectedGenre,
  onGenreChange,
  className = '',
}: GenreControlProps) {
  return (
    <Select value={selectedGenre} onValueChange={(value) => value && onGenreChange(value)}>
      <SelectTrigger className={`w-[180px] ${className}`}>
        <SelectValue placeholder="Select Genre" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Genres</SelectItem>
        {genres?.map((genre) => (
          <SelectItem key={genre.id} value={genre.id.toString()}>
            {genre.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
