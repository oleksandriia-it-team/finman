import { ThemeEnum } from '@frontend/shared/enums/theme.enum';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import { SupportLanguagesLocale } from '@frontend/shared/constants/support-languages-locale.constant';
import { useGetLocalesDropdown } from '@frontend/entities/lookups/hooks/get-locales-dropdown.hook';
import { FinControlledAutocomplete } from '@frontend/components/controlled-fields/fin-controlled-autocomplete';
import { FinControlledDropdown } from '@frontend/components/controlled-fields/fin-controlled-dropdown';
import { ProfileSection } from './profile-section';
import type { ProfileSettingsAppearanceSectionProps } from '@frontend/features/user-settings/props/profile-settings-appearance-section.props';

export function ProfileSettingsAppearanceSection({
  theme,
  changeTheme,
  currentLocale,
}: ProfileSettingsAppearanceSectionProps) {
  const localeDataResource = useGetLocalesDropdown(currentLocale);

  return (
    <ProfileSection title="Зовнішній вигляд">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <UiTitle size="sm">Тема</UiTitle>

        <div className="grid grid-cols-2 gap-1 rounded-md bg-secondary p-1 sm:w-48">
          <UiButton
            type="button"
            size="sm"
            variant={theme === ThemeEnum.Light ? 'primary' : 'default'}
            aria-pressed={theme === ThemeEnum.Light}
            className={cn(
              'shadow-none',
              theme !== ThemeEnum.Light && 'bg-transparent text-foreground hover:!bg-background/80',
            )}
            onClick={() => changeTheme(ThemeEnum.Light)}
          >
            Світла
          </UiButton>

          <UiButton
            type="button"
            size="sm"
            variant={theme === ThemeEnum.Dark ? 'primary' : 'default'}
            aria-pressed={theme === ThemeEnum.Dark}
            className={cn(
              'shadow-none',
              theme !== ThemeEnum.Dark && 'bg-transparent text-foreground hover:!bg-background/80',
            )}
            onClick={() => changeTheme(ThemeEnum.Dark)}
          >
            Темна
          </UiButton>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <FinControlledAutocomplete
          id="profile-locale"
          name="locale"
          label="Формат дати та часу"
          placeholder="Пошук..."
          options={localeDataResource.options}
          errorLabel={localeDataResource.errorMessage ?? ''}
          state={localeDataResource.state}
          customInputValue={localeDataResource.inputLabel?.label ?? currentLocale}
          search={localeDataResource.search}
          onSearch={localeDataResource.setSearch}
          clearable={false}
        />

        <FinControlledDropdown
          id="profile-language"
          name="language"
          label="Мова"
          placeholder="Українська"
          options={SupportLanguagesLocale}
          clearable={false}
        />
      </div>
    </ProfileSection>
  );
}
