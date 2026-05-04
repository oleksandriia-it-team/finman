import { isEmpty } from '@common/utils/is-empty.util';
import { LocalStoragePrefix } from '../../constants/local-storage.contants';
import { isServer } from '@frontend/shared/utils/is-server.util';

type Listener<T> = (value: T | null) => void;

export class LocalStorageService {
  private readonly listeners = new Map<string, Set<Listener<unknown>>>();

  private prefixedKey(token: string): string {
    return `${LocalStoragePrefix}-${token}`;
  }

  getItem<T>(token: string): T | null {
    if (isServer()) return null;

    const result = localStorage.getItem(this.prefixedKey(token));

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

    localStorage.setItem(this.prefixedKey(token), JSON.stringify(value));
    this.notify(token, value as T | null);
  }

  removeItem(token: string): void {
    if (isServer()) return;

    localStorage.removeItem(this.prefixedKey(token));
    this.notify(token, null);
  }

  hasItem(token: string): boolean {
    if (isServer()) return false;

    return !isEmpty(localStorage.getItem(this.prefixedKey(token)));
  }

  private notify<T>(token: string, value: T | null): void {
    const key = this.prefixedKey(token);
    const set = this.listeners.get(key);

    if (!set) return;

    set.forEach((listener) => listener(value));
  }

  /**
   * Subscribe to changes for a given key (same-tab AND cross-tab).
   * Returns an unsubscribe function — pass it directly to useEffect's cleanup.
   *
   * Usage in a component:
   *   useEffect(() => localStorageService.subscribe(ThemeKey, setMode), []);
   */
  subscribe<T>(token: string, listener: Listener<T>): () => void {
    if (isServer()) {
      return () => {}; // no-op unsubscribe function
    }

    const key = this.prefixedKey(token);

    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set());
    }

    const set = this.listeners.get(key)!;
    set.add(listener as Listener<unknown>);
    const handleStorageEvent = (e: StorageEvent) => {
      if (e.key !== key) return;

      try {
        const parsed = e.newValue ? (JSON.parse(e.newValue) as T) : null;
        listener(parsed);
      } catch {
        listener(null);
      }
    };

    window.addEventListener('storage', handleStorageEvent);

    return () => {
      set.delete(listener as Listener<unknown>);
      window.removeEventListener('storage', handleStorageEvent);
      if (set.size === 0) {
        this.listeners.delete(key);
      }
    };
  }
}

export const localStorageService = new LocalStorageService();
