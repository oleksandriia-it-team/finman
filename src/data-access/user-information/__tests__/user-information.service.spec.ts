import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LocalStorageService } from '../../local-storage/local-storage.service';
import { UserInformationKey } from '../../local-storage/constants/local-storage.contants';
import { UserInformation } from '../models/user-infomation.model';
import { UserInformationService } from '../user-information.service';

describe('UserInformationService', () => {
  let localStorageService: LocalStorageService;
  let userInformationService: UserInformationService;

  beforeEach(() => {
    localStorageService = new LocalStorageService();
    userInformationService = new UserInformationService(localStorageService);
  });

  it('should get null when call getAllUserInformation', () => {
    vi.spyOn(localStorageService, 'getItem').mockReturnValue(null);

    const result = userInformationService.getAllUserInformation();

    expect(result).toBe(null);
    expect(localStorageService.getItem).toHaveBeenCalledWith(UserInformationKey);
  });

  it('should add user information when call logIn', () => {
    vi.spyOn(localStorageService, 'setItem').mockReturnValue();
    vi.spyOn(localStorageService, 'getItem').mockReturnValue(null);

    const data: UserInformation = { userName: 'Dmytro', language: 'uk', preferableLocale: 'uk-UA' };

    userInformationService.setUserInformation(data);

    expect(localStorageService.setItem).toHaveBeenCalledWith(UserInformationKey, data);
    expect(localStorageService.getItem).toHaveBeenCalledWith(UserInformationKey);
  });

  it('should delete user information when call logOut', () => {
    vi.spyOn(localStorageService, 'getItem').mockReturnValue({
      userName: 'Dmytro',
      preferableLocale: 'en-GB',
      language: 'uk'
    } satisfies UserInformation);
    vi.spyOn(localStorageService, 'setItem').mockReturnValue();
    vi.spyOn(userInformationService, 'setUserInformation');

    userInformationService.logOut();


    expect(localStorageService.setItem).toHaveBeenCalledWith(UserInformationKey, {
      userName: null,
      preferableLocale: 'en-GB',
      language: 'uk'
    } satisfies Partial<UserInformation>);
    expect(localStorageService.getItem).toHaveBeenCalledWith(UserInformationKey);
    expect(userInformationService.setUserInformation).toHaveBeenCalledWith({ userName: null });
  });
});