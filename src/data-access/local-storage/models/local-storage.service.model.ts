export interface LocalStorageService {
  getItem<T>(token: string): T | null;

  setItem<T>(token: string, value: T): void;

  hasItem(token: string): boolean;

  removeItem(token: string): void;
}