import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingProps {
  value?: number;
  maxRating?: number;
  onChange?: (value: number) => void;
  size?: number;
  className?: string;
}

const Rating = ({ ...props }: RatingProps) => {
  const { value = 0, maxRating = 5, onChange, size = 16, className } = props;

  const [hoverValue, setHoverValue] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoverValue(index);
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  const handleClick = (index: number) => {
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <div className={cn("flex gap-1", className)}>
      {Array.from({ length: maxRating }, (_, index) => {
        const starValue = index + 1;
        const isFilled = (hoverValue ?? value) >= starValue;

        return (
          <button
            key={index}
            type="button"
            className="focus:outline-none transition-colors hover:scale-110"
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(starValue)}
          >
            <Star
              size={size}
              className={cn(
                "transition-colors",
                isFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-transparent text-gray-300"
              )}
            />
          </button>
        );
      })}
    </div>
  );
};

export default Rating;
