import { IUserInformationService } from './models/user-infomation.service.model';
import { UserInformation } from './models/user-infomation.model';
import { UserInformationKey } from '../../shared/constants/local-storage.contants';
import { InjectToken } from '../../shared/classes/inject-token.class';
import { ILocalStorageService } from '../local-storage/models/local-storage.service.model';

export class UserInformationService implements IUserInformationService {

  constructor(private readonly localStorageService: ILocalStorageService) {
  }

  getUserInformation(): Promise<UserInformation | null> {
    return new Promise<UserInformation | null>((resolve) => {
      resolve(this.localStorageService.getItem<UserInformation>(UserInformationKey));
    });
  }

  setUserInformation(userInformation: UserInformation): Promise<void> {
    return new Promise((resolve) => {
      this.localStorageService.setItem(UserInformationKey, userInformation);
      resolve();
    });
  }

  clearUserInformation(): Promise<void> {
    return new Promise((resolve) => {
      this.localStorageService.removeItem(UserInformationKey);
      resolve();
    });
  }
}

export const userInformationServiceProvider = new InjectToken<IUserInformationService>('UserInformationService');