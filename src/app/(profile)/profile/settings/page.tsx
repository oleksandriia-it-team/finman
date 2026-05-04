import { ProfileSettingsScreen } from '@frontend/features/setting-page/profile-settings-screen';
import { ProfileSettingsProvider } from '@frontend/features/setting-page/profile-settings.hook';

export default function SettingPage() {
  return (
    <ProfileSettingsProvider>
      <ProfileSettingsScreen />
    </ProfileSettingsProvider>
  );
}
