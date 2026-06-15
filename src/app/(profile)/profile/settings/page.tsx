'use client';
import { ProfileSettingsScreen } from '@frontend/features/user-settings/profile-settings-screen';
import { useHidePlusButton } from '@frontend/widgets/profile-mobile-navbar/use-hide-plus-button';

export default function SettingsPage() {
  useHidePlusButton();
  return <ProfileSettingsScreen />;
}
