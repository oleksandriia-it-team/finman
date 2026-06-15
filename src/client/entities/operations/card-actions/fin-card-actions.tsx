// transaction-card-actions.tsx
import { UiActionButton } from '@frontend/ui/ui-action-button/ui-action-button';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { UiConfirmModal } from '@frontend/components/confirm-modal/fin-confirm-modal';
import { IncomeExpenseCardActions } from '@frontend/entities/operations/income-expense-card/card/income-expense-card-actions';
import { useRouter } from 'next/navigation';
import type { TransactionActionsProps } from '@frontend/entities/operations/card-actions/fin-card-actions-props';
import { useTranslations } from 'next-intl';

export function TransactionActions({ id, icon, title, editPath, handleDelete }: TransactionActionsProps) {
  const t = useTranslations('operations.actions');
  const router = useRouter();

  return (
    <IncomeExpenseCardActions
      icon={icon}
      title={t('title')}
      description={title}
    >
      {editPath && (
        <UiActionButton
          icon="pencil-fill"
          variant="muted"
          iconVariant="primary"
          size="sm"
          onClick={() => router.push(editPath)}
        >
          <UiTitle size="sm">{t('editLabel')}</UiTitle>
          <UiDescription size="xs">{t('editDescription')}</UiDescription>
        </UiActionButton>
      )}

      <UiConfirmModal
        trigger={
          <UiActionButton
            icon="trash-fill"
            variant="muted"
            iconVariant="destructive"
            size="sm"
          >
            <UiTitle size="sm">{t('deleteLabel')}</UiTitle>
            <UiDescription size="xs">{t('deleteDescription')}</UiDescription>
          </UiActionButton>
        }
        onConfirm={() => handleDelete?.(id!)}
      />
    </IncomeExpenseCardActions>
  );
}
