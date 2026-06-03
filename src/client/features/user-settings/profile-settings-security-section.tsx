'use client';

import { FinControlledPassword } from '@frontend/components/controlled-fields/fin-controlled-password';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { ProfileSection } from './profile-section';
import type { ProfileSettingsSecuritySectionProps } from '@frontend/features/user-settings/props/profile-settings-security-section.props';
import { useTranslations } from 'next-intl';

export function ProfileSettingsSecuritySection({ isOnline }: ProfileSettingsSecuritySectionProps) {
  const t = useTranslations('userSettings.security');

  return (
    <ProfileSection
      className="gap-0"
      title={t('title')}
    >
      <UiDescription className="text-sm">{t('passwordReplace')}</UiDescription>
      <div className="mt-2 " />

      <FinControlledPassword
        name="currentPassword"
        label={t('currentPasswordLabel')}
        placeholder={t('currentPasswordPlaceholder')}
        disabled={!isOnline}
      />

      <FinControlledPassword
        name="newPassword"
        label={t('newPasswordLabel')}
        placeholder={t('newPasswordPlaceholder')}
        disabled={!isOnline}
      />

      <FinControlledPassword
        name="confirmPassword"
        label={t('confirmPasswordLabel')}
        placeholder={t('confirmPasswordPlaceholder')}
        disabled={!isOnline}
      />
    </ProfileSection>
  );
}
