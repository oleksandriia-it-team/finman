import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { ProfileSection } from './profile-section';
import { LatinUsernamePattern } from '@common/constants/latin-pattern.constant';

export function ProfileSettingsAccountSection() {
  return (
    <ProfileSection title="Обліковий запис">
      <FinControlledInput
        name="name"
        label="Ім'я користувача"
        placeholder="john.doe"
        pattern={LatinUsernamePattern}
      />
    </ProfileSection>
  );
}
