'use client';

import AnimatedWalletLogo from '@frontend/shared/svg/animated-loader-svg';
import { UiBouncingDots } from '@frontend/ui/ui-bouncing-dots/ui-bouncing-dots';
import { useTranslations } from 'next-intl';

export function FinLoader() {
  const t = useTranslations('common');

  return (
    <div className="size-full flex flex-col items-center justify-center">
      <div className="flex gap-6 flex-col  max-w-96 px-4 items-center justify-center">
        <AnimatedWalletLogo />

        <div className="flex gap-1">
          <span className="text-foreground text-xl font-bold text-center">{t('loading')}</span>

          <UiBouncingDots dotClassName="size-2" />
        </div>
      </div>
    </div>
  );
}
