'use client';

import { SupportLanguages } from '@common/enums/support-languages.enum';
import { type DropdownOption } from '@frontend/shared/models/dropdown-option.model';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

export function useSupportLanguagesLocale(): DropdownOption<SupportLanguages>[] {
  const t = useTranslations('common');
  return useMemo(
    () => [
      { value: SupportLanguages.English, label: 'English' },
      { value: SupportLanguages.Ukrainian, label: t('ukrainian') },
    ],
    [t],
  );
}
