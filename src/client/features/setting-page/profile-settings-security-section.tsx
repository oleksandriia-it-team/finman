import { FinControlledPassword } from '@frontend/components/controlled-fields/fin-controlled-password';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { ProfileSection } from './profile-section';
import type { ProfileSettingsSecuritySectionProps } from '@frontend/features/setting-page/props/profile-settings-security-section.props';

export function ProfileSettingsSecuritySection({ isOnline }: ProfileSettingsSecuritySectionProps) {
  return (
    <ProfileSection
      className="gap-0"
      title="Безпека"
    >
      <UiDescription className="text-sm">Замінення паролю</UiDescription>
      <div className="mt-2 " />

      <FinControlledPassword
        name="currentPassword"
        label="Поточний пароль"
        placeholder="Введіть поточний пароль"
        disabled={!isOnline}
      />

      <FinControlledPassword
        name="newPassword"
        label="Новий пароль"
        placeholder="Введіть новий пароль"
        disabled={!isOnline}
      />

      <FinControlledPassword
        name="confirmPassword"
        label="Підтвердити пароль"
        placeholder="Підтвердіть пароль"
        disabled={!isOnline}
      />
    </ProfileSection>
  );
}
