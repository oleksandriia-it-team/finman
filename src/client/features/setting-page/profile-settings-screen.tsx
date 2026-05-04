'use client';

import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FormProvider } from 'react-hook-form';
import { useAuthorizedUser } from '@frontend/entities/profile/authorized-user.hook';
import { useProfileSettings } from './profile-settings.hook';
import { useProfileSettingsForm } from './profile-settings-form.hook';
import { ProfileSettingsActions } from './profile-settings-actions';
import { ProfileSettingsAppearanceSection } from './profile-settings-appearance-section';
import { ProfileSettingsAccountSection } from './profile-settings-account-section';
import { ProfileSettingsHeader } from './profile-settings-header';
import { ProfileSettingsSecuritySection } from './profile-settings-security-section';

export function ProfileSettingsScreen() {
  const profileUser = useAuthorizedUser();
  const { userInfoState, theme, changeTheme, handleLogout } = useProfileSettings();
  const { methods, submit, updateMutation } = useProfileSettingsForm();

  if (userInfoState === PromiseState.Loading) {
    return <FinLoader />;
  }

  if (userInfoState === PromiseState.Error) {
    return (
      <FinErrorWidget
        status={404}
        message="Дані користувача не знайдені"
      />
    );
  }

  if (!profileUser) {
    return <FinLoader />;
  }

  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <ProfileSettingsHeader userInformation={profileUser} />

        <FormProvider {...methods}>
          <form
            className="space-y-6"
            onSubmit={submit}
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <ProfileSettingsAccountSection />
              <ProfileSettingsSecuritySection isOnline={profileUser.online} />
            </div>

            <ProfileSettingsAppearanceSection
              theme={theme}
              changeTheme={changeTheme}
              currentLocale={profileUser.locale}
            />

            <ProfileSettingsActions
              isOnline={profileUser.online}
              isPending={updateMutation.isPending}
              onLogout={handleLogout}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
