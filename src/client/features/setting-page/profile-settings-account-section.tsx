import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { ProfileSection } from './profile-section';

export function ProfileSettingsAccountSection() {
  return (
    <ProfileSection title="Обліковий запис">
      <FinControlledInput
        name="name"
        label="Ім'я користувача"
        placeholder="john.doe"
      />
    </ProfileSection>
  );
}
