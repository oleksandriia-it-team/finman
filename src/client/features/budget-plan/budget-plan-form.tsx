'use client';

import { FormProvider, useFieldArray } from 'react-hook-form';
import { useBudgetPlanForm } from './budget-plan-form.hook';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiFormLayout } from '@frontend/ui/ui-form-layout/ui-form-layout';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { FinControlledTextarea } from '@frontend/components/controlled-fields/fin-controlled-textarea';
import { FinControlledMultipleAutocomplete } from '@frontend/components/controlled-fields/fin-controlled-multiple-autocomplete';
import { ExpenseCategories } from '@common/enums/categories.enum';
import { TypeEntry } from '@common/enums/entry.enum';
import { TransactionCategoryPicker } from '@frontend/entities/operations/transaction-category-picker/transaction-category-picker';
import { BudgetPlanFormSideBlock } from './budget-plan-form-side-block/budget-plan-form-side-block';
import { cn } from '@frontend/shared/utils/cn.util';
import { useRegularEntryOptions } from './hooks/use-regular-entry-options.hook';

interface BudgetPlanFormProps {
  initialData?: BudgetPlanDetailed;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function BudgetPlanForm({ initialData, onSuccess, onCancel }: Readonly<BudgetPlanFormProps>) {
  const { methods, submit, isEdit } = useBudgetPlanForm(initialData, onSuccess);
  const {
    fields: otherEntriesFields,
    append,
    remove,
  } = useFieldArray({
    control: methods.control,
    name: 'otherEntries',
  });

  const selectedRegularIds = methods.watch('plannedRegularEntryIds');
  const { search, setSearch, loadingState, selectedRegularEntries, filteredRegularEntries } =
    useRegularEntryOptions(selectedRegularIds);

  const addMonthEntry = () => {
    append({
      title: '',
      description: '',
      sum: 0,
      type: TypeEntry.Expense,
      category: ExpenseCategories.Misc,
      selected: false,
      priority: 1,
    });
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
            <UiFormLayout.Title>Бюджетний план</UiFormLayout.Title>
            <UiFormLayout.Description>
              {isEdit ? 'Оновіть' : 'Створіть'} бюджетний план на поточний місяць
            </UiFormLayout.Description>
          </UiFormLayout.Header>

          <UiFormLayout.Section label="Регулярні операції">
            <FinControlledMultipleAutocomplete
              name="plannedRegularEntryIds"
              label="Виберіть регулярні операції"
              placeholder="Пошук регулярних операцій..."
              search={search}
              onSearch={setSearch}
              options={filteredRegularEntries}
              selectedDataFull={selectedRegularEntries}
              state={loadingState}
            />
          </UiFormLayout.Section>

          <UiFormLayout.Section label="Місячні операції">
            {otherEntriesFields.length === 0 && (
              <p className="text-sm text-muted-foreground">Немає місячних операцій</p>
            )}

            {otherEntriesFields.map((field, index) => {
              const rowType = methods.watch(`otherEntries.${index}.type`) as TypeEntry.Expense | TypeEntry.Income;

              return (
                <div
                  key={field.id}
                  className="border border-border rounded-lg p-4 mb-4 relative"
                >
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                  >
                    <UiSvgIcon
                      name="x"
                      size="sm"
                    />
                  </button>

                  <UiFormLayout.Grid cols={1}>
                    {/* Type selector */}
                    <UiFormLayout.Section label="Тип платежу">
                      <div className="flex w-full p-1.5 gap-4">
                        <UiButton
                          type="button"
                          className={cn(
                            'flex-1 py-2.5 font-semibold transition-all text-sm',
                            rowType !== TypeEntry.Income &&
                              'bg-transparent text-muted-foreground hover:text-foreground shadow-none',
                          )}
                          onClick={() => {
                            methods.setValue(`otherEntries.${index}.type`, TypeEntry.Income, { shouldValidate: true });
                          }}
                          variant={rowType === TypeEntry.Income ? 'success' : 'default'}
                        >
                          Дохід
                        </UiButton>
                        <UiButton
                          type="button"
                          className={cn(
                            'flex-1 py-2.5 font-semibold transition-all text-sm',
                            rowType !== TypeEntry.Expense &&
                              'bg-transparent text-muted-foreground hover:text-foreground shadow-none',
                          )}
                          onClick={() => {
                            methods.setValue(`otherEntries.${index}.type`, TypeEntry.Expense, { shouldValidate: true });
                          }}
                          variant={rowType === TypeEntry.Expense ? 'destructive' : 'default'}
                        >
                          Витрата
                        </UiButton>
                      </div>
                    </UiFormLayout.Section>

                    {/* Category picker */}
                    {rowType && (
                      <UiFormLayout.Section label="Категорія">
                        <div className="mb-4">
                          <TransactionCategoryPicker
                            name={`otherEntries.${index}.category`}
                            type={rowType}
                          />
                        </div>
                      </UiFormLayout.Section>
                    )}

                    {/* Basic fields */}
                    <FinControlledInput
                      label="Назва"
                      name={`otherEntries.${index}.title`}
                      placeholder="Назва операції"
                    />

                    <FinControlledTextarea
                      label="Опис"
                      name={`otherEntries.${index}.description`}
                      placeholder="Опис операції"
                    />

                    {/* Amount and Priority */}
                    <UiFormLayout.Grid cols={2}>
                      <FinControlledInput
                        label="Сума"
                        name={`otherEntries.${index}.sum`}
                        type="number"
                        placeholder="0.00"
                      />

                      <FinControlledInput
                        label="Важливість (1-10)"
                        name={`otherEntries.${index}.priority`}
                        type="number"
                        placeholder="1"
                        min="1"
                        max="10"
                      />
                    </UiFormLayout.Grid>

                    {/* Checkbox */}
                    <div className="flex items-center h-full">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          {...methods.register(`otherEntries.${index}.selected`)}
                          className="w-4 h-4 cursor-pointer rounded border-border accent-primary"
                        />
                        <span className="text-sm">Вибрано до оптимізації</span>
                      </label>
                    </div>
                  </UiFormLayout.Grid>
                </div>
              );
            })}

            <UiButton
              type="button"
              variant="default"
              className="w-full border-2 border-dashed border-border rounded-lg py-3"
              onClick={addMonthEntry}
            >
              <UiSvgIcon
                name="plus"
                size="sm"
              />
              Додати операцію
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
