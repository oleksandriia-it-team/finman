import { PaginationProps } from '@frontend/components/pagination/props/pagination.props';
import { UiPagination } from '@frontend/ui/ui-pagination/ui-pagination';
import { useMemo } from 'react';
import { getTotalPages } from '@frontend/shared/utils/get-total-pages.util';
import { UiPaginationContent } from '@frontend/ui/ui-pagination/ui-pagination-content';
import { UiPaginationItem } from '@frontend/ui/ui-pagination/ui-pagination-item';
import { UiPaginationNext, UiPaginationPrevious } from '@frontend/ui/ui-pagination/ui-pagination-actions';

export function FinPagination({ selectedPage, setPage, pageSize, totalCount, ...props }: PaginationProps) {
  const totalPages = getTotalPages(totalCount, pageSize);

  const showPages = useMemo(() => {
    const maxVisible = 6;
    const pages: number[] = [];

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    let start = Math.max(1, selectedPage - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }, [selectedPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <UiPagination {...props}>
      <UiPaginationContent>
        <UiPaginationPrevious
          disabled={selectedPage <= 1}
          onClick={() => setPage(selectedPage - 1)}
        />

        {showPages.map((page) => {
          return (
            <UiPaginationItem
              disabled
              key={page}
              isActive={page === selectedPage}
              onClick={() => setPage(page)}
            >
              {page}
            </UiPaginationItem>
          );
        })}

        <UiPaginationNext
          disabled={selectedPage >= totalPages}
          onClick={() => setPage(selectedPage + 1)}
        />
      </UiPaginationContent>
    </UiPagination>
  );
}
