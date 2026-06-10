'use client';

import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import type { ProfileSettingsHeaderProps } from '@frontend/features/user-settings/props/profile-settings-header.props';
import { useTranslations } from 'next-intl';

export function ProfileSettingsHeader({ userInformation }: ProfileSettingsHeaderProps) {
  const t = useTranslations('userSettings.header');

  return (
    <header className="flex items-start justify-between gap-4">
      <div className="flex flex-col gap-1">
        <UiTitle
          size="xl"
          className="text-2xl"
        >
          {t('title')}
        </UiTitle>
        <UiDescription size="sm">{t('description')}</UiDescription>
      </div>

      <div className="flex flex-col items-end gap-1 text-right">
        <UiTitle size="sm">{userInformation.name}</UiTitle>
        {userInformation.online && <UiDescription size="xs">{userInformation.email}</UiDescription>}
      </div>
    </header>
  );
}
