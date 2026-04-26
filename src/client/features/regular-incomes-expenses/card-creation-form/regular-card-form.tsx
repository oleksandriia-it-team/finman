import { FormProvider } from 'react-hook-form';
import { cn } from '@frontend/shared/utils/cn.util';
import { DayOfMonthOptions, FrequencyOptions } from '@frontend/shared/constants/regular-options.constant';
import type { RegularEntry } from '@common/records/regular-entry.record';
import { useRegularPaymentForm } from './regular-form.hook';
import { TransactionCategoryPicker } from '@frontend/entities/operations/transaction-category-picker/transaction-category-picker';
import { TypeEntry } from '@common/enums/entry.enum';
import { CardCreationFormSideBlock } from './cards-form-side-block/form-side-block';
import { FinControlledDropdown } from '@frontend/components/controlled-fields/fin-controlled-dropdown';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { FinControlledTextarea } from '@frontend/components/controlled-fields/fin-controlled-textarea';
import { UiFormLayout } from '@frontend/ui/ui-form-layout/ui-form-layout';
import { UiButton } from '@frontend/ui/ui-button/ui-button';

interface RegularPaymentFormProps {
  initialData?: RegularEntry;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function RegularPaymentForm({ initialData, onSuccess, onCancel }: RegularPaymentFormProps) {
  const { methods, submit, isEdit } = useRegularPaymentForm(initialData, onSuccess);
  const selectedType = methods.watch('type');

  return (
    <div className="flex flex-row size-full">
      <FormProvider {...methods}>
        <UiFormLayout.Root
          onSubmit={submit}
          style={{ minWidth: 'min(25rem, 100%)' }}
          className="w-0 flex-1"
        >
          <UiFormLayout.Header>
            <UiFormLayout.Title>Деталі платежу</UiFormLayout.Title>
            <UiFormLayout.Description>
              Заповніть інформацію про {isEdit ? 'регулярний платіж' : 'новий регулярний платіж'}
            </UiFormLayout.Description>
          </UiFormLayout.Header>

          <UiFormLayout.Section label="Тип платежу">
            <div className="flex w-full p-1.5 gap-4">
              <UiButton
                type="button"
                className={cn(
                  'flex-1 py-2.5 font-semibold transition-all text-sm',
                  selectedType !== TypeEntry.Income &&
                    'bg-transparent text-muted-foreground hover:text-foreground shadow-none',
                )}
                onClick={() => methods.setValue('type', TypeEntry.Income, { shouldValidate: true })}
                variant={selectedType === TypeEntry.Income ? 'success' : 'default'}
              >
                Дохід
              </UiButton>
              <UiButton
                type="button"
                className={cn(
                  'flex-1 py-2.5 font-semibold transition-all text-sm',
                  selectedType !== TypeEntry.Expense &&
                    'bg-transparent text-muted-foreground hover:text-foreground shadow-none',
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
            label="Назва"
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

          <FinControlledInput
            label="Сума"
            id="sum"
            name="sum"
            type="number"
            placeholder="0.00"
          />

          <UiFormLayout.Grid>
            <FinControlledDropdown
              label="Частота"
              name="frequency"
              placeholder="Оберіть частоту"
              options={FrequencyOptions}
            />
            <FinControlledDropdown
              label="День"
              name="dayOfMonth"
              placeholder="День"
              options={DayOfMonthOptions}
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

      <div className="size-full flex-2 max-lg:hidden">
        <CardCreationFormSideBlock />
      </div>
    </div>
  );
}
