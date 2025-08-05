import { UserInformationService } from './models/user-infomation.service.model';
import { UserInformation } from './models/user-infomation.model';
import { localStorageService } from '../local-storage/local-storage.service';
import { UserInformationKey } from '../../shared/constants/local-storage.contants';
import { InjectToken } from '../../shared/classes/inject-token.class';

export const userInformationService: UserInformationService = {
  getUserInformation(): Promise<UserInformation | null> {
    return new Promise<UserInformation | null>((resolve) => {
      resolve(localStorageService.getItem<UserInformation>(UserInformationKey));
    });
  },
  setUserInformation(userInformation: UserInformation): Promise<void> {
    return new Promise((resolve) => {
      localStorageService.setItem(UserInformationKey, userInformation);
      resolve();
    });
  }
};

export const userInformationServiceProvider = new InjectToken<UserInformationService>('UserInformationService');