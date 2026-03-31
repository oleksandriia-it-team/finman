import {
  UserInformation,
  UserInformationStore,
} from '@frontend/shared/services/user-information/models/user-infomation.model';
import { UserInformationKey } from '../../constants/local-storage.contants';
import { localStorageService } from '../local-storage/local-storage.service';
import { create } from 'zustand/react';
import { userSchema } from '@frontend/shared/schemas/validation-schema';

const getUserInformation = () => {
  const user = localStorageService.getItem<UserInformation>(UserInformationKey);

  if (!user) {
    return null;
  }
  const result = userSchema.safeParse(user);
  return result.success ? result.data : null;
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
    localStorageService.setItem<UserInformation | null>(UserInformationKey, null);
    set({ userInformation: null });
  },
}));
