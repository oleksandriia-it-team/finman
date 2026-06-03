'use client';

import { ProfileSection } from '@frontend/features/user-settings/profile-section';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { useAuthorizedUser } from '@frontend/entities/auth/authorized-user.hook';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { TwoFactorSetupModal } from './2fa-setup/setup-modal';
import { TwoFactorCancelModal } from '@frontend/features/user-settings/2fa-cancel/cancel-modal';
import { useTranslations } from 'next-intl';

export function ProfileSettings2faSection() {
  const user = useAuthorizedUser();
  const t = useTranslations('userSettings.twoFactor');

  return (
    <>
      {!!user.online && (
        <ProfileSection
          title={user.totpEnabled ? t('titleEnabled') : t('titleDisabled')}
          icon="shield-check"
        >
          <div className="flex justify-between">
            <UiDescription size="sm">{t('description')}</UiDescription>

            {user.totpEnabled && <TwoFactorCancelModal />}

            {!user.totpEnabled && (
              <TwoFactorSetupModal
                trigger={
                  <UiButton variant="primary-muted">
                    <UiSvgIcon name="lock-fill" />
                    {t('setupButton')}
                  </UiButton>
                }
              />
            )}
          </div>
        </ProfileSection>
      )}
    </>
  );
}
