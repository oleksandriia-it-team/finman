import { FormProvider } from 'react-hook-form';
import { UiFieldSet } from '@frontend/ui/ui-field/ui-field-set';
import { UiFieldLegend } from '@frontend/ui/ui-field/ui-field-legend';
import { UiFieldGroup } from '@frontend/ui/ui-field/ui-field-group';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { FinControlledDropdown } from '@frontend/components/controlled-fields/fin-controlled-dropdown';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { cn } from '@frontend/shared/utils/cn.util';
import { DayOfMonthOptions, FrequencyOptions } from '@frontend/shared/constants/regular-options.constant';
import type { RegularTransactionRecord } from '@common/records/regular-transaction.record';
import { useRegularPaymentForm } from '@frontend/features/regular-incomes-expenses/card-creation-form/regular-form.hook';
import { CategoryPicker } from '@frontend/ui/ui-category-picker/ui-category-picker';

interface RegularPaymentFormProps {
  initialData?: RegularTransactionRecord;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function RegularPaymentForm({ initialData, onSuccess, onCancel }: RegularPaymentFormProps) {
  const { methods, submit, isEdit } = useRegularPaymentForm(initialData, onSuccess);

  const selectedType = methods.watch('type');
  const { errors } = methods.formState;

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <UiFieldSet>
          <UiFieldLegend size="lg">{isEdit ? 'Редагування платежу' : 'Деталі платежу'}</UiFieldLegend>
          <p className="text-sm text-muted-foreground mb-4">
            Заповніть інформацію про {isEdit ? 'регулярний платіж' : 'новий регулярний платіж'}
          </p>

          <UiFieldGroup>
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">Тип платежу</span>
              <div className="grid grid-cols-2 gap-2">
                {(['income', 'expense'] as const).map((type) => (
                  <UiButton
                    key={type}
                    type="button"
                    variant={
                      selectedType === type ? (type === 'income' ? 'success' : 'destructive') : 'muted-foreground'
                    }
                    onClick={() => methods.setValue('type', type, { shouldValidate: true })}
                  >
                    {type === 'income' ? 'Дохід' : 'Витрата'}
                  </UiButton>
                ))}
              </div>
              {errors.type && <p className="text-sm text-destructive-foreground">{errors.type.message}</p>}
            </div>

            {selectedType && (
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium">Категорія</span>
                <CategoryPicker
                  name="category"
                  type={selectedType}
                />
                {errors.category && <p className="text-sm text-destructive-foreground">{errors.category.message}</p>}
              </div>
            )}

            <FinControlledInput
              label="Опис"
              id="subtitle"
              name="subtitle"
              placeholder="Короткий опис платежу"
            />

            <FinControlledInput
              label="Сума"
              id="amount"
              name="amount"
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

            <div className={cn('grid gap-4', 'grid-cols-2')}>
              <UiButton
                type="submit"
                variant="primary"
                className="w-full"
              >
                Зберегти
              </UiButton>
              <UiButton
                type="button"
                variant="muted"
                className="w-full"
                onClick={onCancel}
              >
                Скасувати
              </UiButton>
            </div>
          </UiFieldGroup>
        </UiFieldSet>
      </form>
    </FormProvider>
  );
}
