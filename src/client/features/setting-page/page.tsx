'use client';

import { ProfileSettingsProvider } from './profile-settings.hook';
import { ProfileSettingsScreen } from './profile-settings-screen';

export default function SettingPage() {
  return (
    <ProfileSettingsProvider>
      <ProfileSettingsScreen />
    </ProfileSettingsProvider>
  );
}
