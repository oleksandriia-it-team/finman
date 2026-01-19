import { UserInformation } from './models/user-infomation.model';
import { UserInformationKey } from '../../shared/constants/local-storage.contants';
import { localStorageService, LocalStorageService } from '../../services/local-storage/local-storage.service';

export class UserInformationService {

  constructor(private readonly localStorageService: LocalStorageService) {
  }

  getAllUserInformation(): UserInformation | null {
    return this.localStorageService.getItem<UserInformation>(UserInformationKey);
  }

  setUserInformation(userInformation: Partial<UserInformation>): void {
    const user = this.localStorageService.getItem<UserInformation>(UserInformationKey);
    const updatedUser = { ...user, ...userInformation };
    this.localStorageService.setItem(UserInformationKey, updatedUser);
  }

  logOut(): void {
    this.setUserInformation({ userName: null });
  }
}

export const userInformationService = new UserInformationService(localStorageService);