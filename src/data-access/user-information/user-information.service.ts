import { IUserInformationService } from './models/user-infomation.service.model';
import { UserInformation } from './models/user-infomation.model';
import { UserInformationKey } from '../local-storage/constants/local-storage.contants';
import { InjectToken } from '../../shared/classes/inject-token.class';
import { LocalStorageService } from '../local-storage/local-storage.service';

export class UserInformationService implements IUserInformationService {

  constructor(private readonly localStorageService: LocalStorageService) {
  }

  getUserInformation(): UserInformation | null {
    return this.localStorageService.getItem<UserInformation>(UserInformationKey);
  }

  setUserInformation(userInformation: UserInformation): void {
    return this.localStorageService.setItem(UserInformationKey, userInformation);
  }

  clearUserInformation(): void {
    return this.localStorageService.removeItem(UserInformationKey);
  }
}

export const userInformationServiceProvider = new InjectToken<IUserInformationService>('UserInformationService');