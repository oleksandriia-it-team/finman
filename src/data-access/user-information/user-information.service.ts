import { UserInformation } from './models/user-infomation.model';
import { UserInformationKey } from '../local-storage/constants/local-storage.contants';
import { LocalStorageService } from '../local-storage/local-storage.service';

export class UserInformationService {
  constructor(private readonly localStorageService: LocalStorageService) {}

  getAllUserInformation(): UserInformation | null {
    return this.localStorageService.getItem<UserInformation>(UserInformationKey);
  }

  setUserInformation(userInformation: Partial<UserInformation>): void {
    const user = this.getAllUserInformation();
    const updatedUser = { ...user, ...userInformation };
    this.localStorageService.setItem(UserInformationKey, updatedUser);
  }

  setPassword(password: string): void {
    this.setUserInformation({ password });
  }

  getPassword(): string | undefined {
    return this.getAllUserInformation()?.password;
  }

  setInactivityMinutes(minutes: number | null): void {
    this.setUserInformation({ inactivityMinutes: minutes ?? undefined });
  }

  getInactivityMinutes(): number | null {
    return this.getAllUserInformation()?.inactivityMinutes ?? null;
  }

  setLastActivity(time: number): void {
    this.setUserInformation({ lastActivityTime: time });
  }

  getLastActivity(): number | null {
    return this.getAllUserInformation()?.lastActivityTime ?? null;
  }

  logOut(): void {
    this.setUserInformation({ password: undefined, lastActivityTime: undefined });
  }
}
