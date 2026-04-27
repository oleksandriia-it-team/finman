'use client';

import type { RecoveryFlowGuardProps } from '@frontend/entities/auth/props/recovery-guard.props';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoveryStore } from '@frontend/entities/auth/recovery.store';
import { useEffect } from 'react';

export function RecoveryFlowGuard({ children, routePath = '/recovery' }: RecoveryFlowGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const email = useRecoveryStore((state) => state.email);
  const code = useRecoveryStore((state) => state.code);

  const isConfirmPage = pathname === '/confirm-code';
  const isResetPage = pathname === '/reset-password';

  const isAccessDenied = (isConfirmPage && !email) || (isResetPage && (!email || !code));

  useEffect(() => {
    if (isAccessDenied) {
      router.replace(routePath);
    }
  }, [isAccessDenied, router, routePath]);

  if (isAccessDenied) {
    return null;
  }

  return children;
}
