import { UserInformation } from './user-infomation.model';

export interface IUserInformationService {
  getAllUserInformation(): UserInformation | null;

  setUserInformation(userInformation: Partial<UserInformation>): void;

  logOut(): void;
}