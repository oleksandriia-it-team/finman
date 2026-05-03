// transaction-card-actions.tsx
import { UiActionButton } from '@frontend/ui/ui-action-button/ui-action-button';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { UiConfirmModal } from '@frontend/components/confirm-modal/fin-confirm-modal';
import { IncomeExpenseCardActions } from '@frontend/entities/operations/income-expense-card/income-expense-card-actions';
import { useRouter } from 'next/navigation';
import type { TransactionActionsProps } from '@frontend/entities/card-actions/fin-card-actions-props';

export function TransactionActions({ id, icon, title, editPath, handleDelete }: TransactionActionsProps) {
  const router = useRouter();

  return (
    <IncomeExpenseCardActions
      icon={icon}
      title="Оберіть дію"
      description={title}
    >
      <UiActionButton
        icon="pencil-fill"
        variant="muted"
        iconVariant="primary"
        size="sm"
        onClick={() => router.push(editPath)}
      >
        <UiTitle>Редагувати</UiTitle>
        <UiDescription>Змінити дані транзакції</UiDescription>
      </UiActionButton>

      <UiConfirmModal
        trigger={
          <UiActionButton
            icon="trash-fill"
            variant="destructive"
            iconVariant="destructive"
            size="sm"
          >
            <UiTitle>Видалити</UiTitle>
            <UiDescription>Назавжди видалити транзакцію</UiDescription>
          </UiActionButton>
        }
        onConfirm={() => handleDelete?.(id!)}
      />
    </IncomeExpenseCardActions>
  );
}
