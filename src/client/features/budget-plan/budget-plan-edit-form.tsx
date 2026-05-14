'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormProvider, useFieldArray } from 'react-hook-form';
import { MonthTitles } from '@common/constants/month-titles.constant';
import { ExpenseCategories } from '@common/enums/categories.enum';
import { TypeEntryFilter } from '@common/enums/entry.enum';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import { BudgetPlanEntrySection } from '@frontend/entities/budget-plan/ui/budget-plan-entry-section';
import { TrackingOperationTypeFilter } from '@frontend/entities/operations/tracking-type-picker/tracking-operation-type-filter';
import type { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiCard } from '@frontend/ui/ui-card/ui-card';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useBudgetPlanForm } from './hooks/budget-plan-form.hook';
import { useRegularEntryOptions } from './hooks/use-regular-entry-options.hook';
import { PlanOperationsStatisticDesktop } from './plan-operations-statistic-block';

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
  const [typeFilter, setTypeFilter] = useState<TypeEntryFilter>(TypeEntryFilter.All);

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

  const filteredRegularEntries = useMemo(
    () =>
      allRegularEntries.filter((entry) => {
        if (typeFilter === TypeEntryFilter.All) return true;
        return (entry.type as string) === typeFilter;
      }),
    [allRegularEntries, typeFilter],
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

  const filteredOtherEntries = useMemo(
    () =>
      otherEntriesWithIndex.filter(({ entry }) => {
        if (!entry) return false;
        if (typeFilter === TypeEntryFilter.All) return true;
        return entry.type === typeFilter;
      }),
    [otherEntriesWithIndex, typeFilter],
  );

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

  const otherEntriesForSection = filteredOtherEntries.map(({ fieldId, entry }) => ({
    id: entry?.id ?? -Math.abs(Number(String(fieldId).replace(/\D/g, '')) || 1),
    title: entry?.title ?? '',
    sum: entry?.sum ?? 0,
    type: entry?.type ?? 'expense',
    category: (entry?.category ?? ExpenseCategories.Misc) as keyof typeof CategoriesMapping,
    description: entry?.description,
  }));

  return (
    <div className="size-full overflow-y-auto bg-[#eef3ff]">
      <FormProvider {...methods}>
        <form
          onSubmit={submit}
          className="mx-auto flex min-h-full w-full max-w-7xl flex-col px-4 pb-28 pt-0 md:px-8 md:pb-10 md:pt-7"
        >
          <div className="sticky top-0 z-20 -mx-4 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur md:hidden">
            <div className="flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="flex items-center gap-3 text-slate-950"
              >
                <UiSvgIcon
                  name="arrow-left"
                  size="sm"
                />
                <span className="text-2xl font-bold leading-none">Оптимізація витрат</span>
              </button>

              <div className="flex items-center gap-2 text-primary">
                <UiSvgIcon
                  name="pencil"
                  size="sm"
                />
                <span className="text-lg font-medium">Редагування</span>
              </div>
            </div>
          </div>

          <div className="space-y-5 pt-6 md:pt-0">
            <div className="space-y-3 md:hidden">
              <div className="flex items-center gap-2 text-slate-500">
                <UiSvgIcon
                  name="calendar"
                  size="sm"
                />
                <span className="text-base">Поточний план</span>
              </div>

              <h1 className="text-3xl font-bold leading-tight text-slate-950">
                {MonthTitles[initialData.month]} {initialData.year}
              </h1>
            </div>

            <div className="hidden items-start justify-between gap-4 md:flex">
              <div>
                <div className="mb-2 flex items-center gap-2 text-slate-500">
                  <UiSvgIcon
                    name="calendar"
                    size="sm"
                  />
                  <span className="text-sm">Поточний план</span>
                </div>

                <h1 className="text-3xl font-bold text-slate-950">
                  {MonthTitles[initialData.month]} {initialData.year}
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-2xl border border-white/80 bg-white px-4 py-3 text-sm text-primary shadow-sm">
                  <UiSvgIcon
                    name="pencil"
                    size="sm"
                  />
                  <span>Редагування</span>
                  <UiSvgIcon
                    name="check"
                    size="sm"
                  />
                </div>

                <UiButton
                  variant="primary"
                  size="sm"
                  className="gap-2 rounded-2xl px-4 py-5 text-sm shadow-md"
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

            <div className="hidden md:block">
              <PlanOperationsStatisticDesktop
                income={totalIncome}
                expense={totalExpense}
                balance={balance}
              />
            </div>

            <div className="hidden md:block">
              <TrackingOperationTypeFilter
                active={typeFilter}
                onSelect={setTypeFilter}
              />
            </div>

            <div className="space-y-4">
              {filteredRegularEntries.length === 0 ? (
                <UiCard className="rounded-4xl border border-dashed border-slate-300 bg-white/65 px-4 py-5 text-center text-slate-500 shadow-none">
                  Немає регулярних операцій для цього фільтра
                </UiCard>
              ) : (
                <BudgetPlanEntrySection
                  entries={filteredRegularEntries.map((entry) => ({
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
            </div>

            <div className="space-y-4">
              {otherEntriesForSection.length > 0 && (
                <BudgetPlanEntrySection
                  entries={otherEntriesForSection}
                  title="Лише цього місяця"
                  iconName="calendar3"
                  countLabel={`${otherEntriesFields.length} записів`}
                  frequencyLabel="Одноразово"
                  onDelete={(id) => {
                    const target = filteredOtherEntries.find(({ fieldId, entry }) => {
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
                <button
                  type="button"
                  className="flex min-h-28 items-center justify-center gap-2 rounded-4xl border-2 border-dashed border-slate-300 bg-transparent px-4 py-5 text-lg font-medium text-primary transition-colors hover:bg-primary/5"
                  onClick={() => router.push('/profile/budget/plans/add')}
                >
                  <UiSvgIcon
                    name="plus"
                    size="sm"
                  />
                  Додати операцію
                </button>
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 z-20 mt-auto -mx-4 border-t border-slate-200 bg-[#eef3ff]/95 px-4 py-4 backdrop-blur md:mx-0 md:border-0 md:bg-transparent md:px-0 md:py-6">
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

export default BudgetPlanEditForm;
