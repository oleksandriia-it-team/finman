import { ProfileSettingsProvider } from '@frontend/features/setting-page/profile-settings.hook';
import { ProfileSettingsScreen } from '@frontend/features/setting-page/profile-settings-screen';

export default function SettingPage() {
  return (
    <ProfileSettingsProvider>
      <ProfileSettingsScreen />
    </ProfileSettingsProvider>
  );
}
