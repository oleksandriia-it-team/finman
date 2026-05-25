import { useQueryClient } from '@tanstack/react-query';
import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import type { CreateBudgetPlanDto, UpdateBudgetPlanDto } from '@common/domains/budget-plan/budget-plan.schema';
import { budgetPlanService } from '@frontend/features/budget-plan/budget-plan-service/budget-plan.service';
import type { MonthEntry } from '@common/records/month-entry.record';

interface UseBudgetPlanFormOptions {
  isEdit: boolean;
  onSuccess?: () => void;
}

export type MonthOperationItem = MonthEntry & { id: number };

type UpdateEntry = UpdateBudgetPlanDto['otherEntries'][number];

interface SaveBudgetPlanPayload {
  plannedRegularEntryIds: number[];
  otherEntries: MonthOperationItem[];
}

export function useBudgetPlanForm({ isEdit, onSuccess }: UseBudgetPlanFormOptions) {
  const queryClient = useQueryClient();
  const showToast = useGlobalToast((state) => state.showToast);

  const savePlan = useSendDataFetch(
    async ({ plannedRegularEntryIds, otherEntries }: SaveBudgetPlanPayload) => {
      if (isEdit) {
        const mappedEntries: UpdateEntry[] = otherEntries.map(({ id, ...entry }) => ({
          ...entry,
          ...(id > 0 ? { id } : {}),
        }));

        const dto: UpdateBudgetPlanDto = {
          plannedRegularEntryIds,
          otherEntries: mappedEntries,
        };
        return budgetPlanService.updateItem(dto);
      }

      const mappedEntries: MonthEntry[] = otherEntries.map(({ ...entry }) => entry);

      const dto: CreateBudgetPlanDto = {
        plannedRegularEntryIds,
        otherEntries: mappedEntries,
      };
      return budgetPlanService.createItem(dto);
    },
    {
      onSuccess: async () => {
        await queryClient.refetchQueries({ queryKey: ['budget-plan'] });
        showToast({
          title: 'Успішно',
          description: isEdit ? 'Бюджетний план оновлено' : 'Бюджетний план створено',
          variant: 'success',
        });
        onSuccess?.();
      },
      onError: (err) => {
        const message = err instanceof Error ? err.message : 'Невідома помилка';
        showToast({
          title: `Помилка: ${message}`,
          description: 'Під час збереження виникла помилка',
          variant: 'destructive',
        });
      },
    },
  );

  return {
    submit: savePlan.mutate,
    state: savePlan.state,
    error: savePlan.error,
    isEdit,
  };
}
