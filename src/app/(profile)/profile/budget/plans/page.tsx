'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createBudgetPlanIdUrl } from '@common/domains/budget-plan/create-budget-plan-param-url.util';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import { FinLoader } from '@frontend/components/loader/fin-loader';

export default function BudgetPlanRedirectPage() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    router.replace(`${pathname}/${createBudgetPlanIdUrl(getCurrentMonthDate())}`);
  }, [pathname, router]);

  return <FinLoader />;
}
