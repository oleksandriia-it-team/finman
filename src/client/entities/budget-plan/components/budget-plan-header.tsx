import { UiResponsiveDialog } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog';
import { UiResponsiveDialogTrigger } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog-trigger';
import { UiResponsiveDialogContent } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog-content';
import type { BudgetPlanHeaderProps } from '@frontend/entities/budget-plan/components/props/budget-plan-header.props';
import { BudgetPlanTitle } from './budget-plan-title';
import { SelectBudgetPlanContent } from '@frontend/entities/budget-plan/components/select-budget-plan-content';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import { UiResponsiveDialogClose } from '@frontend/ui/ui-responsive-dialog/ui-responsive-dialog-close';

export function BudgetPlanHeader({ disabled = false, selected, onSelect }: BudgetPlanHeaderProps) {
  return (
    <UiResponsiveDialog>
      <UiResponsiveDialogTrigger disabled={disabled}>
        <BudgetPlanTitle selected={selected} />
      </UiResponsiveDialogTrigger>

      <UiResponsiveDialogContent className="w-full flex flex-col gap-2">
        <div className="flex justify-between">
          <UiTitle>Виберіть бюджетний план</UiTitle>

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
