import { useQueryClient } from '@tanstack/react-query';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import type { CreateBudgetPlanDto, UpdateBudgetPlanDto } from '@common/domains/budget-plan/budget-plan.schema';
import { budgetPlanService } from '@frontend/features/budget-plan/budget-plan-service/budget-plan.service';
import type { MonthEntry } from '@common/records/month-entry.record';
import { useTranslations } from 'next-intl';

interface UseBudgetPlanFormOptions {
  isEdit: boolean;
}

export type MonthOperationItem = MonthEntry & { id: number };

type UpdateEntry = UpdateBudgetPlanDto['otherEntries'][number];

interface SaveBudgetPlanPayload {
  plannedRegularEntryIds: number[];
  otherEntries: MonthOperationItem[];
}

export function useBudgetPlanForm({ isEdit }: UseBudgetPlanFormOptions) {
  const queryClient = useQueryClient();
  const showToast = useGlobalToast((state) => state.showToast);
  const t = useTranslations('budgetPlan.save');
  const tCommon = useTranslations('common');

  const savePlan = useSendDataFetch(
    async ({ plannedRegularEntryIds, otherEntries }: SaveBudgetPlanPayload) => {
      const baseEntries = otherEntries.map((entry) => ({
        title: entry.title,
        description: entry.description ?? '',
        sum: entry.sum,
        type: entry.type,
        category: entry.category,
        selected: entry.selected,
        priority: entry.priority,
      }));

      if (isEdit) {
        const mappedEntries: UpdateEntry[] = baseEntries.map((entry, index) => {
          const id = otherEntries[index].id;
          return id > 0 ? ({ ...entry, id } as UpdateEntry) : (entry as UpdateEntry);
        });

        const dto: UpdateBudgetPlanDto = {
          plannedRegularEntryIds,
          otherEntries: mappedEntries,
        };
        return budgetPlanService.updateItem(dto);
      }

      const dto: CreateBudgetPlanDto = {
        plannedRegularEntryIds,
        otherEntries: baseEntries as CreateBudgetPlanDto['otherEntries'],
      };
      return budgetPlanService.createItem(dto);
    },
    {
      onSuccess: async () => {
        await queryClient.refetchQueries({ queryKey: ['budget-plan'] });
        showToast({
          title: tCommon('successTitle'),
          description: isEdit ? t('successUpdated') : t('successCreated'),
          variant: 'success',
        });
      },
      onError: (err) => {
        const message = err instanceof Error ? err.message : tCommon('unknownError');
        showToast({
          title: t('errorTitle', { message }),
          description: t('errorDescription'),
          variant: 'destructive',
        });
      },
    },
  );

  return {
    submit: savePlan.mutate,
    submitAsync: savePlan.mutateAsync,
    state: savePlan.state,
    error: savePlan.error,
    isEdit,
  };
}
