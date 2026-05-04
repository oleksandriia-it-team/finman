import { isEmpty } from '@common/utils/is-empty.util';
import { LocalStoragePrefix } from '../../constants/local-storage.contants';
import { isServer } from '@frontend/shared/utils/is-server.util';

export class LocalStorageService {
  private readonly subscribers = new Map<string, Set<(value: unknown | null) => void>>();
  private hasStorageListener = false;

  private getStorageKey(token: string): string {
    return `${LocalStoragePrefix}-${token}`;
  }

  private parseValue<T>(value: string | null): T | null {
    if (isEmpty(value)) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  private ensureStorageListener(): void {
    if (isServer() || this.hasStorageListener) {
      return;
    }

    window.addEventListener('storage', (event) => {
      if (!event.key || !event.key.startsWith(`${LocalStoragePrefix}-`)) {
        return;
      }

      const token = event.key.slice(`${LocalStoragePrefix}-`.length);
      this.notifySubscribers(token, event.newValue);
    });

    this.hasStorageListener = true;
  }

  private notifySubscribers(token: string, rawValue: string | null): void {
    const listeners = this.subscribers.get(token);

    if (!listeners) {
      return;
    }

    const parsedValue = this.parseValue(rawValue);

    listeners.forEach((listener) => {
      listener(parsedValue);
    });
  }

  getItem<T>(token: string): T | null {
    if (isServer()) return null;

    return this.parseValue<T>(localStorage.getItem(this.getStorageKey(token)));
  }

  setItem<T>(token: string, value: T): void {
    if (isServer()) return;

    const serializedValue = JSON.stringify(value);

    localStorage.setItem(this.getStorageKey(token), serializedValue);
    this.notifySubscribers(token, serializedValue);
  }

  removeItem(token: string): void {
    if (isServer()) return;

    localStorage.removeItem(this.getStorageKey(token));
    this.notifySubscribers(token, null);
  }

  hasItem(token: string): boolean {
    if (isServer()) return false;

    return !isEmpty(localStorage.getItem(this.getStorageKey(token)));
  }

  subscribe<T>(token: string, listener: (value: T | null) => void): () => void {
    if (isServer()) {
      return () => {};
    }

    this.ensureStorageListener();

    const listeners = this.subscribers.get(token) ?? new Set<(value: unknown | null) => void>();
    listeners.add(listener as (value: unknown | null) => void);
    this.subscribers.set(token, listeners);

    return () => {
      const currentListeners = this.subscribers.get(token);

      if (!currentListeners) {
        return;
      }

      currentListeners.delete(listener as (value: unknown | null) => void);

      if (currentListeners.size === 0) {
        this.subscribers.delete(token);
      }
    };
  }
}

export const localStorageService = new LocalStorageService();
