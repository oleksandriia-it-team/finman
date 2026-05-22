import { ProfileSection } from '@frontend/features/user-settings/profile-section';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { useAuthorizedUser } from '@frontend/entities/profile/authorized-user.hook';
import { UiModal } from '@frontend/ui/ui-modal/ui-modal';
import { UiModalTrigger } from '@frontend/ui/ui-modal/ui-modal-trigger';
import { UiModalContent } from '@frontend/ui/ui-modal/ui-modal-content';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';

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

            {user.totpEnabled && (
              <UiModal>
                <UiModalTrigger asChild>
                  <UiButton
                    isOutlined
                    variant="destructive"
                  >
                    <UiSvgIcon name="arrow-repeat" />
                    Скинути
                  </UiButton>
                </UiModalTrigger>

                <UiModalContent>2</UiModalContent>
              </UiModal>
            )}

            {!user.totpEnabled && (
              <UiModal>
                <UiModalTrigger asChild>
                  <UiButton variant="primary-muted">
                    <UiSvgIcon name="lock-fill" />
                    Налаштувати
                  </UiButton>
                </UiModalTrigger>

                <UiModalContent>2</UiModalContent>
              </UiModal>
            )}
          </div>
        </ProfileSection>
      )}
    </>
  );
}
