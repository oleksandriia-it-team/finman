'use client';

import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useRouter } from 'next/navigation';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { TransactionCard } from '@frontend/entities/operations/transaction-card/transaction-card';
import { TrackingOperationHeader } from '@frontend/features/tracking-operation/tracking-operation-header/tracking-operation-header';
import { useTrackingOperations } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/tracking-operations.hook';
import { FinListScreenHandler } from '@frontend/components/screen-handlers/fin-list-screen-handler';
import { UiDateSeparator } from '@frontend/ui/ui-date-separator/ui-date-separator';
import { TrackingOperationTypeFilter } from '@frontend/entities/operations/tracking-type-picker/tracking-operation-type-filter';
import { calculateFromAndTo } from '@common/utils/calculate-from-and-to.util';
import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';
import {
  TrackingOperationsStatisticDesktop,
  TrackingOperationsStatisticMobile,
} from '@frontend/features/tracking-operation/tracking-operations-statistic-block';
import { useGetBasicTrackingInformation } from './tracking-operation-filters/tracking-operation-hooks/get-tracking-op-information.hook';
import { useTrackingOperationFilters } from '@frontend/features/tracking-operation/tracking-operation-filters/tracking-operation-hooks/tracking-operation-filters.hook';
import { TrackingOperationQueryKey } from '@frontend/entities/tracking-operations/tracking-operation-query-key.constant';
import { useAuthorizedUser } from '@frontend/entities/auth/authorized-user.hook';
import { formatDate } from '@frontend/shared/utils/format-date.util';
import { DateFormatType } from '@frontend/shared/enums/date-type.enum';
import { FinListPageWrapper } from '@frontend/components/wrappers/fin-list-page-wrapper';
import { FinListWrapper } from '@frontend/components/wrappers/fin-list-wrapper';
import { FinButtonListAction } from '@frontend/components/wrappers/fin-button-list-action';
import { useCombineStates } from '@frontend/shared/hooks/combine-states/combine-states.hook';
import { getFirstAppError } from '@common/utils/get-first-app-error.util';

export function TrackingOperationScreen() {
  const isMobile = useIsMobile();

  const pageSize = 10;
  const { getOperations, handleDelete } = useTrackingOperations();
  const { filters, typeFilter, setTypeFilter } = useTrackingOperationFilters();

  const onDelete = useSendDataFetch((id: number) => handleDelete(id), {
    onSuccess: () => reload(),
  });

  const router = useRouter();
  const user = useAuthorizedUser();

  const {
    data: basicInformation,
    error: basicInformationError,
    state: basicInformationState,
  } = useGetBasicTrackingInformation();

  const {
    options,
    state: listState,
    reload,
    appError: paginationAppError,
    ...paginationRestProps
  } = usePaginationResource({
    pageSize,
    filters: filters,
    queryKey: [TrackingOperationQueryKey],
    getOptionsFn: async (page, pageSize, filters) => {
      const { from, to } = calculateFromAndTo(page, pageSize);
      return await getOperations(from, to, filters);
    },
    getTotalCountFn: () => Promise.resolve(0),
    clearCacheOnDestroy: true,
  });

  const state = useCombineStates(onDelete.state, listState, basicInformationState);

  return (
    <div className="size-full overflow-hidden flex flex-col">
      <TrackingOperationHeader />
      {!isMobile && (
        <div className="p-4">
          <TrackingOperationsStatisticDesktop
            income={basicInformation?.totalIncomes ?? 0}
            expense={basicInformation?.totalOutcomes ?? 0}
            loading={basicInformationState === PromiseState.Loading}
          />
        </div>
      )}

      <TrackingOperationTypeFilter
        active={typeFilter}
        onSelect={setTypeFilter}
      />
      <FinListPageWrapper>
        <FinListWrapper state={state}>
          <FinListScreenHandler
            state={state}
            appError={getFirstAppError(onDelete.error, paginationAppError, basicInformationError)}
            hasData={!!options.length}
            skeletonItems={pageSize}
            skeletonClassName="min-h-72"
          >
            {isMobile && (
              <div className="col-span-full">
                <TrackingOperationsStatisticMobile
                  income={basicInformation?.totalIncomes ?? 0}
                  expense={basicInformation?.totalOutcomes ?? 0}
                  loading={basicInformationState === PromiseState.Loading}
                />
              </div>
            )}

            {options.map((item, index) => {
              const currentDate = formatDate(item.date, DateFormatType.LongWithYear, user.locale, user.language);
              const prevDate =
                index > 0
                  ? formatDate(options[index - 1].date, DateFormatType.LongWithYear, user.locale, user.language)
                  : null;

              const showSeparator = currentDate !== prevDate;

              return (
                <div
                  key={item.id ?? index}
                  className="contents"
                >
                  {showSeparator && (
                    <div className="col-span-full">
                      <UiDateSeparator date={formatDate(item.date, DateFormatType.Short, user.locale, user.language)} />
                    </div>
                  )}
                  <TransactionCard
                    handleDelete={(id) => onDelete.mutate(id)}
                    {...item}
                  />
                </div>
              );
            })}
          </FinListScreenHandler>
        </FinListWrapper>
        <FinPagination
          className="pt-3"
          {...paginationRestProps}
          totalCount={basicInformation?.totalCount ?? 0}
          pageSize={pageSize}
        />
        <FinButtonListAction>
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
        </FinButtonListAction>
      </FinListPageWrapper>
    </div>
  );
}
