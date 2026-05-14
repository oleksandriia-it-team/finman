'use client';

import { useRouter } from 'next/navigation';
import { FormProvider, useFieldArray } from 'react-hook-form';
import { useBudgetPlanForm } from './budget-plan-form.hook';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiFormLayout } from '@frontend/ui/ui-form-layout/ui-form-layout';
import { BudgetPlanFormSideBlock } from './budget-plan-form-side-block/budget-plan-form-side-block';
import { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';
import { UiIconBadge } from '@frontend/ui/ui-icon-badge/ui-icon-badge';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { cn } from '@frontend/shared/utils/cn.util';
import { MonthTitles } from '@common/constants/month-titles.constant';
import { useRegularEntryOptions } from './hooks/use-regular-entry-options.hook';

interface BudgetPlanFormProps {
  initialData?: BudgetPlanDetailed;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BudgetPlanForm({ initialData, onSuccess, onCancel }: Readonly<BudgetPlanFormProps>) {
  const router = useRouter();
  const { methods, submit, isEdit } = useBudgetPlanForm(initialData, onSuccess);

  const { fields: otherEntriesFields, remove } = useFieldArray({
    control: methods.control,
    name: 'otherEntries',
  });

  const selectedRegularIds = methods.watch('plannedRegularEntryIds');
  const { filteredRegularEntries } = useRegularEntryOptions();

  const toggleRegularEntry = (id: number) => {
    const current = selectedRegularIds ?? [];
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    methods.setValue('plannedRegularEntryIds', next, { shouldValidate: true });
  };

  return (
    <div className="flex flex-row size-full">
      <FormProvider {...methods}>
        <UiFormLayout.Root
          onSubmit={submit}
          style={{ minWidth: 'min(25rem, 100%)' }}
          className="w-0 flex-1"
        >
          {/* Header */}
          <UiFormLayout.Header>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground flex items-center gap-1.5 mb-1">
                  <UiSvgIcon
                    name="calendar"
                    size="sm"
                  />
                  Поточний план
                </p>
                {initialData && (
                  <h1 className="text-2xl font-bold">
                    {MonthTitles[initialData.month]} {initialData.year}
                  </h1>
                )}
              </div>
            </div>
            <UiFormLayout.Description>
              {isEdit ? 'Оптимізація витрат' : 'Створіть бюджетний план на поточний місяць'}
            </UiFormLayout.Description>
          </UiFormLayout.Header>

          {/* Regular entries — checkboxes */}
          <UiFormLayout.Section label="Регулярні операції">
            {filteredRegularEntries.length === 0 ? (
              <p className="text-sm text-muted-foreground">Немає регулярних операцій</p>
            ) : (
              <div className="space-y-2">
                {filteredRegularEntries.map((option) => {
                  const isChecked = (selectedRegularIds ?? []).includes(option.value);
                  return (
                    <label
                      key={option.value}
                      className="bg-card rounded-2xl p-4 flex items-center gap-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div
                        className={cn(
                          'w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors',
                          isChecked ? 'bg-primary border-primary' : 'border-border',
                        )}
                      >
                        {isChecked && (
                          <UiSvgIcon
                            name="check"
                            size="sm"
                            className="text-primary-foreground"
                          />
                        )}
                      </div>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={isChecked}
                        onChange={() => toggleRegularEntry(option.value)}
                      />
                      <span className="text-sm font-medium">{option.label}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </UiFormLayout.Section>

          {/* Month-only entries */}
          <UiFormLayout.Section label="Лише цього місяця">
            {otherEntriesFields.length === 0 && (
              <p className="text-sm text-muted-foreground">Немає операцій цього місяця</p>
            )}

            <div className="space-y-2">
              {otherEntriesFields.map((field, index) => {
                const entry = methods.getValues(`otherEntries.${index}`);
                const categoryKey = (entry.category ?? 'expense-misc') as keyof typeof CategoriesMapping;
                const categoryStyles = CategoriesMapping[categoryKey] ?? CategoriesMapping['expense-misc'];
                const isIncome = entry.type === 'income';

                return (
                  <div
                    key={field.id}
                    className="bg-card rounded-2xl p-4 flex items-center justify-between shadow-sm"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <UiIconBadge
                        variant={categoryStyles.variant}
                        name={categoryStyles.icon}
                        size="lg"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-sm">{entry.title || '—'}</p>
                        <p className="text-xs text-muted-foreground">{isIncome ? 'Дохід' : 'Витрата'} · Одноразово</p>
                      </div>
                    </div>

                    <p
                      className={cn(
                        'font-bold text-sm whitespace-nowrap mr-3',
                        isIncome ? 'text-success' : 'text-destructive',
                      )}
                    >
                      {isIncome ? '+' : '-'} <FinTransformCurrency value={entry.sum ?? 0} />
                    </p>

                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-muted-foreground hover:text-destructive transition-colors"
                      aria-label="Видалити"
                    >
                      <UiSvgIcon
                        name="trash-2"
                        size="sm"
                      />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Navigate to /add to add a new month operation */}
            <UiButton
              type="button"
              className="w-full mt-3 border-dashed"
              onClick={() => router.push('/profile/budget/plans/add')}
            >
              <UiSvgIcon
                name="plus"
                size="sm"
              />
              + Додати операцію
            </UiButton>
          </UiFormLayout.Section>

          <UiFormLayout.Actions>
            <UiButton
              type="submit"
              variant="primary"
              className="w-full py-6 font-semibold shadow-md"
            >
              Зберегти
            </UiButton>
            <UiButton
              type="button"
              variant="default"
              className="w-full py-6 font-semibold"
              onClick={onCancel}
            >
              Скасувати
            </UiButton>
          </UiFormLayout.Actions>
        </UiFormLayout.Root>
      </FormProvider>

      <div className="size-full flex-2 max-lg:hidden">
        <BudgetPlanFormSideBlock />
      </div>
    </div>
  );
}

export default BudgetPlanForm;
