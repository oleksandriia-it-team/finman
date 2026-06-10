'use client';

import type { ErrorWidgetProps } from '@frontend/components/error/props/error-widget.props';
import { ErrorIconSvg } from '@frontend/shared/svg/error-icon-svg';
import { useTranslations } from 'next-intl';

export function FinErrorShort({ message, status }: ErrorWidgetProps) {
  const t = useTranslations('common');

  return (
    <div className="size-full flex flex-col items-center justify-center gap-6 px-4 ">
      <ErrorIconSvg />

      <div className="flex flex-col">
        <h3 className="text-foreground text-xl font-bold text-center">{t('somethingWentWrong')}</h3>
        <span className="text-foreground text-lg text-left">
          {t('errorCode')} <b className="font-bold">{status}</b>
        </span>
        <span className="text-muted-foreground text-sm">{message}</span>
      </div>
    </div>
  );
}
