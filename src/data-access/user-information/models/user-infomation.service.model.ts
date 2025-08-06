import { UserInformation } from './user-infomation.model';

export interface IUserInformationService {
  getUserInformation(): Promise<UserInformation | null>;

  setUserInformation(userInformation: UserInformation): Promise<void>;

  clearUserInformation(): Promise<void>;
}