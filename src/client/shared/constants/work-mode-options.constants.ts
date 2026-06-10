'use client';

import { WorkMode } from '@common/enums/work-mode.enum';
import type { DropdownOption } from '@frontend/shared/models/dropdown-option.model';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

export function useWorkModeOptions(): DropdownOption<WorkMode>[] {
  const t = useTranslations('common');
  return useMemo(
    () => [
      { value: WorkMode.Online, label: t('online') },
      { value: WorkMode.Offline, label: t('offline') },
    ],
    [t],
  );
}
