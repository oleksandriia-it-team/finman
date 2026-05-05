'use client';

import { useState } from 'react';
import type { TrackingOperationFilter } from '@common/domains/tracking-operation/filter/tracking-operation.filter'; // ← додати
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useRouter } from 'next/navigation';
import { useCombineStates } from '@frontend/shared/hooks/combine-states/combine-states.hook';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { cn } from '@frontend/shared/utils/cn.util';
import { TransactionCard } from '@frontend/entities/operations/transaction-card/transaction-card';
import { TrackingOperationHeader } from '@frontend/features/tracking-operation/tracking-operation-header';
import { useTrackingOperations } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/tracking-operations.hook';
import { FinListScreenHandler } from '@frontend/components/screen-handlers/fin-list-screen-handler';
import { getSafeErrorMessage } from '@common/utils/get-safe-error-message.util';
import { UiDateSeparator } from '@frontend/ui/ui-date-separator/ui-date-separator';
import { format, parseISO } from 'date-fns';
import { uk } from 'date-fns/locale/uk';

export function TrackingOperationScreen() {
  const pageSize = 10;
  const { getOperations, getTotalCount, handleDelete } = useTrackingOperations();
  const [filters, setFilters] = useState<TrackingOperationFilter>({});

  const onDelete = useSendDataFetch((id: number) => handleDelete(id), {
    onSuccess: () => reload(),
  });

  const router = useRouter();

  const { options, state, errorMessage, reload, ...paginationRestProps } = usePaginationResource({
    pageSize,
    queryKey: ['tracking-operations', filters],
    getOptionsFn: async (page, pageSize) => {
      const start = (page - 1) * pageSize + 1;
      const end = start + pageSize;
      return await getOperations(start, end, filters);
    },
    getTotalCountFn: async () => {
      return await getTotalCount(filters);
    },
    clearCacheOnDestroy: true,
  });

  return (
    <div className="size-full overflow-hidden flex flex-col">
      <TrackingOperationHeader onFiltersApply={setFilters} />
      <div className="flex-1 overflow-hidden flex flex-col pb-8 relative">
        <div className="flex-1 overflow-y-auto min-h-0 p-4">
          <div className={cn(state !== PromiseState.Error && 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4')}>
            <FinListScreenHandler
              state={useCombineStates(onDelete.state, state)}
              errorMessage={errorMessage ?? getSafeErrorMessage(onDelete.error)}
              hasData={!!options.length}
              skeletonItems={pageSize}
              skeletonClassName="h-72"
            >
              {options.map((item, index) => {
                const currentDate = format(parseISO(item.date), 'yyyy-MM-dd');
                const prevDate = index > 0 ? format(parseISO(options[index - 1].date), 'yyyy-MM-dd') : null;

                const showSeparator = currentDate !== prevDate;

                return (
                  <div key={item.id ?? index}>
                    {showSeparator && (
                      <UiDateSeparator date={format(parseISO(item.date), 'd MMMM yyyy', { locale: uk })} />
                    )}
                    <TransactionCard
                      className="bg-primary-foreground"
                      handleDelete={(id) => onDelete.mutate(id)}
                      {...item}
                    />
                  </div>
                );
              })}
            </FinListScreenHandler>
          </div>
        </div>

        <FinPagination
          className="pt-3"
          {...paginationRestProps}
          pageSize={pageSize}
        />

        <div className="fixed bottom-6 right-6">
          <UiButton
            variant="primary"
            size="lg"
            className="rounded-full gap-2 shadow-xl"
            onClick={() => router.push('./profile/tracking-operations/add')}
          >
            <UiSvgIcon
              name="plus"
              size="sm"
            />
            Додати платіж
          </UiButton>
        </div>
      </div>
    </div>
  );
}
