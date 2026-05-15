// src/app/(profile)/profile/budget/(plans)/plans/[id]/page.tsx
'use client';

import { use } from 'react';
import { z } from 'zod';
import type { Month } from '@common/enums/month.enum';
import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { BudgetPlanListScreen } from '@frontend/features/budget-plan/budget-plan-form/budget-plan-list-screen';

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

export default function BudgetPlanByDatePage(props: PageProps<never>) {
  const { id } = use(props.params);
  const parsed = dateParamSchema.safeParse(id);

  if (!parsed.success) {
    return (
      <FinErrorWidget
        status={400}
        message="Невірний формат дати. Очікується MM-YYYY"
      />
    );
  }

  return <BudgetPlanListScreen date={parsed.data} />;
}
