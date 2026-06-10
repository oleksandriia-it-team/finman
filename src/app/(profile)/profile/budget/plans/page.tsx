'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createBudgetPlanIdUrl } from '@common/domains/budget-plan/create-budget-plan-param-url.util';
import { getCurrentMonthDate } from '@common/domains/budget-plan/get-current-month-date-util';
import { FinLoader } from '@frontend/components/loader/fin-loader';

export default function BudgetPlanRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Use an ABSOLUTE target, not `${pathname}/...`. Offline, when reloading a
    // deep route, the SW serves a fallback shell and Next.js reconciles the
    // route — during which this list page can run while usePathname() already
    // returns the deep URL (e.g. /profile/budget/plans/06-2026), which with the
    // old relative form produced a doubled id (.../06-2026/06-2026).
    router.replace(`/profile/budget/plans/${createBudgetPlanIdUrl(getCurrentMonthDate())}`);
  }, [router]);

  return <FinLoader />;
}
