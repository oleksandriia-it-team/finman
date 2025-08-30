import { isEmpty } from '../../shared/utils/is-empty.util';
import { LocalStoragePrefix } from './constants/local-storage.contants';
import { InjectToken } from '../../shared/classes/inject-token.class';

export class LocalStorageService {
  getItem<T>(token: string): T | null {
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
    localStorage.setItem(LocalStoragePrefix + '-' + token, JSON.stringify(value));
  }

  removeItem(token: string): void {
    localStorage.removeItem(LocalStoragePrefix + '-' + token);
  }

  hasItem(token: string): boolean {
    return !isEmpty(localStorage.getItem(LocalStoragePrefix + '-' + token));
  }
}

export const localStorageServiceProvider = new InjectToken<LocalStorageService>('LocalStorageService');
