import { UiFormLayout } from '@frontend/ui/ui-form-layout/ui-form-layout';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { cn } from '@frontend/shared/utils/cn.util';
import { TypeEntry } from '@common/enums/entry.enum';
import { TransactionCategoryPicker } from '@frontend/entities/operations/transaction-category-picker/transaction-category-picker';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { FinControlledTextarea } from '@frontend/components/controlled-fields/fin-controlled-textarea';
import { NumberOnlyPattern } from '@common/constants/number-only-pattern.constant';
import type {
  CardsFormFooterTemplateProps,
  CardsFormHeaderTemplateProps,
  CardsFormInputsTemplateProps,
  CardsFormTemplateActionsProps,
  CardsFormTemplateProps,
} from '@frontend/entities/operations/cards-form-template/cards-form-template-props';

export function CardsFormTemplate({ children, submit }: CardsFormTemplateProps) {
  return (
    <UiFormLayout.Root
      onSubmit={submit}
      style={{ minWidth: 'min(25rem, 100%)' }}
      className="w-0 flex-1"
    >
      {children}
    </UiFormLayout.Root>
  );
}

export function CardsFormHeaderTemplate({ title, description, isEdit }: CardsFormHeaderTemplateProps) {
  return (
    <UiFormLayout.Header>
      <UiFormLayout.Title>{title}</UiFormLayout.Title>
      <UiFormLayout.Description>
        {description} {isEdit ? 'регулярний платіж' : 'новий регулярний платіж'}
      </UiFormLayout.Description>
    </UiFormLayout.Header>
  );
}

export function CardsFormTemplatePickers({ selectedType, setValue }: CardsFormFooterTemplateProps) {
  return (
    <>
      <UiFormLayout.Section label="Тип платежу">
        <div className="flex w-full p-1.5 gap-4">
          <UiButton
            type="button"
            className={cn(
              'flex-1 py-2.5 font-semibold transition-all text-sm',
              selectedType !== TypeEntry.Income &&
                'bg-transparent text-muted-foreground hover:text-foreground shadow-none',
            )}
            onClick={() => setValue(TypeEntry.Income)}
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
            onClick={() => setValue(TypeEntry.Expense)}
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
    </>
  );
}

export function CardsFormTemplateInputs({ children }: CardsFormInputsTemplateProps) {
  return (
    <>
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
        pattern={NumberOnlyPattern}
        name="sum"
        type="number"
        placeholder="0.00"
      />
      {children}
    </>
  );
}

export function CardsFormTemplateActions({ onCancel }: CardsFormTemplateActionsProps) {
  return (
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
  );
}
