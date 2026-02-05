import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LocalStorageService } from '../local-storage.service';
import { LocalStoragePrefix } from '../../../constants/local-storage.contants';

vi.stubGlobal('localStorage', {
  setItem: vi.fn(),
  getItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  key: vi.fn(),
  length: 0,
});

describe('LocalStorageService', () => {
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    vi.clearAllMocks();

    localStorageService = new LocalStorageService();
  });

  it('should call setItem with all arguments', () => {
    vi.spyOn(global.localStorage, 'setItem').mockReturnValue();

    localStorageService.setItem('key', 'content');

    expect(global.localStorage.setItem).toHaveBeenCalledWith(LocalStoragePrefix + '-key', '"content"');
  });

  it('should call getItem with all arguments', () => {
    vi.spyOn(global.localStorage, 'getItem').mockReturnValue('"content"');

    const result = localStorageService.getItem('key');

    expect(result).toBe('content');

    expect(global.localStorage.getItem).toHaveBeenCalledWith(LocalStoragePrefix + '-key');
  });

  it('should call getItem with all arguments and get error due to incorrect object', () => {
    vi.spyOn(global.localStorage, 'getItem').mockReturnValue('{name: "John"}');

    const result = localStorageService.getItem('key');

    expect(result).toBe(null);

    expect(global.localStorage.getItem).toHaveBeenCalledWith(LocalStoragePrefix + '-key');
  });

  it('should call removeItem with all arguments', () => {
    vi.spyOn(global.localStorage, 'removeItem').mockReturnValue();

    localStorageService.removeItem('key');

    expect(global.localStorage.removeItem).toHaveBeenCalledWith(LocalStoragePrefix + '-key');
  });

  it('should call hasItem with all arguments', () => {
    vi.spyOn(global.localStorage, 'getItem').mockReturnValue(null);

    const result = localStorageService.hasItem('key');

    expect(result).toBe(false);

    expect(global.localStorage.getItem).toHaveBeenCalledWith(LocalStoragePrefix + '-key');
  });
});
