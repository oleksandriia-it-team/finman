'use client';

import type { RecoveryFlowGuardProps } from '@frontend/entities/auth/props/recovery-guard.props';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoveryStore } from '@frontend/entities/auth/recovery.store';
import { useEffect, useMemo } from 'react';
import { isEmpty } from '@common/utils/is-empty.util';

export function RecoveryFlowGuard({ children, routePath = '/recovery' }: RecoveryFlowGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const email = useRecoveryStore((state) => state.email);
  const code = useRecoveryStore((state) => state.code);
  const isConfirmPage = pathname.startsWith('/confirm-code');
  const isResetPage = pathname.startsWith('/reset-password');

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hasEverythingForReset = useMemo(() => isResetPage && !!code && !!email, [isResetPage]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const hasEverythingForConfirm = useMemo(() => isConfirmPage && !code && !!email, [isConfirmPage]);

  const hasEverything = hasEverythingForReset || hasEverythingForConfirm;
  const correclyLocatedInAnotherPage = useMemo(
    () => !isConfirmPage && !isResetPage && isEmpty(email) && isEmpty(code),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isConfirmPage, isResetPage],
  );

  useEffect(() => {
    if (hasEverything || correclyLocatedInAnotherPage || pathname === routePath) {
      return;
    }
    router.push(routePath);
  }, [hasEverything, correclyLocatedInAnotherPage, router, routePath, pathname]);

  if (hasEverything || correclyLocatedInAnotherPage || pathname === routePath) {
    return children;
  }

  return null;
}
