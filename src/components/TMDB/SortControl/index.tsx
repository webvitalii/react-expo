import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export type SortOption = {
  label: string;
  value: string;
};

type SortControlProps = {
  sortOptions: Record<string, SortOption>;
  selectedSort: string;
  onSortChange: (value: string) => void;
  className?: string;
};

export function SortControl({
  sortOptions,
  selectedSort,
  onSortChange,
  className = '',
}: SortControlProps) {
  return (
    <Select value={selectedSort} onValueChange={onSortChange}>
      <SelectTrigger className={`w-[140px] ${className}`}>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(sortOptions).map(([key, { label }]) => (
          <SelectItem key={key} value={key}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
