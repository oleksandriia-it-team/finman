'use client';

import { FormProvider, useFieldArray } from 'react-hook-form';
import { useBudgetPlanForm } from './budget-plan-form.hook';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { UiFormLayout } from '@frontend/ui/ui-form-layout/ui-form-layout';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { FinControlledTextarea } from '@frontend/components/controlled-fields/fin-controlled-textarea';
import { FinControlledDropdown } from '@frontend/components/controlled-fields/fin-controlled-dropdown';
import { FinControlledMultipleAutocomplete } from '@frontend/components/controlled-fields/fin-controlled-multiple-autocomplete';
import { useEffect, useMemo, useState } from 'react';
import { regularEntryService } from '@frontend/features/regular-incomes-expenses/regular-entry.service';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import type { DropdownOption } from '@frontend/shared/models/dropdown-option.model';
import { ExpenseCategories, IncomeCategories } from '@common/enums/categories.enum';
import { TypeEntry } from '@common/enums/entry.enum';
import { CategoriesMapping } from '@frontend/shared/styles/card-styles-mappings';

interface BudgetPlanFormProps {
  initialData?: BudgetPlanDetailed;
  onSuccess?: () => void;
  onCancel?: () => void;
}

function getCategoryOptions(type: TypeEntry.Expense | TypeEntry.Income) {
  const categories = type === TypeEntry.Income ? IncomeCategories : ExpenseCategories;

  return Object.values(categories).map((category) => ({
    label: CategoriesMapping[category].label,
    value: category,
  }));
}

export function BudgetPlanForm({ initialData, onSuccess, onCancel }: BudgetPlanFormProps) {
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
  const [regularEntriesOptions, setRegularEntriesOptions] = useState<DropdownOption<number>[]>([]);
  const [search, setSearch] = useState('');
  const [loadingState, setLoadingState] = useState(PromiseState.Loading);

  useEffect(() => {
    let isMounted = true;

    const loadEntries = async () => {
      try {
        setLoadingState(PromiseState.Loading);
        const entries = await regularEntryService.getItems(0, 1000, { softDeleted: 0 });

        if (!isMounted) {
          return;
        }

        setRegularEntriesOptions(
          entries.map((entry) => ({
            label: entry.title,
            value: entry.id,
          })),
        );
        setLoadingState(PromiseState.Success);
      } catch {
        if (isMounted) {
          setLoadingState(PromiseState.Error);
        }
      }
    };

    void loadEntries();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedRegularEntries = useMemo(
    () => regularEntriesOptions.filter((option) => selectedRegularIds?.includes(option.value)),
    [regularEntriesOptions, selectedRegularIds],
  );

  const filteredRegularEntries = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    if (!normalized) {
      return regularEntriesOptions;
    }

    return regularEntriesOptions.filter((option) => option.label.toLowerCase().includes(normalized));
  }, [regularEntriesOptions, search]);

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
        <UiFormLayout.Root onSubmit={submit}>
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
              const rowCategoryOptions = getCategoryOptions(rowType);

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

                    <UiFormLayout.Grid cols={2}>
                      <FinControlledInput
                        label="Сума"
                        name={`otherEntries.${index}.sum`}
                        type="number"
                        placeholder="0.00"
                      />

                      <FinControlledDropdown
                        label="Тип"
                        name={`otherEntries.${index}.type`}
                        options={[
                          { label: 'Витрата', value: TypeEntry.Expense },
                          { label: 'Дохід', value: TypeEntry.Income },
                        ]}
                      />
                    </UiFormLayout.Grid>

                    <FinControlledDropdown
                      label="Категорія"
                      name={`otherEntries.${index}.category`}
                      options={rowCategoryOptions}
                    />

                    <UiFormLayout.Grid cols={2}>
                      <FinControlledInput
                        label="Пріоритет (1-10)"
                        name={`otherEntries.${index}.priority`}
                        type="number"
                        placeholder="1"
                      />

                      <div className="flex items-end h-full pb-1">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            {...methods.register(`otherEntries.${index}.selected`)}
                            className="w-4 h-4 cursor-pointer rounded border-border accent-primary"
                          />
                          <span className="text-sm">Вибрано</span>
                        </label>
                      </div>
                    </UiFormLayout.Grid>
                  </UiFormLayout.Grid>
                </div>
              );
            })}

            <UiButton
              type="button"
              variant="default"
              className="w-full"
              onClick={addMonthEntry}
            >
              <UiSvgIcon
                name="plus"
                size="sm"
              />
              Додати місячну операцію
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
    </div>
  );
}

export default BudgetPlanForm;
