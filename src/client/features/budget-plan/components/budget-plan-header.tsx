import { UiResponsiveDialog } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog';
import { UiResponsiveDialogTrigger } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog-trigger';
import { UiResponsiveDialogContent } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog-content';
import { BudgetPlanTitle } from './budget-plan-title';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import { UiResponsiveDialogClose } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog-close';
import type { BudgetPlanHeaderProps } from '@frontend/features/budget-plan/components/props/budget-plan-header.props';
import { SelectBudgetPlanContent } from '@frontend/features/budget-plan/components/select-budget-plan-content';
import { useTranslations } from 'next-intl';

export function BudgetPlanHeader({ disabled = false, selected, onSelect }: BudgetPlanHeaderProps) {
  const t = useTranslations('budgetPlan.header');

  return (
    <UiResponsiveDialog>
      <UiResponsiveDialogTrigger disabled={disabled}>
        <BudgetPlanTitle selected={selected} />
      </UiResponsiveDialogTrigger>

      <UiResponsiveDialogContent className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <UiTitle size="lg">{t('selectTitle')}</UiTitle>

          <UiResponsiveDialogClose />
        </div>

        <SelectBudgetPlanContent
          selected={selected}
          onSelect={onSelect}
        />
      </UiResponsiveDialogContent>
    </UiResponsiveDialog>
  );
}
