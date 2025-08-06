import { ILocalStorageService } from './models/local-storage.service.model';
import { isEmpty } from '../../shared/utils/is-empty.util';
import { LocalStoragePrefix } from '../../shared/constants/local-storage.contants';
import { InjectToken } from '../../shared/classes/inject-token.class';
import { UserInformationService } from '../user-information/user-information.service';

export class LocalStorageService implements ILocalStorageService {
  getItem<T>(token: string): T | null {
    if (isEmpty(global.localStorage)) {
      return null;
    }

    const result = localStorage.getItem(LocalStoragePrefix + token);

    if (isEmpty(result)) {
      return null;
    }

    try {
      return JSON.parse(result) as T;
    } catch {
      return null;
    }
  }

  setItem<T>(token: string, value: T): void {
    if (isEmpty(global.localStorage)) {
      return null;
    }

    localStorage.setItem(LocalStoragePrefix + token, JSON.stringify(value));
  }

  removeItem(token: string): void {
    if (isEmpty(global.localStorage)) {
      return null;
    }

    localStorage.removeItem(LocalStoragePrefix + token);
  }

  hasItem(token: string): boolean {
    if (isEmpty(global.localStorage)) {
      return null;
    }

    return !isEmpty(localStorage.getItem(LocalStoragePrefix + token));
  }
}

export const localStorageServiceProvider = new InjectToken<ILocalStorageService>('UserInformationService');
