'use client';

import { ErrorLogStatus } from '@common/constants/error-log-status.constant';
import { cn } from '@frontend/shared/utils/cn.util';
import { useTranslations } from 'next-intl';

const StatusBadgeColorVariants: Record<ErrorLogStatus, string> = {
  [ErrorLogStatus.Active]: 'bg-destructive-foreground',
  [ErrorLogStatus.IsResolving]: 'bg-warning',
  [ErrorLogStatus.Resolved]: 'bg-success',
  [ErrorLogStatus.Ignored]: 'bg-muted-foreground',
};

export function StatusBadge({ status }: { status: ErrorLogStatus }) {
  const t = useTranslations('admin.errorLog');
  const StatusBadgeLabelVariants: Record<ErrorLogStatus, string> = {
    [ErrorLogStatus.Active]: t('statusActive'),
    [ErrorLogStatus.IsResolving]: t('statusResolving'),
    [ErrorLogStatus.Resolved]: t('statusResolved'),
    [ErrorLogStatus.Ignored]: t('statusIgnored'),
  };

  return (
    <div className="flex items-center gap-2 text-sm text-foreground font-medium">
      <span className={cn('s-1.5 rounded-full flex-shrink-0', StatusBadgeColorVariants[status])} />
      {StatusBadgeLabelVariants[status]}
    </div>
  );
}
