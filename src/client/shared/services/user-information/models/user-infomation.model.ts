import type { PromiseState } from '@frontend/shared/enums/promise-state.enum';
import type { GetUser } from '@common/records/user.record';

export interface UserInformationStore {
  userInformation: GetUser | null;
  setUserInformation: (userInformation: GetUser) => void;
  logOut: () => void;
  userInfoState: PromiseState;
  updateInformationState: PromiseState;
  refresh: () => void;
}
