'use client';

import * as React from 'react';
import { type ComponentProps } from 'react';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';
import { useTranslations } from 'next-intl';

export function UiPaginationPrevious(props: ComponentProps<'button'>) {
  const t = useTranslations('common');

  return (
    <UiIconButton
      size="sm"
      icon="chevron-left"
      aria-label={t('previousPage')}
      isOutlined={false}
      {...props}
    />
  );
}

export function UiPaginationNext(props: ComponentProps<'button'>) {
  const t = useTranslations('common');

  return (
    <UiIconButton
      size="sm"
      icon="chevron-right"
      aria-label={t('nextPage')}
      isOutlined={false}
      {...props}
    />
  );
}
