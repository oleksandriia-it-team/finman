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
import { UiCard } from '@frontend/ui/ui-card/ui-card';
import { FinTransformCurrency } from '@frontend/components/transform-currency/fin-transform-currency';
import { cn } from '@frontend/shared/utils/cn.util';
import { MonthTitles } from '@common/constants/month-titles.constant';
import { useRegularEntryOptions } from './hooks/use-regular-entry-options.hook';
import type { RegularEntry } from '@common/records/regular-entry.record';
import type { AllCategories } from '@common/enums/categories.enum';
import { ExpenseCategories } from '@common/enums/categories.enum';

interface BudgetPlanFormProps {
  initialData?: BudgetPlanDetailed;
  onSuccess?: () => void;
  onCancel?: () => void;
}

// ─── Regular entry card with checkbox ────────────────────────────────────────

interface RegularEntryCardProps {
  entry: RegularEntry;
  isChecked: boolean;
  onToggle: (id: number) => void;
}

function RegularEntryCard({ entry, isChecked, onToggle }: Readonly<RegularEntryCardProps>) {
  const categoryKey = entry.category as keyof typeof CategoriesMapping;
  const categoryStyles = CategoriesMapping[categoryKey] ?? CategoriesMapping[ExpenseCategories.Misc];
  // TypeEntry is const enum — compare via string cast to avoid TS2367
  const isIncome = (entry.type as string) === 'income';

  return (
    <button
      type="button"
      onClick={() => onToggle(entry.id)}
      className={cn(
        'w-full rounded-4xl shadow-lg p-4 flex flex-col gap-3 text-left transition-all border-2 bg-card',
        isChecked ? 'border-primary' : 'border-transparent',
      )}
    >
      <div className="flex items-start justify-between">
        <UiIconBadge
          variant={categoryStyles.variant}
          name={categoryStyles.icon}
          size="lg"
        />
        <div
          className={cn(
            'w-6 h-6 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors',
            isChecked ? 'bg-primary border-primary' : 'border-border bg-background',
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
      </div>

      <div className="min-w-0">
        <p className="font-semibold text-sm line-clamp-1">{entry.title}</p>
        <p className="text-xs text-muted-foreground">{isIncome ? 'Дохід' : 'Витрата'} &middot; Щомісяця</p>
      </div>

      <p className={cn('font-bold text-lg', isIncome ? 'text-success' : 'text-destructive')}>
        {isIncome ? '+ ' : '- '}
        <FinTransformCurrency value={entry.sum ?? 0} />
      </p>
    </button>
  );
}

// ─── Month entry card with delete ────────────────────────────────────────────

interface MonthEntryCardProps {
  title: string;
  sum: number;
  // Required — caller must supply a fallback (e.g. ExpenseCategories.Misc)
  category: AllCategories;
  // 'income' | 'expense' as plain strings (TypeEntry const enum values)
  type: string;
  onDelete: () => void;
}

function MonthEntryCard({ title, sum, type, category, onDelete }: Readonly<MonthEntryCardProps>) {
  const categoryStyles = CategoriesMapping[category] ?? CategoriesMapping[ExpenseCategories.Misc];
  const isIncome = type === 'income';

  return (
    <UiCard className="rounded-4xl shadow-lg p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <UiIconBadge
          variant={categoryStyles.variant}
          name={categoryStyles.icon}
          size="lg"
        />
        <button
          type="button"
          onClick={onDelete}
          className="text-muted-foreground hover:text-destructive transition-colors"
          aria-label="Видалити"
        >
          <UiSvgIcon
            name="trash-2"
            size="sm"
          />
        </button>
      </div>

      <div className="min-w-0">
        <p className="font-semibold text-sm line-clamp-1">{title || '—'}</p>
        <p className="text-xs text-muted-foreground">{isIncome ? 'Дохід' : 'Витрата'} &middot; Одноразово</p>
      </div>

      <p className={cn('font-bold text-lg', isIncome ? 'text-success' : 'text-destructive')}>
        {isIncome ? '+ ' : '- '}
        <FinTransformCurrency value={sum ?? 0} />
      </p>
    </UiCard>
  );
}

// ─── Main form ────────────────────────────────────────────────────────────────

export function BudgetPlanForm({ initialData, onSuccess, onCancel }: Readonly<BudgetPlanFormProps>) {
  const router = useRouter();
  const { methods, submit, isEdit } = useBudgetPlanForm(initialData, onSuccess);

  const { fields: otherEntriesFields, remove } = useFieldArray({
    control: methods.control,
    name: 'otherEntries',
  });

  const selectedRegularIds: number[] = methods.watch('plannedRegularEntryIds') ?? [];
  const { allRegularEntries } = useRegularEntryOptions();

  const toggleRegularEntry = (id: number) => {
    const next = selectedRegularIds.includes(id)
      ? selectedRegularIds.filter((x) => x !== id)
      : [...selectedRegularIds, id];
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
          <UiFormLayout.Header>
            {initialData && (
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <UiSvgIcon
                  name="calendar"
                  size="sm"
                />
                <span className="text-sm">Поточний план</span>
                <span className="text-foreground font-bold ml-1">
                  {MonthTitles[initialData.month]} {initialData.year}
                </span>
              </div>
            )}
            <UiFormLayout.Title>{isEdit ? 'Оптимізація витрат' : 'Бюджетний план'}</UiFormLayout.Title>
            <UiFormLayout.Description>
              {isEdit
                ? 'Оберіть регулярні операції та керуйте місячними операціями'
                : 'Створіть бюджетний план на поточний місяць'}
            </UiFormLayout.Description>
          </UiFormLayout.Header>

          <UiFormLayout.Section label="Регулярні операції">
            {allRegularEntries.length === 0 ? (
              <p className="text-sm text-muted-foreground">Немає регулярних операцій</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allRegularEntries.map((entry) => (
                  <RegularEntryCard
                    key={entry.id}
                    entry={entry}
                    isChecked={selectedRegularIds.includes(entry.id)}
                    onToggle={toggleRegularEntry}
                  />
                ))}
              </div>
            )}
          </UiFormLayout.Section>

          {/* Month-only entries */}
          <UiFormLayout.Section label="Лише цього місяця">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {otherEntriesFields.map((field, index) => {
                const entry = methods.getValues(`otherEntries.${index}`);
                const category: AllCategories = (entry.category as AllCategories | undefined) ?? ExpenseCategories.Misc;

                return (
                  <MonthEntryCard
                    key={field.id}
                    title={entry.title}
                    sum={entry.sum ?? 0}
                    type={entry.type as string}
                    category={category}
                    onDelete={() => remove(index)}
                  />
                );
              })}

              <button
                type="button"
                className="rounded-4xl border-2 border-dashed border-border flex items-center justify-center gap-2 p-4 min-h-[120px] text-primary hover:bg-primary/5 transition-colors font-medium text-sm"
                onClick={() => router.push('/profile/budget/plans/add')}
              >
                <UiSvgIcon
                  name="plus"
                  size="sm"
                />
                + Додати операцію
              </button>
            </div>
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
