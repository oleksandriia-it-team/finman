'use client';

import { CheckWithCircleSvg } from '@frontend/shared/svg/check-with-circle-svg';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { useTranslations } from 'next-intl';

export function ShowSuccessTwoFactorSetup() {
  const t = useTranslations('userSettings.twoFactor.setupModal');

  return (
    <div className="flex flex-col items-center gap-4">
      <CheckWithCircleSvg />

      <UiDescription className="text-center">{t('successDescription')}</UiDescription>
    </div>
  );
}
