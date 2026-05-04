'use client';

import { FinErrorWidget } from '@frontend/components/error/fin-error-widget';
import { FinLoader } from '@frontend/components/loader/fin-loader';
import { useGetLocalesDropdown } from '@frontend/entities/lookups/hooks/get-locales-dropdown.hook';
import { useTheme } from '@frontend/shared/hooks/theme/theme.hook';
import { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';
import { useRouter } from 'next/navigation';
import { FormProvider } from 'react-hook-form';
import { useShallow } from 'zustand/react/shallow';
import { useProfileSettingsForm } from './profile-settings-form.hook';
import { ProfileSettingsActions } from './profile-settings-actions';
import { ProfileSettingsAppearanceSection } from './profile-settings-appearance-section';
import { ProfileSettingsAccountSection } from './profile-settings-account-section';
import { ProfileSettingsHeader } from './profile-settings-header';
import { ProfileSettingsSecuritySection } from './profile-settings-security-section';

export function ProfileSettingsScreen() {
  const router = useRouter();
  const { theme, changeTheme } = useTheme();
  const { userInformation, userInfoState, logOut } = useUserInformation(
    useShallow((state) => ({
      userInformation: state.userInformation,
      userInfoState: state.userInfoState,
      logOut: state.logOut,
    })),
  );
  const { methods, submit, updateMutation } = useProfileSettingsForm();
  const localeDataResource = useGetLocalesDropdown(methods.watch('locale'));

  if (userInfoState === PromiseState.Loading) {
    return <FinLoader />;
  }

  if (!userInformation) {
    return (
      <FinErrorWidget
        status={401}
        message="Дані користувача не знайдені"
      />
    );
  }

  const handleLogout = () => {
    logOut();
    router.push('/login');
  };

  return (
    <div className="h-full overflow-auto px-4 py-5 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <ProfileSettingsHeader userInformation={userInformation} />

        <FormProvider {...methods}>
          <form
            className="space-y-6"
            onSubmit={submit}
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <ProfileSettingsAccountSection />
              <ProfileSettingsSecuritySection isOnline={userInformation.online} />
            </div>

            <ProfileSettingsAppearanceSection
              theme={theme}
              changeTheme={changeTheme}
              localeOptions={localeDataResource.options}
              localeSearch={localeDataResource.search}
              onLocaleSearch={localeDataResource.setSearch}
              localeInputLabel={localeDataResource.inputLabel?.label ?? ''}
              localeState={localeDataResource.state}
              localeErrorLabel={localeDataResource.errorMessage ?? ''}
            />

            <ProfileSettingsActions
              isOnline={userInformation.online}
              isPending={updateMutation.isPending}
              onLogout={handleLogout}
            />
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
