'use client';

import type { RecoveryFlowGuardProps } from '@frontend/entities/auth/props/recovery-guard.props';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoveryStore } from '@frontend/entities/auth/recovery.store';
import { useEffect } from 'react';
import { isEmpty } from '@common/utils/is-empty.util';

export function RecoveryFlowGuard({ children, routePath = '/recovery' }: RecoveryFlowGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const email = useRecoveryStore((state) => state.email);
  const code = useRecoveryStore((state) => state.code);
  const isNavigating = useRecoveryStore((state) => state.isNavigating);

  const isConfirmPage = pathname.startsWith('/confirm-code');
  const isResetPage = pathname.startsWith('/reset-password');

  const hasEverythingForReset = isResetPage && !!code && !!email;
  const hasEverythingForConfirm = isConfirmPage && !code && !!email;

  const hasEverything = hasEverythingForReset || hasEverythingForConfirm;
  const correclyLocatedInAnotherPage = !isConfirmPage && !isResetPage && isEmpty(email) && isEmpty(code);

  useEffect(() => {
    console.log(hasEverything, correclyLocatedInAnotherPage);
    if (isNavigating || hasEverything || correclyLocatedInAnotherPage || pathname === routePath) {
      return;
    }
    router.push(routePath);
  }, [hasEverything, correclyLocatedInAnotherPage, router, routePath, pathname, isNavigating]);

  if (hasEverything || correclyLocatedInAnotherPage || pathname === routePath) {
    return children;
  }

  return null;
}
