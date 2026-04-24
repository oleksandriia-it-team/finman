import * as React from 'react';
import { type ComponentProps } from 'react';
import { UiIconButton } from '@frontend/ui/ui-icon-button/ui-icon-button';

export function UiPaginationPrevious(props: ComponentProps<'button'>) {
  return (
    <UiIconButton
      size="sm"
      icon="chevron-left"
      aria-label="Перейти на попередню сторінку"
      isOutlined={false}
      {...props}
    />
  );
}

export function UiPaginationNext(props: ComponentProps<'button'>) {
  return (
    <UiIconButton
      size="sm"
      icon="chevron-right"
      aria-label="Перейти на наступну сторінку"
      isOutlined={false}
      {...props}
    />
  );
}
