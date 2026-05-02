import { FinControlledPassword } from '@frontend/components/controlled-fields/fin-controlled-password';
import { UiDescription } from '@frontend/ui/ui-text/ui-description';
import { ProfileSection } from './profile-section';

interface ProfileSettingsSecuritySectionProps {
  isOnline: boolean;
}

export function ProfileSettingsSecuritySection({ isOnline }: ProfileSettingsSecuritySectionProps) {
  return (
    <ProfileSection title="Безпека">
      <UiDescription size="sm">Змінити пароль</UiDescription>

      <FinControlledPassword
        name="currentPassword"
        label="Поточний пароль"
        placeholder="••••••••"
        disabled={!isOnline}
      />

      <FinControlledPassword
        name="newPassword"
        label="Новий пароль"
        placeholder="••••••••"
        disabled={!isOnline}
      />

      <FinControlledPassword
        name="confirmPassword"
        label="Підтвердити пароль"
        placeholder="••••••••"
        disabled={!isOnline}
      />

      <UiDescription size="xs">Мінімум 8 символів, літери та цифри</UiDescription>
    </ProfileSection>
  );
}
