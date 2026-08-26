import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { getPaginationRange } from './paginationRange';

const MAX_VISIBLE_PAGES = 3;

interface TablePaginationControlsProps {
  currentPage: number;
  totalPages: number;
  canPreviousPage: boolean;
  canNextPage: boolean;
  onPreviousPage: () => void;
  onNextPage: () => void;
  onPageChange: (pageIndex: number) => void;
}

// Kept table-agnostic (plain page numbers/callbacks, no `Table<...>` prop) so
// it stays independently testable and reusable outside TanStack Table.
const TablePaginationControls = ({
  currentPage,
  totalPages,
  canPreviousPage,
  canNextPage,
  onPreviousPage,
  onNextPage,
  onPageChange,
}: TablePaginationControlsProps) => {
  const range = getPaginationRange(currentPage, totalPages, MAX_VISIBLE_PAGES);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            size="default"
            onClick={onPreviousPage}
            className={canPreviousPage ? 'cursor-pointer' : 'pointer-events-none opacity-50'}
          />
        </PaginationItem>

        {range.map((item) =>
          item === 'ellipsis-start' || item === 'ellipsis-end' ? (
            <PaginationItem key={item}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={item}>
              <PaginationLink
                size="icon"
                onClick={() => onPageChange(item - 1)}
                isActive={currentPage === item}
              >
                {item}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        <PaginationItem>
          <PaginationNext
            size="default"
            onClick={onNextPage}
            className={canNextPage ? 'cursor-pointer' : 'pointer-events-none opacity-50'}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default TablePaginationControls;
