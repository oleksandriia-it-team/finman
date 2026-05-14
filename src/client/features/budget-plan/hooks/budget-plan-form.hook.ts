'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGlobalToast } from 'src/client/shared/hooks/global-toast/global-toast.hook';
import type { BudgetPlanDetailed } from 'src/common/records/budget-plan.record';
import type { CreateBudgetPlanDto, UpdateBudgetPlanDto } from 'src/common/domains/budget-plan/budget-plan.schema';
import { CreateBudgetPlanSchema, UpdateBudgetPlanSchema } from 'src/common/domains/budget-plan/budget-plan.schema';
import { budgetPlanService } from '@frontend/features/budget-plan/budget-plan-service/budget-plan.service';

interface BudgetPlanFormData {
  plannedRegularEntryIds: number[];
  otherEntries: Array<{
    id?: number;
    title: string;
    description?: string;
    sum: number;
    type: 'expense' | 'income';
    category?: string;
    selected: boolean;
    priority: number;
  }>;
}

export function useBudgetPlanForm(initialData?: BudgetPlanDetailed, onSuccess?: () => void) {
  const showToast = useGlobalToast((state) => state.showToast);
  const isEdit = !!initialData;

  const schema = isEdit ? UpdateBudgetPlanSchema : CreateBudgetPlanSchema;

  const methods = useForm<BudgetPlanFormData>({
    resolver: zodResolver(schema) as never,
    defaultValues: {
      plannedRegularEntryIds: initialData?.plannedRegularEntries?.map((r) => r.id) ?? [],
      otherEntries: initialData?.otherEntries ?? [],
    } as never,
  });

  const submit = methods.handleSubmit(
    async (data: BudgetPlanFormData) => {
      try {
        const mappedOtherEntries = data.otherEntries.map((entry) => ({
          ...entry,
          description: entry.description ?? '',
        }));

        if (isEdit) {
          const updateData: UpdateBudgetPlanDto = {
            plannedRegularEntryIds: data.plannedRegularEntryIds,
            otherEntries: mappedOtherEntries as UpdateBudgetPlanDto['otherEntries'],
          };
          await budgetPlanService.updateItem(updateData);
        } else {
          const createData: CreateBudgetPlanDto = {
            plannedRegularEntryIds: data.plannedRegularEntryIds,
            otherEntries: mappedOtherEntries as CreateBudgetPlanDto['otherEntries'],
          };
          await budgetPlanService.createItem(createData);
        }

        showToast({
          title: 'Успіх',
          description: isEdit ? 'Бюджетний план оновлено' : 'Бюджетний план створено',
          variant: 'success',
        });
        onSuccess?.();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Невідома помилка';
        showToast({
          title: `Помилка: ${message}`,
          description: 'Не вдалось зберегти бюджетний план',
          variant: 'destructive',
        });
      }
    },
    () => {
      showToast({
        title: 'Помилка: некоректні дані форми',
        description: 'Будь ласка, перевірте поля форми',
        variant: 'destructive',
      });
    },
  );

  return { methods, submit, isEdit };
}
