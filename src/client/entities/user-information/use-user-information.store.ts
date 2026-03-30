import { UserInformation, UserInformationStore } from './models/user-infomation.model';
import { UserInformationKey } from '../../shared/constants/local-storage.contants';
import { localStorageService } from '../../shared/services/local-storage/local-storage.service';
import { create } from 'zustand/react';
import { userSchema } from './validation-schema';

const getUserInformation = () => {
  const user = localStorageService.getItem<UserInformation>(UserInformationKey);

  if (!user) {
    return null;
  }

  return userSchema.safeParse(user).success ? user : null;
};

export const useUserInformation = create<UserInformationStore>((set) => ({
  userInformation: getUserInformation(),
  setUserInformation: (userInformation: Partial<UserInformation>) => {
    const user = localStorageService.getItem<UserInformation>(UserInformationKey);
    const updatedUser = { ...user, ...userInformation };
    localStorageService.setItem(UserInformationKey, updatedUser);
    set({ userInformation: getUserInformation() });
  },
  logOut: () => {
    const user = localStorageService.getItem<UserInformation>(UserInformationKey);

    const updatedUser = { ...user, userName: undefined };

    localStorageService.setItem(UserInformationKey, updatedUser);
    set({ userInformation: getUserInformation() });
  },
}));
