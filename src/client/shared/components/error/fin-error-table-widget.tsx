'use client';

import type { ErrorWidgetProps } from '@frontend/components/error/props/error-widget.props';
import { ErrorIconSvg } from '@frontend/shared/svg/error-icon-svg';
import { useTranslations } from 'next-intl';

export function FinErrorTableWidget({ status, message }: ErrorWidgetProps) {
  const t = useTranslations('common');

  return (
    <div className="flex flex-col gap-4 items-center">
      <ErrorIconSvg />

      <div className="flex flex-col gap-3 text-center">
        <span className="text-foreground text-lg text-left">
          {t('errorCode')} <b className="font-bold">{status}</b>
        </span>
        <span className="text-muted-foreground text-base">{message}</span>
        <span className="text-muted-foreground text-sm">{t('repeatIssue')}</span>
      </div>
    </div>
  );
}
