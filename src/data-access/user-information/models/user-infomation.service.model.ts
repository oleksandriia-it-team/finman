import { UserInformation } from './user-infomation.model';

export interface IUserInformationService {
  getUserInformation(): UserInformation | null;

  setUserInformation(userInformation: UserInformation): void;

  clearUserInformation(): void;
}