import { describe, expect, it, vi } from 'vitest';
import { localStorageService } from '@frontend/shared/services/local-storage/local-storage.service';
import { UserInformationKey } from '@frontend/shared/constants/local-storage.contants';
import { UserInformation } from '@frontend/shared/services/user-information/models/user-infomation.model';
import { ThemeEnum } from '@frontend/shared/enums/theme.enum';

import { useUserInformation } from '@frontend/shared/services/user-information/use-user-information.store';

describe('useUserInformation', () => {
  it('should add user information when call logIn', () => {
    vi.spyOn(localStorageService, 'setItem').mockReturnValue();
    vi.spyOn(localStorageService, 'getItem').mockReturnValue(null);

    const data: UserInformation = {
      userName: 'Dmytro',
      language: 'uk',
      preferableLocale: 'uk-UA',
      mode: ThemeEnum.Light,
    };

    useUserInformation.getState().setUserInformation(data);

    expect(localStorageService.setItem).toHaveBeenCalledWith(UserInformationKey, data);
    expect(localStorageService.getItem).toHaveBeenCalledWith(UserInformationKey);
  });

  it('should delete user information when call logOut', () => {
    vi.spyOn(localStorageService, 'getItem').mockReturnValue({
      userName: 'Dmytro',
      preferableLocale: 'en-GB',
      language: 'uk',
      mode: ThemeEnum.Light,
    } satisfies UserInformation);
    vi.spyOn(localStorageService, 'setItem').mockReturnValue();
    vi.spyOn(useUserInformation.getState(), 'setUserInformation');

    useUserInformation.getState().logOut();

    expect(localStorageService.setItem).toHaveBeenCalledWith(UserInformationKey, null);
    expect(useUserInformation.getState().userInformation).toEqual(null);
  });
});
