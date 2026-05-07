'use client';

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
import { format } from 'date-fns';
import { uk } from 'date-fns/locale/uk';
import { TrackingOperationTypeFilter } from '@frontend/entities/operations/tracking-type-picker/tracking-operation-type-filter';
import { calculateFromAndTo } from '@common/utils/calculate-from-and-to.util';
import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import {
  TrackingOperationsStatisticDesktop,
  TrackingOperationsStatisticMobile,
} from '@frontend/features/tracking-operation/tracking-operations-statistic-block';
import { useGetBasicTrackingInformation } from './tracking-operation-filters/tracking-operation-hooks/get-tracking-op-information.hook';
import { useTrackingOperationFilters } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/tracking-operation-filters.hook';

export function TrackingOperationScreen() {
  const isMobile = useIsMobile();

  const pageSize = 10;
  const { getOperations, handleDelete } = useTrackingOperations();
  const { filters, typeFilter, setTypeFilter } = useTrackingOperationFilters();

  const onDelete = useSendDataFetch((id: number) => handleDelete(id), {
    onSuccess: () => reload(),
  });

  const router = useRouter();

  // TODO: add using status from here in FinListScreenHandler
  const { data: basicInformation } = useGetBasicTrackingInformation();

  const { options, state, errorMessage, reload, ...paginationRestProps } = usePaginationResource({
    pageSize,
    filters: filters,
    queryKey: ['tracking-operations'],
    getOptionsFn: async (page, pageSize, filters) => {
      const { from, to } = calculateFromAndTo(page, pageSize);
      return await getOperations(from, to, filters);
    },
    getTotalCountFn: () => Promise.resolve(0),
    clearCacheOnDestroy: true,
  });

  return (
    <div className="size-full overflow-hidden flex flex-col">
      <TrackingOperationHeader />
      {!isMobile && (
        <div className="p-4">
          <TrackingOperationsStatisticDesktop
            income={basicInformation?.totalIncomes ?? 0}
            expense={basicInformation?.totalOutcomes ?? 0}
          />
        </div>
      )}

      <TrackingOperationTypeFilter
        active={typeFilter}
        onSelect={setTypeFilter}
      />
      <div className="flex-1 overflow-hidden flex flex-col pb-8 relative">
        <div className="flex-1 overflow-y-auto min-h-0 p-4">
          <FinListScreenHandler
            state={useCombineStates(onDelete.state, state)}
            errorMessage={errorMessage ?? getSafeErrorMessage(onDelete.error)}
            hasData={!!options.length}
            skeletonItems={pageSize}
            skeletonClassName="h-72"
          >
            <div className={cn(state !== PromiseState.Error && 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4')}>
              {isMobile && (
                <div className="col-span-full">
                  <TrackingOperationsStatisticMobile
                    income={basicInformation?.totalIncomes ?? 0}
                    expense={basicInformation?.totalOutcomes ?? 0}
                  />
                </div>
              )}

              {options.map((item, index) => {
                const currentDate = format(item.date, 'yyyy-MM-dd');
                const prevDate = index > 0 ? format(options[index - 1].date, 'yyyy-MM-dd') : null;

                const showSeparator = currentDate !== prevDate;

                return (
                  <div
                    key={item.id ?? index}
                    className="contents"
                  >
                    {showSeparator && (
                      <div className="col-span-full">
                        <UiDateSeparator date={format(item.date, 'd MMMM yyyy', { locale: uk })} />
                      </div>
                    )}
                    <TransactionCard
                      handleDelete={(id) => onDelete.mutate(id)}
                      {...item}
                    />
                  </div>
                );
              })}
            </div>
          </FinListScreenHandler>
        </div>
        <FinPagination
          className="pt-3"
          {...paginationRestProps}
          totalCount={basicInformation?.totalCount ?? 0}
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
