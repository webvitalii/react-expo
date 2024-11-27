import { Button } from '@/components/ui/button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

const Pagination = ({ currentPage, totalPages, onPrevious, onNext }: PaginationProps) => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6 mb-8">
      <Button onClick={onPrevious} disabled={currentPage === 1} variant="outline">
        Previous
      </Button>
      <span className="text-sm">
        Page {currentPage} of {totalPages}
      </span>
      <Button onClick={onNext} disabled={currentPage >= totalPages} variant="outline">
        Next
      </Button>
    </div>
  );
};

export default Pagination;
