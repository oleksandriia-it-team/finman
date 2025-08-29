import { IUserInformationService } from './models/auth.service.model';
import { UserInformation } from './models/user-infomation.model';
import { UserInformationKey } from '../local-storage/constants/local-storage.contants';
import { InjectToken } from '../../shared/classes/inject-token.class';
import { LocalStorageService } from '../local-storage/local-storage.service';

export class UserInformationService implements IUserInformationService {

  constructor(private readonly localStorageService: LocalStorageService) {
  }

  getAllUserInformation(): UserInformation | null {
    return this.localStorageService.getItem<UserInformation>(UserInformationKey);
  }

  setUserInformation(userInformation: Partial<UserInformation>): void {
    const user = this.localStorageService.getItem<UserInformation>(UserInformationKey);
    if (user) {
      const updatedUser = { ...user, ...userInformation };
      this.localStorageService.setItem(UserInformationKey, updatedUser);
    }
  }

  logOut(): void {
    this.setUserInformation({ userName: null });
  }
}

export const userInformationServiceProvider = new InjectToken<IUserInformationService>('UserInformationService');