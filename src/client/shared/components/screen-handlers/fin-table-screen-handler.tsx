import { useCallback, useMemo } from 'react';
import { UiSkeleton } from '@frontend/ui/ui-skeleton/ui-skeleton';
import type { TableScreenHandlerProps } from '@frontend/components/screen-handlers/props/table-screen-handler.props';
import { FinListScreenHandler } from '@frontend/components/screen-handlers/fin-list-screen-handler';
import { UiTableRow } from '@frontend/ui/ui-table/ui-table-row';
import { UiTableCell } from '@frontend/ui/ui-table/ui-table-cell';
import { FinErrorTableWidget } from '@frontend/components/error/fin-error-table-widget';

export function FinTableScreenHandler({
  skeleton,
  skeletonClassName,
  totalColumns,
  error,
  errorMessage,
  ...props
}: TableScreenHandlerProps) {
  const tableSkeleton = useCallback(() => {
    const Skeleton = skeleton ?? UiSkeleton;

    const countCells = Array.from({ length: totalColumns }).map((_, i) => i);

    return (
      <UiTableRow>
        {countCells.map((cell) => (
          <UiTableCell key={cell}>
            <Skeleton className={skeletonClassName ?? ''} />
          </UiTableCell>
        ))}
      </UiTableRow>
    );
  }, [skeleton, skeletonClassName, totalColumns]);

  const tableError = useMemo(() => {
    return (
      <UiTableRow>
        <UiTableCell colSpan={totalColumns}>
          {error ?? (
            <FinErrorTableWidget
              status={400}
              message={errorMessage ?? 'Сталася помилка при завантаженні даних'}
            />
          )}
        </UiTableCell>
      </UiTableRow>
    );
  }, [error, errorMessage, totalColumns]);

  return (
    <FinListScreenHandler
      {...props}
      skeleton={tableSkeleton}
      error={tableError}
      errorMessage={errorMessage}
    />
  );
}
