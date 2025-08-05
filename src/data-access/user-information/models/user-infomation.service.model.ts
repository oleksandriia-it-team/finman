import { UserInformation } from './user-infomation.model';

export interface UserInformationService {
  getUserInformation(): Promise<UserInformation | null>;

  setUserInformation(userInformation: UserInformation): Promise<void>;
}