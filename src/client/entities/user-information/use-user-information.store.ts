import { UserInformation, UserInformationStore } from './models/user-infomation.model';
import { UserInformationKey } from '../../shared/constants/local-storage.contants';
import { localStorageService } from '../../services/local-storage/local-storage.service';
import { create } from 'zustand/react';


export const useUserInformation = create<UserInformationStore>((set) => ({
  userInformation: localStorageService.getItem<UserInformation>(UserInformationKey),
  setUserInformation: (userInformation: Partial<UserInformation>) => {
    const user = localStorageService.getItem<UserInformation>(UserInformationKey);
    const updatedUser = { ...user, ...userInformation };
    localStorageService.setItem(UserInformationKey, updatedUser);
    set({ userInformation: updatedUser })
  },
  logOut: () => {
    const user = localStorageService.getItem<UserInformation>(UserInformationKey);

    const updatedUser = { ...user, userName: undefined };

    localStorageService.setItem(UserInformationKey, updatedUser);
    set({ userInformation: updatedUser });
  }
}));