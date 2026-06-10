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
import { useTranslations } from 'next-intl';

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

export function CardsFormHeaderTemplate({ title, description, isEdit, subjectLabel }: CardsFormHeaderTemplateProps) {
  const t = useTranslations('operations.form');
  const defaultLabel = isEdit ? t('defaultSubjectEdit') : t('defaultSubjectCreate');
  const finalLabel = subjectLabel ? (isEdit ? subjectLabel.edit : subjectLabel.create) : defaultLabel;
  return (
    <UiFormLayout.Header>
      <UiFormLayout.Title>{title}</UiFormLayout.Title>
      <UiFormLayout.Description>
        {description} {finalLabel}
      </UiFormLayout.Description>
    </UiFormLayout.Header>
  );
}

export function CardsFormTemplatePickers({ selectedType, setValue }: CardsFormFooterTemplateProps) {
  const t = useTranslations('operations.form');
  return (
    <>
      <UiFormLayout.Section label={t('paymentTypeLabel')}>
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
            {t('income')}
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
            {t('expense')}
          </UiButton>
        </div>
      </UiFormLayout.Section>

      {selectedType && (
        <UiFormLayout.Section label={t('categoryLabel')}>
          <TransactionCategoryPicker
            name="category"
            type={selectedType}
          />
        </UiFormLayout.Section>
      )}
    </>
  );
}

export function CardsFormTemplateInputs({ children, disableSum = false }: CardsFormInputsTemplateProps) {
  const t = useTranslations('operations.form');
  return (
    <>
      <FinControlledInput
        label={t('titleLabel')}
        id="title"
        name="title"
        placeholder={t('titlePlaceholder')}
      />

      <FinControlledTextarea
        label={t('descriptionLabel')}
        id="description"
        name="description"
        placeholder={t('descriptionPlaceholder')}
      />

      <FinControlledInput
        label={t('sumLabel')}
        id="sum"
        pattern={NumberOnlyPattern}
        disabled={disableSum}
        name="sum"
        type="number"
        placeholder="0.00"
      />
      {children}
    </>
  );
}

export function CardsFormTemplateActions({ onCancel, cancelButtonLabel }: CardsFormTemplateActionsProps) {
  const t = useTranslations('operations.form');
  return (
    <UiFormLayout.Actions>
      <UiButton
        type="submit"
        variant="primary"
        className="w-full py-6 font-semibold shadow-md"
      >
        {t('saveButton')}
      </UiButton>
      <UiButton
        type="button"
        variant="default"
        className="w-full py-6 font-semibold"
        onClick={onCancel}
      >
        {cancelButtonLabel ?? t('cancelButton')}
      </UiButton>
    </UiFormLayout.Actions>
  );
}
