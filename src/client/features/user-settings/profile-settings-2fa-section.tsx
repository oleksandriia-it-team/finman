import { ProfileSection } from '@frontend/features/user-settings/profile-section';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { useAuthorizedUser } from '@frontend/entities/auth/authorized-user.hook';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { TwoFactorSetupModal } from './2fa-setup/setup-modal';
import { TwoFactorCancelModal } from '@frontend/features/user-settings/2fa-cancel/cancel-modal';

export function ProfileSettings2faSection() {
  const user = useAuthorizedUser();

  return (
    <>
      {!!user.online && (
        <ProfileSection
          title={`Двофакторна автентифікація = ${user.totpEnabled ? 'увімкнено' : 'вимкнено'}`}
          icon="shield-check"
        >
          <div className="flex justify-between">
            <UiDescription size="sm">
              Додатковий рівень захисту через додаток-автентифікатор (Google Authenticator, Authy, 1Password)
            </UiDescription>

            {user.totpEnabled && <TwoFactorCancelModal />}

            {!user.totpEnabled && (
              <TwoFactorSetupModal
                trigger={
                  <UiButton variant="primary-muted">
                    <UiSvgIcon name="lock-fill" />
                    Налаштувати
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
