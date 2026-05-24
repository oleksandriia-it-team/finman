import type { ThemeEnum } from '@frontend/shared/enums/theme.enum';

export interface ProfileSettingsAppearanceSectionProps {
  theme: ThemeEnum;
  changeTheme: (nextTheme: ThemeEnum) => void;
  currentLocale: string;
}
