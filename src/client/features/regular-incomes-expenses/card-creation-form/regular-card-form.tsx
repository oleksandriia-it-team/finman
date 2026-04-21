import { FormProvider } from 'react-hook-form';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { FinControlledDropdown } from '@frontend/components/controlled-fields/fin-controlled-dropdown';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { cn } from '@frontend/shared/utils/cn.util';
import { DayOfMonthOptions, FrequencyOptions } from '@frontend/shared/constants/regular-options.constant';
import type { RegularEntry } from '@common/records/regular-entry.record';
import { useRegularPaymentForm } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-form.hook';
import {
  CategoryPicker,
  TransactionCategoryPicker,
} from '@frontend/entities/budget-plan/transaction-category-picker/ui-category-picker';
import { TypeEntry } from '@common/enums/entry.enum';

interface RegularPaymentFormProps {
  initialData?: RegularEntry;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function RegularPaymentForm({ initialData, onSuccess, onCancel }: RegularPaymentFormProps) {
  const { methods, submit, isEdit } = useRegularPaymentForm(initialData, onSuccess);

  const selectedType = methods.watch('type');

  return (
    <FormProvider {...methods}>
      <form
        noValidate
        onSubmit={submit}
        className="flex flex-col gap-6 w-full"
      >
        <div className="flex flex-col gap-1 mb-2">
          <h2 className="text-2xl font-bold text-foreground">Деталі платежу</h2>
          <p className="text-sm text-muted-foreground">
            Заповніть інформацію про {isEdit ? 'регулярний платіж' : 'новий регулярний платіж'}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-foreground">Тип платежу</span>
          <div className="flex w-full p-1.5 gap-4">
            <UiButton
              type="button"
              className={cn(
                'flex-1 py-2.5 rounded-lg font-semibold transition-all text-sm',
                selectedType === TypeEntry.Income
                  ? 'shadow-sm hover:bg-success/90'
                  : 'bg-transparent text-muted-foreground hover:text-foreground shadow-none',
              )}
              onClick={() => methods.setValue('type', TypeEntry.Income, { shouldValidate: true })}
              variant={selectedType === TypeEntry.Income ? 'success' : 'muted'}
            >
              Дохід
            </UiButton>
            <UiButton
              type="button"
              className={cn(
                'flex-1 py-2.5 rounded-lg font-semibold transition-all text-sm',
                selectedType === TypeEntry.Expense
                  ? 'shadow-sm hover:bg-foreground/90'
                  : 'muted-foreground hover:text-foreground shadow-none',
              )}
              onClick={() => methods.setValue('type', TypeEntry.Expense, { shouldValidate: true })}
              variant={selectedType === TypeEntry.Expense ? 'destructive' : 'muted'}
            >
              Витрата
            </UiButton>
          </div>
        </div>

        {selectedType && (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">Категорія</span>
            <TransactionCategoryPicker
              name="category"
              type={selectedType}
            />
          </div>
        )}

        <FinControlledInput
          label="Назва"
          id="title"
          name="title"
          placeholder="Наприклад: Зарплата"
        />

        <FinControlledInput
          label="Опис"
          id="description"
          name="description"
          placeholder="Короткий опис платежу"
        />

        <FinControlledInput
          label="Сума"
          id="sum"
          name="sum"
          type="number"
          placeholder="0.00"
        />

        <div className={cn('grid gap-4', 'grid-cols-2')}>
          <FinControlledDropdown
            label="Частота"
            id="frequency"
            name="frequency"
            placeholder="Оберіть частоту"
            options={FrequencyOptions}
          />
          <FinControlledDropdown
            label="День"
            id="dayOfMonth"
            name="dayOfMonth"
            placeholder="День"
            options={DayOfMonthOptions}
          />
        </div>

        <div className={cn('grid gap-4 mt-4', 'grid-cols-2')}>
          <UiButton
            type="submit"
            variant="primary"
            className="w-full py-6  font-semibold shadow-md"
          >
            Зберегти
          </UiButton>
          <UiButton
            type="button"
            variant="muted"
            className="w-full py-6 font-semibold "
            onClick={onCancel}
          >
            Скасувати
          </UiButton>
        </div>
      </form>
    </FormProvider>
  );
}
