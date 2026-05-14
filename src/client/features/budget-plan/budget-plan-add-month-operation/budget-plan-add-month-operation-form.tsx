'use client';

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UiFormLayout } from '@frontend/ui/ui-form-layout/ui-form-layout';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { cn } from '@frontend/shared/utils/cn.util';
import { TypeEntry } from '@common/enums/entry.enum';
import { TransactionCategoryPicker } from '@frontend/entities/operations/transaction-category-picker/transaction-category-picker';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { FinControlledTextarea } from '@frontend/components/controlled-fields/fin-controlled-textarea';
import { NumberOnlyPattern } from '@common/constants/number-only-pattern.constant';
import { ExpenseCategories } from '@common/enums/categories.enum';
import { MonthEntrySchema, type MonthEntryFormData } from '@common/domains/month-entry/month-entry.schema';

interface BudgetPlanAddMonthOperationFormProps {
  onSuccess?: (data: MonthEntryFormData) => void;
  onCancel?: () => void;
}

export function BudgetPlanAddMonthOperationForm({
  onSuccess,
  onCancel,
}: Readonly<BudgetPlanAddMonthOperationFormProps>) {
  const methods = useForm<MonthEntryFormData>({
    resolver: zodResolver(MonthEntrySchema) as never,
    defaultValues: {
      title: '',
      description: '',
      sum: 0,
      type: TypeEntry.Expense,
      category: ExpenseCategories.Misc,
      selected: false,
      priority: 1,
    },
  });

  const selectedType = methods.watch('type') as TypeEntry | null;

  const handleSubmit = methods.handleSubmit((data: MonthEntryFormData) => {
    onSuccess?.(data);
  });

  return (
    <FormProvider {...methods}>
      <UiFormLayout.Root
        onSubmit={handleSubmit}
        className="w-full"
      >
        <UiFormLayout.Header>
          <UiFormLayout.Title>Деталі платежу</UiFormLayout.Title>
          <UiFormLayout.Description>Заповніть інформацію про операцію місяця</UiFormLayout.Description>
        </UiFormLayout.Header>

        <UiFormLayout.Section label="Тип платежу">
          <div className="flex w-full gap-3">
            <UiButton
              type="button"
              className={cn(
                'flex-1 py-3 font-semibold transition-all text-sm rounded-2xl',
                selectedType !== TypeEntry.Income &&
                  'bg-transparent text-muted-foreground hover:text-foreground shadow-none border border-border',
              )}
              onClick={() => methods.setValue('type', TypeEntry.Income, { shouldValidate: true })}
              variant={selectedType === TypeEntry.Income ? 'success' : 'default'}
            >
              Дохід
            </UiButton>
            <UiButton
              type="button"
              className={cn(
                'flex-1 py-3 font-semibold transition-all text-sm rounded-2xl',
                selectedType !== TypeEntry.Expense &&
                  'bg-transparent text-muted-foreground hover:text-foreground shadow-none border border-border',
              )}
              onClick={() => methods.setValue('type', TypeEntry.Expense, { shouldValidate: true })}
              variant={selectedType === TypeEntry.Expense ? 'destructive' : 'default'}
            >
              Витрата
            </UiButton>
          </div>
        </UiFormLayout.Section>

        {selectedType && (
          <UiFormLayout.Section label="Категорія">
            <TransactionCategoryPicker
              name="category"
              type={selectedType}
            />
          </UiFormLayout.Section>
        )}

        <FinControlledInput
          label="Назва платежу"
          id="title"
          name="title"
          placeholder="Наприклад: Зарплата"
        />

        <FinControlledTextarea
          label="Опис"
          id="description"
          name="description"
          placeholder="Короткий опис платежу"
        />

        <UiFormLayout.Grid cols={2}>
          <FinControlledInput
            label="Сума"
            id="sum"
            pattern={NumberOnlyPattern}
            name="sum"
            type="number"
            placeholder="0.00"
          />
          <FinControlledInput
            label="Важливість"
            id="priority"
            name="priority"
            type="number"
            placeholder="1"
            min="1"
            max="10"
          />
        </UiFormLayout.Grid>

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
  );
}
