'use client';

import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { FormProvider } from 'react-hook-form';
import { useAuthorizedUser } from '@frontend/entities/profile/authorized-user.hook';
import { useProfileSettingsForm } from './profile-settings-form.hook';
import { ProfileSettingsActions } from './profile-settings-actions';
import { ProfileSettingsAppearanceSection } from './profile-settings-appearance-section';
import { ProfileSettingsAccountSection } from './profile-settings-account-section';
import { ProfileSettingsHeader } from './profile-settings-header';
import { ProfileSettingsSecuritySection } from './profile-settings-security-section';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { useRouter } from 'next/navigation';
import { ProfileSettings2faSection } from '@frontend/features/setting-page/profile-settings-2fa-section';

export function ProfileSettingsScreen() {
  const router = useRouter();
  const profileUser = useAuthorizedUser()!;
  const userInfoState = useUserInformation((state) => state.userInfoState);
  const theme = useUserInformation((state) => state.theme);
  const changeTheme = useUserInformation((state) => state.setTheme);
  const logOut = useUserInformation((state) => state.logOut);
  const handleLogout = () => {
    logOut();
    router.push('/login');
  };
  const { methods, submit, updateMutation, isDirty } = useProfileSettingsForm();

  const currentFormLocale = methods.watch('locale') ?? profileUser.locale;

  if (userInfoState === PromiseState.Loading) {
    return <FinLoader />;
  }

  if (userInfoState === PromiseState.Error || !profileUser) {
    return (
      <FinErrorWidget
        status={404}
        message="Дані користувача не знайдені"
      />
    );
  }

  return (
    <div className="relative h-full overflow-auto px-4 py-5 sm:px-8">
      {updateMutation.isPending && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-background/60 backdrop-blur-[2px]">
          <FinLoader />
        </div>
      )}

      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <ProfileSettingsHeader userInformation={profileUser} />

        <FormProvider {...methods}>
          <form
            className="space-y-6"
            aria-busy={updateMutation.isPending}
            onSubmit={submit}
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <ProfileSettingsAccountSection />
              <ProfileSettingsSecuritySection isOnline={profileUser.online} />
            </div>

            <ProfileSettingsAppearanceSection
              theme={theme}
              changeTheme={changeTheme}
              currentLocale={currentFormLocale}
            />

            <ProfileSettings2faSection />

            <ProfileSettingsActions
              isOnline={profileUser.online}
              isPending={updateMutation.isPending}
              isDirty={isDirty}
              onLogout={handleLogout}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
