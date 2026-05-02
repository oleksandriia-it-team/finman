import { FinControlledDropdown } from '@frontend/components/controlled-fields/fin-controlled-dropdown';
import { ThemeEnum } from '@frontend/shared/enums/theme.enum';
import { cn } from '@frontend/shared/utils/cn.util';
import { UiButton } from '@frontend/ui/ui-button/ui-button';
import { UiTitle } from '@frontend/ui/ui-text/ui-title';
import { SupportLanguagesLocale } from '@frontend/shared/constants/support-languages-locale.constant';
import { ProfileSection } from './profile-section';

interface ProfileSettingsAppearanceSectionProps {
  theme: ThemeEnum;
  changeTheme: (nextTheme: ThemeEnum) => void;
  localeOptions: { value: string; label: string }[];
}

export function ProfileSettingsAppearanceSection({
  theme,
  changeTheme,
  localeOptions,
}: ProfileSettingsAppearanceSectionProps) {
  return (
    <ProfileSection title="Зовнішній вигляд">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <UiTitle size="sm">Тема</UiTitle>

        <div className="grid grid-cols-2 gap-1 rounded-md bg-secondary p-1 sm:w-48">
          <UiButton
            type="button"
            size="sm"
            variant={theme === ThemeEnum.Light ? 'primary' : 'default'}
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
        <FinControlledDropdown
          name="locale"
          label="Формат дати та часу"
          placeholder="uk-UA"
          options={localeOptions}
        />

        <FinControlledDropdown
          name="language"
          label="Мова"
          placeholder="Українська"
          options={SupportLanguagesLocale}
        />
      </div>
    </ProfileSection>
  );
}
