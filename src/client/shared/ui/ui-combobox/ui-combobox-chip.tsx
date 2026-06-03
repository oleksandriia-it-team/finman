'use client';

import * as React from 'react';
import { Combobox as ComboboxPrimitive } from '@base-ui/react';
import { cn } from '@frontend/shared/utils/cn.util';

import './styles/combobox-chip-styles.scss';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { useTranslations } from 'next-intl';

export function UiComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: ComboboxPrimitive.Chip.Props & {
  showRemove?: boolean;
}) {
  const t = useTranslations('common');

  return (
    <ComboboxPrimitive.Chip
      data-slot="combobox-chip"
      className={cn('combobox-chip', className)}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxPrimitive.ChipRemove
          className="combobox-chip-remove"
          data-slot="combobox-chip-remove"
          aria-label={t('deleteItem')}
        >
          <UiSvgIcon name="x" />
        </ComboboxPrimitive.ChipRemove>
      )}
    </ComboboxPrimitive.Chip>
  );
}
