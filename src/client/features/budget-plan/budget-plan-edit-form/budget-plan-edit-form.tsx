'use client';

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useFieldArray } from 'react-hook-form';
import { ExpenseCategories } from '@common/enums/categories.enum';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import { BudgetPlanEntrySection } from '@frontend/entities/budget-plan/ui/budget-plan-entry-section';
import type { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { UiButton } from '@frontend/shared/ui/ui-button/ui-button';
import { UiCard } from '@frontend/shared/ui/ui-card/ui-card';
import { UiSvgIcon } from '@frontend/shared/ui/ui-svg-icon/ui-svg-icon';
import { useBudgetPlanForm } from '../hooks/budget-plan-form.hook';
import { useRegularEntryOptions } from '../hooks/use-regular-entry-options.hook';
import { PlanOperationsStatisticDesktop } from '../budget-plan-block/plan-operations-statistic-block';
import { CurrentPlanHeader } from '@frontend/features/budget-plan/current-plan-header-date';

interface BudgetPlanEditFormProps {
  initialData: BudgetPlanDetailed;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function sumEntriesByType(entries: Array<{ type: string; sum?: number }>, type: 'income' | 'expense') {
  return entries.reduce((acc, entry) => (entry.type === type ? acc + (entry.sum ?? 0) : acc), 0);
}

export function BudgetPlanEditForm({ initialData, onSuccess, onCancel }: Readonly<BudgetPlanEditFormProps>) {
  const router = useRouter();
  const { methods, submit } = useBudgetPlanForm(initialData, onSuccess);
  const { allRegularEntries } = useRegularEntryOptions();

  const { fields: otherEntriesFields, remove } = useFieldArray({
    control: methods.control,
    name: 'otherEntries',
  });

  const selectedRegularIds = methods.watch('plannedRegularEntryIds');
  const watchedOtherEntries = methods.watch('otherEntries');

  const selectedRegularEntries = useMemo(
    () => allRegularEntries.filter((entry) => (selectedRegularIds ?? []).includes(entry.id)),
    [allRegularEntries, selectedRegularIds],
  );

  const otherEntriesWithIndex = useMemo(
    () =>
      otherEntriesFields.map((field, index) => ({
        fieldId: field.id,
        index,
        entry: watchedOtherEntries?.[index],
      })),
    [otherEntriesFields, watchedOtherEntries],
  );

  const otherEntriesForSection = otherEntriesWithIndex
    .filter(({ entry }) => !!entry)
    .map(({ fieldId, entry }) => ({
      id: entry?.id ?? -Math.abs(Number(String(fieldId).replace(/\D/g, '')) || 1),
      title: entry?.title ?? '',
      sum: entry?.sum ?? 0,
      type: entry?.type ?? 'expense',
      category: (entry?.category ?? ExpenseCategories.Misc) as keyof typeof CategoriesMapping,
      description: entry?.description,
    }));

  const totalIncome =
    sumEntriesByType(selectedRegularEntries, 'income') + sumEntriesByType(watchedOtherEntries ?? [], 'income');
  const totalExpense =
    sumEntriesByType(selectedRegularEntries, 'expense') + sumEntriesByType(watchedOtherEntries ?? [], 'expense');
  const balance = totalIncome - totalExpense;

  const toggleRegularEntry = (id: number) => {
    const currentIds = selectedRegularIds ?? [];
    const next = currentIds.includes(id) ? currentIds.filter((value) => value !== id) : [...currentIds, id];
    methods.setValue('plannedRegularEntryIds', next, { shouldValidate: true, shouldDirty: true });
  };

  return (
    <div className="size-full overflow-y-auto bg-background">
      <FormProvider {...methods}>
        <form
          onSubmit={submit}
          className="mx-auto flex min-h-full w-full max-w-7xl flex-col px-2 pb-5 pt-0 md:px-8 md:pb-10 md:pt-7"
        >
          <div className="space-y-5 pt-6 md:pt-0">
            <CurrentPlanHeader
              month={initialData.month}
              year={initialData.year}
            />

            <div className="hidden md:block">
              <PlanOperationsStatisticDesktop
                income={totalIncome}
                expense={totalExpense}
                balance={balance}
              />
            </div>

            <div className="overflow-y-auto space-y-4 max-h-auto md:max-h-auto pr-1">
              {allRegularEntries.length === 0 ? (
                <UiCard className="rounded-4xl border border-dashed border-border bg-white/65 px-4 py-5 text-center text-slate-500 shadow-none">
                  Немає регулярних операцій
                </UiCard>
              ) : (
                <BudgetPlanEntrySection
                  entries={allRegularEntries.map((entry) => ({
                    id: entry.id,
                    title: entry.title,
                    type: entry.type as 'income' | 'expense',
                    sum: entry.sum,
                    category: entry.category,
                    description: entry.description,
                    selected: (selectedRegularIds ?? []).includes(entry.id),
                  }))}
                  title="Регулярні операції"
                  iconName="arrow-left-right"
                  countLabel={`${selectedRegularEntries.length} активні`}
                  frequencyLabel="Щомісяця"
                  selectable
                  onToggleSelect={toggleRegularEntry}
                />
              )}

              {otherEntriesForSection.length > 0 && (
                <BudgetPlanEntrySection
                  entries={otherEntriesForSection}
                  title="Лише цього місяця"
                  iconName="calendar3"
                  countLabel={`${otherEntriesFields.length} записів`}
                  frequencyLabel="Одноразово"
                  onDelete={(id) => {
                    const target = otherEntriesWithIndex.find(({ fieldId, entry }) => {
                      const currentId = entry?.id ?? -Math.abs(Number(String(fieldId).replace(/\D/g, '')) || 1);
                      return currentId === id;
                    });
                    if (typeof target?.index === 'number') {
                      remove(target.index);
                    }
                  }}
                />
              )}

              <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                <UiButton
                  type="button"
                  className="w-full min-h-28 p-4 rounded-4xl border-2 border-dashed border-border bg-transparent text-lg text-primary shadow-none hover:bg-primary/5"
                  onClick={() => router.push('/profile/budget/plans/add')}
                >
                  <UiSvgIcon
                    name="plus"
                    size="sm"
                  />
                  Додати операцію
                </UiButton>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 mx-4 mt-auto bg-background/95 ">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <UiButton
                type="submit"
                variant="primary"
                className="w-full py-6 text-base font-semibold shadow-md"
              >
                Зберегти зміни
              </UiButton>
              <UiButton
                type="button"
                variant="default"
                className="w-full py-6 text-base font-semibold"
                onClick={onCancel}
              >
                Скасувати
              </UiButton>
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
