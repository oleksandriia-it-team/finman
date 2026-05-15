'use client';

import { useRouter } from 'next/navigation';
import { z } from 'zod';
import type { Month } from '@common/enums/month.enum';
import type { GetBudgetPlanDto } from '@common/domains/budget-plan/get-budget-plan.schema';
import { budgetPlanService } from '@frontend/features/budget-plan/budget-plan-service/budget-plan.service';
import { FinFormScreenHandler } from '@frontend/components/screen-handlers/fin-form-screen-handler';
import type { BudgetPlanDetailed } from '@common/records/budget-plan.record';
import { BudgetPlanEditForm } from './budget-plan-edit-form';
import BudgetPlanForm from '../budget-plan-form/budget-plan-form';

const dateParamSchema = z
  .string()
  .regex(/^\d{2}-\d{4}$/)
  .transform((val) => {
    const [mm, yyyy] = val.split('-');
    return {
      month: (parseInt(mm, 10) - 1) as Month,
      year: parseInt(yyyy, 10),
    };
  });

function parseDateParam(raw: string): { success: true; data: GetBudgetPlanDto } | { success: false } {
  const result = dateParamSchema.safeParse(raw);
  return result.success ? { success: true, data: result.data } : { success: false };
}

export function BudgetPlanEditScreen(props: PageProps<never>) {
  const router = useRouter();

  return (
    <FinFormScreenHandler<BudgetPlanDetailed | null, GetBudgetPlanDto>
      {...props}
      queryKey="budget-plan-edit"
      parseParam={parseDateParam}
      getItemFn={(date) => budgetPlanService.getItem(date)}
      notItemFound={
        <BudgetPlanForm
          onCancel={() => router.push('/profile/budget/plans')}
          onSuccess={() => router.push('/profile/budget/plans')}
        />
      }
      render={(budgetPlan) =>
        budgetPlan ? (
          <BudgetPlanEditForm
            initialData={budgetPlan}
            onCancel={() => router.push('/profile/budget/plans')}
            onSuccess={() => router.push('/profile/budget/plans')}
          />
        ) : (
          <BudgetPlanForm
            onCancel={() => router.push('/profile/budget/plans')}
            onSuccess={() => router.push('/profile/budget/plans')}
          />
        )
      }
    />
  );
}
