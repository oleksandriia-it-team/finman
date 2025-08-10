import { UserInformation } from './user-infomation.model';

export interface IAuthService {
  getUser(): UserInformation | null;

  logIn(userInformation: UserInformation): void;

  logOut(): void;
}