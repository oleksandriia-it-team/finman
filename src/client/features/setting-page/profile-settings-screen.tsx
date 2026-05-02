'use client';

import { SupportLanguages } from '@common/enums/support-languages.enum';
import { ThemeEnum } from '@frontend/shared/enums/theme.enum';
import { FinControlledDropdown } from '@frontend/components/controlled-fields/fin-controlled-dropdown';
import { FinControlledInput } from '@frontend/components/controlled-fields/fin-controlled-input';
import { FinControlledPassword } from '@frontend/components/controlled-fields/fin-controlled-password';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiSvgIcon } from '@frontend/ui/ui-svg-icon/ui-svg-icon';
import { cn } from '@frontend/shared/utils/cn.util';
import { FormProvider } from 'react-hook-form';
import { useMemo } from 'react';
import { useProfileSettings } from './profile-settings.hook';
import { useProfileSettingsForm } from './profile-settings-form.hook';
import { ProfileSection } from './profile-section';

const languageOptions = [
  { value: SupportLanguages.Ukrainian, label: 'Українська' },
  { value: SupportLanguages.English, label: 'English' },
];

const baseLocaleOptions = [
  { value: 'uk-UA', label: 'uk-UA' },
  { value: 'en-US', label: 'en-US' },
];

export function ProfileSettingsScreen() {
  const { userInformation, theme, changeTheme, handleLogout } = useProfileSettings();
  const { methods, submit, updateMutation } = useProfileSettingsForm();

  const localeOptions = useMemo(() => {
    const currentLocale = userInformation?.locale;
    if (!currentLocale || baseLocaleOptions.some((option) => option.value === currentLocale)) {
      return baseLocaleOptions;
    }

    return [{ value: currentLocale, label: currentLocale }, ...baseLocaleOptions];
  }, [userInformation?.locale]);

  if (!userInformation) {
    return null;
  }

  const userEmail = userInformation.online ? userInformation.email : '';

  return (
    <div className="h-full overflow-auto bg-muted/40 px-4 py-5 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <header className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Профіль</h1>
            <p className="text-sm text-muted-foreground">Керуйте своїм обліковим записом та налаштуваннями</p>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-foreground">{userInformation.name}</p>
            {userEmail && <p className="text-xs text-muted-foreground">{userEmail}</p>}
          </div>
        </header>

        <FormProvider {...methods}>
          <form
            className="space-y-6"
            onSubmit={submit}
          >
            <div className="grid gap-5 lg:grid-cols-2">
              <ProfileSection title="Обліковий запис">
                <FinControlledInput
                  name="name"
                  label="Ім'я користувача"
                  placeholder="Олександр К."
                />

                <FinControlledDropdown
                  name="locale"
                  label="Локаль"
                  placeholder="uk-UA"
                  options={localeOptions}
                />

                <FinControlledDropdown
                  name="language"
                  label="Мова"
                  placeholder="Українська"
                  options={languageOptions}
                />
              </ProfileSection>

              <ProfileSection title="Безпека">
                <p className="text-sm text-muted-foreground">Змінити пароль</p>

                <FinControlledPassword
                  name="currentPassword"
                  label="Поточний пароль"
                  placeholder="••••••••"
                  disabled={!userInformation.online}
                />

                <FinControlledPassword
                  name="newPassword"
                  label="Новий пароль"
                  placeholder="••••••••"
                  disabled={!userInformation.online}
                />

                <FinControlledPassword
                  name="confirmPassword"
                  label="Підтвердити пароль"
                  placeholder="••••••••"
                  disabled={!userInformation.online}
                />

                <p className="text-xs text-muted-foreground">Мінімум 8 символів, літери та цифри</p>
              </ProfileSection>
            </div>

            <ProfileSection title="Зовнішній вигляд">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm font-medium text-foreground">Тема</span>
                <div className="grid grid-cols-2 rounded-md bg-muted p-1 sm:w-48">
                  <button
                    type="button"
                    className={cn(
                      'rounded px-4 py-2 text-sm font-semibold transition-colors',
                      theme === ThemeEnum.Light
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground',
                    )}
                    onClick={() => changeTheme(ThemeEnum.Light)}
                  >
                    Світла
                  </button>
                  <button
                    type="button"
                    className={cn(
                      'rounded px-4 py-2 text-sm font-semibold transition-colors',
                      theme === ThemeEnum.Dark
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground',
                    )}
                    onClick={() => changeTheme(ThemeEnum.Dark)}
                  >
                    Темна
                  </button>
                </div>
              </div>
            </ProfileSection>

            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              {userInformation.online && (
                <UiButton
                  type="button"
                  variant="destructive"
                  isOutlined
                  className="gap-2"
                  onClick={handleLogout}
                >
                  <UiSvgIcon name="box-arrow-right" />
                  Вийти
                </UiButton>
              )}

              <UiButton
                type="submit"
                variant="primary"
                disabled={updateMutation.isPending}
              >
                Зберегти зміни
              </UiButton>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
