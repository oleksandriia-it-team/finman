import { useSendDataFetch } from '@frontend/shared/hooks/send-data-fetch/send-data-fetch.hook';
import { useGlobalToast } from '@frontend/shared/hooks/global-toast/global-toast.hook';
import type { CreateBudgetPlanDto, UpdateBudgetPlanDto } from '@common/domains/budget-plan/budget-plan.schema';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import { budgetPlanService } from '@frontend/features/budget-plan/budget-plan-service/budget-plan.service';
import type { MonthEntry } from '@common/records/month-entry.record';

interface UseBudgetPlanFormOptions {
  initialData?: BudgetPlanDetailed;
  onSuccess?: () => void;
}

export type MonthOperationItem = MonthEntry & { id: number };

type UpdateEntry = UpdateBudgetPlanDto['otherEntries'][number];

interface SaveBudgetPlanPayload {
  plannedRegularEntryIds: number[];
  otherEntries: MonthOperationItem[];
}

export function useBudgetPlanForm({ initialData, onSuccess }: UseBudgetPlanFormOptions = {}) {
  const isEdit = !!initialData;
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
      console.log('>>> CREATE DTO:', JSON.stringify(dto, null, 2));
      return budgetPlanService.createItem(dto);
    },
    {
      onSuccess: () => {
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
