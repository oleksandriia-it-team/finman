import { IAuthService } from './models/auth.service.model';
import { UserInformation } from './models/user-infomation.model';
import { UserInformationKey } from '../local-storage/constants/local-storage.contants';
import { InjectToken } from '../../shared/classes/inject-token.class';
import { LocalStorageService } from '../local-storage/local-storage.service';

export class AuthService implements IAuthService {

  constructor(private readonly localStorageService: LocalStorageService) {
  }

  getUser(): UserInformation | null {
    return this.localStorageService.getItem<UserInformation>(UserInformationKey);
  }

  logIn(userInformation: UserInformation): void {
    return this.localStorageService.setItem(UserInformationKey, userInformation);
  }

  logOut(): void {
    return this.localStorageService.removeItem(UserInformationKey);
  }
}

export const authServiceProvider = new InjectToken<IAuthService>('AuthService');