// Pure helper so the numbered-pagination math is independently testable and
// doesn't have to live inside the render tree as an IIFE.
export type PaginationRangeItem = number | 'ellipsis-start' | 'ellipsis-end';

// Returns the sequence of page numbers / ellipsis markers to render around
// `currentPage`, always including the first and last page. `maxVisiblePages`
// controls how many numbered pages (excluding the pinned first/last) are
// shown around the current page.
export const getPaginationRange = (
  currentPage: number,
  totalPages: number,
  maxVisiblePages: number,
): PaginationRangeItem[] => {
  const pages: PaginationRangeItem[] = [];
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  if (startPage > 1) {
    pages.push(1);
    if (startPage > 2) {
      pages.push('ellipsis-start');
    }
  }

  for (let page = startPage; page <= endPage; page++) {
    pages.push(page);
  }

  if (endPage < totalPages) {
    if (endPage < totalPages - 1) {
      pages.push('ellipsis-end');
    }
    pages.push(totalPages);
  }

  return pages;
};
