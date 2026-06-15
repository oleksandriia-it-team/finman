'use client';

import { IncomeExpenseCard } from '@frontend/entities/operations/income-expense-card/card/income-expense-card';
import { usePaginationResource } from '@frontend/shared/hooks/pagination-resource/pagination-resource.hook';
import { FinPagination } from '@frontend/components/pagination/fin-pagination';
import { useRegularTransactions } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-transaction.hook';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useRouter } from 'next/navigation';
import { FinListScreenHandler } from '@frontend/components/screen-handlers/fin-list-screen-handler';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { calculateFromAndTo } from '@common/utils/calculate-from-and-to.util';
import { FinListPageWrapper } from '@frontend/components/wrappers/fin-list-page-wrapper';
import { FinListWrapper } from '@frontend/components/wrappers/fin-list-wrapper';
import { FinButtonListAction } from '@frontend/components/wrappers/fin-button-list-action';
import { useTranslations } from 'next-intl';
import { useIsMobile } from '@frontend/shared/hooks/is-mobile/is-mobile.hook';

export default function RegularIncomesExpensesScreen() {
  const pageSize = 5;
  const t = useTranslations('regular.screen');
  const { getPayments, getTotalCount, handleDelete } = useRegularTransactions();
  const isMobile = useIsMobile();

  const onDelete = useSendDataFetch((id: number) => handleDelete(id), {
    onSuccess: () => {
      reload();
    },
  });

  const router = useRouter();

  const {
    options,
    state: listState,
    appError: paginationAppError,
    reload,
    ...paginationRestProps
  } = usePaginationResource({
    pageSize,
    queryKey: ['regular-transactions'],
    getOptionsFn: async (page, pageSize) => {
      const { from, to } = calculateFromAndTo(page, pageSize);
      return getPayments(from, to);
    },
    getTotalCountFn: async () => {
      const count = await getTotalCount();
      return count ?? 0;
    },
    clearCacheOnDestroy: true,
  });

  return (
    <FinListPageWrapper>
      <p className="flex-none text-xl p-4">
        <b>{t('title')}</b>
      </p>

      <FinListWrapper state={listState}>
        <FinListScreenHandler
          state={listState}
          appError={paginationAppError}
          hasData={!!options.length}
          skeletonItems={pageSize}
          skeletonClassName="min-h-72"
        >
          {options.map((item, index) => (
            <IncomeExpenseCard
              key={item.id ?? index}
              {...item}
              handleDelete={async (id) => {
                onDelete.mutate(id);
              }}
              editPath={`regular-operations/edit/${item.id}`}
            />
          ))}
        </FinListScreenHandler>
      </FinListWrapper>

      <FinPagination
        className="pt-3"
        {...paginationRestProps}
        pageSize={pageSize}
      />

      <FinButtonListAction>
        {!isMobile && (
          <UiButton
            variant="primary"
            size="lg"
            className="rounded-full gap-2 shadow-xl"
            onClick={() => router.push('./regular-operations/add')}
          >
            <UiSvgIcon
              name="plus"
              size="sm"
            />
            {t('addButton')}
          </UiButton>
        )}
      </FinButtonListAction>
    </FinListPageWrapper>
  );
}
