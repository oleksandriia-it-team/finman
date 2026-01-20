import { ThemeEnum } from '../../../shared/enums/theme.enum';

export interface UserInformation {
  userName?: string | undefined;
  language?: string | undefined;
  preferableLocale?: string | undefined;
  mode?: ThemeEnum | undefined;
}

export interface UserInformationStore {
  userInformation: UserInformation | null;
  setUserInformation: (userInformation: UserInformation) => void;
  logOut: () => void;
}
