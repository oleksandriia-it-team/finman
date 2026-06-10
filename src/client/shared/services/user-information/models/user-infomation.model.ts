import type { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import type { GetUser } from '@common/records/user.record';
import type { ThemeEnum } from '@frontend/shared/enums/theme.enum';
import type { SupportLanguages } from '@common/enums/support-languages.enum';

export interface UserInformationStore {
  userInformation: GetUser | null;
  setUserInformation: (userInformation: GetUser) => void;
  logOut: () => void;
  userInfoState: PromiseState;
  updateInformationState: PromiseState;
  refresh: () => Promise<void>;
  theme: ThemeEnum;
  setTheme: (theme: ThemeEnum) => void;
  language: SupportLanguages;
  setLanguage: (language: SupportLanguages) => void;
}
