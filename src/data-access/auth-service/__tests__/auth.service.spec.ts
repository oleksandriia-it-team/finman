import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { AuthService } from '../auth.service';
import { UserInformationKey } from '../../local-storage/constants/local-storage.contants';
import { UserInformation } from '../models/user-infomation.model';

describe('AuthService', () => {
  let localStorageService: LocalStorageService;
  let authService: AuthService;

  beforeEach(() => {
    localStorageService = new LocalStorageService();
    authService = new AuthService(localStorageService);
  });

  it('should get null when call getUser', () => {
    vi.spyOn(localStorageService, 'getItem').mockReturnValue(null);

    const result = authService.getUser();

    expect(result).toBe(null);
    expect(localStorageService.getItem).toHaveBeenCalledWith(UserInformationKey);
  });

  it('should add user information when call logIn', () => {
    vi.spyOn(localStorageService, 'setItem').mockReturnValue();

    const data: UserInformation = { userName: 'Dmytro', language: 'uk', preferableLocale: 'uk-UA' };

    authService.logIn(data);

    expect(localStorageService.setItem).toHaveBeenCalledWith(UserInformationKey, data);
  });

  it('should delete user information when call logOut', () => {
    vi.spyOn(localStorageService, 'removeItem').mockReturnValue();

    authService.logOut();

    expect(localStorageService.removeItem).toHaveBeenCalledWith(UserInformationKey);
  });
});