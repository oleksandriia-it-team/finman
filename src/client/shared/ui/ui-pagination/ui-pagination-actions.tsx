'use client';

import * as React from 'react';
import { type ComponentProps } from 'react';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';

export function UiPaginationPrevious({
  'aria-label': ariaLabel = 'Previous page',
  ...props
}: ComponentProps<'button'>) {
  return (
    <UiIconButton
      size="sm"
      icon="chevron-left"
      aria-label={ariaLabel}
      isOutlined={false}
      {...props}
    />
  );
}

export function UiPaginationNext({ 'aria-label': ariaLabel = 'Next page', ...props }: ComponentProps<'button'>) {
  return (
    <UiIconButton
      size="sm"
      icon="chevron-right"
      aria-label={ariaLabel}
      isOutlined={false}
      {...props}
    />
  );
}
