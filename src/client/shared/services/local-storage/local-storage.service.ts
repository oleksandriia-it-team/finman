import { isEmpty } from '@common/utils/is-empty.util';
import { LocalStoragePrefix } from '../../constants/local-storage.contants';
import { isServer } from '@frontend/shared/utils/is-server.util';

export class LocalStorageService {
  getItem<T>(token: string): T | null {
    if (isServer()) return null;

    const result = localStorage.getItem(LocalStoragePrefix + '-' + token);

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
    if (isServer()) return;

    localStorage.setItem(LocalStoragePrefix + '-' + token, JSON.stringify(value));
  }

  removeItem(token: string): void {
    if (isServer()) return;

    localStorage.removeItem(LocalStoragePrefix + '-' + token);
  }

  hasItem(token: string): boolean {
    if (isServer()) return false;

    return !isEmpty(localStorage.getItem(LocalStoragePrefix + '-' + token));
  }
}

export const localStorageService = new LocalStorageService();
