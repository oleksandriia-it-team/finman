import { describe, expect, it } from 'vitest';
import { getTotalCountItems } from '../get-total-count-items.util';
import { CountryAndLocale } from '../../../../app/api/lookups/countries-and-locales/shared/models/countries-and-locales.model';
import { localeAndLanguagesFixture } from './fixtures/locale-and-languages.fixture';
import fs from 'fs';
import path from 'node:path';
import { PathToPublic } from '../../../../common/path-to-public.constant';
import StreamArray from 'stream-json/streamers/StreamArray';

import './mocks/fs.mock';
import './mocks/stream-array.mock';

describe('getTotalCountItems', () => {
  it('should return total count of all items when no filters applied', async () => {
    const result = await getTotalCountItems<CountryAndLocale>('TEST.json', []);

    expect(result).toBe(localeAndLanguagesFixture.length);
    expect(fs.createReadStream).toHaveBeenCalledWith(path.join(PathToPublic, 'TEST.json'));
    expect(StreamArray.prototype.destroy).toHaveBeenCalled();
  });

  it('should return count of items that match single filter', async () => {
    const filter = (value: CountryAndLocale) => value.id > 10;
    const expectedCount = localeAndLanguagesFixture.filter(filter).length;

    const result = await getTotalCountItems<CountryAndLocale>('TEST.json', [ filter ]);

    expect(result).toBe(expectedCount);
    expect(fs.createReadStream).toHaveBeenCalledWith(path.join(PathToPublic, 'TEST.json'));
    expect(StreamArray.prototype.destroy).toHaveBeenCalled();
  });

  it('should return count of items that match multiple filters', async () => {
    const filters = [
      (value: CountryAndLocale) => value.id > 5,
      (value: CountryAndLocale) => value.id < 15
    ];
    const expectedCount = localeAndLanguagesFixture.filter(item =>
      item.id > 5 && item.id < 15
    ).length;

    const result = await getTotalCountItems<CountryAndLocale>('TEST.json', filters);

    expect(result).toBe(expectedCount);
    expect(fs.createReadStream).toHaveBeenCalledWith(path.join(PathToPublic, 'TEST.json'));
    expect(StreamArray.prototype.destroy).toHaveBeenCalled();
  });

  it('should return 0 when all items are filtered out', async () => {
    const filters = [
      (value: CountryAndLocale) => value.id < 0
    ];

    const result = await getTotalCountItems<CountryAndLocale>('TEST.json', filters);

    expect(result).toBe(0);
    expect(fs.createReadStream).toHaveBeenCalledWith(path.join(PathToPublic, 'TEST.json'));
    expect(StreamArray.prototype.destroy).toHaveBeenCalled();
  });

  it('should handle complex filter conditions correctly', async () => {
    const complexFilter = (value: CountryAndLocale) => {
      return value.id > 5 && value.country?.includes('A');
    };

    const expectedCount = localeAndLanguagesFixture.filter(complexFilter).length;

    const result = await getTotalCountItems<CountryAndLocale>('TEST.json', [ complexFilter ]);

    expect(result).toBe(expectedCount);
    expect(fs.createReadStream).toHaveBeenCalledWith(path.join(PathToPublic, 'TEST.json'));
    expect(StreamArray.prototype.destroy).toHaveBeenCalled();
  });

  it('should use correct path to JSON file', async () => {
    const customPath = 'custom/path/to/data.json';
    await getTotalCountItems<CountryAndLocale>(customPath, []);

    expect(fs.createReadStream).toHaveBeenCalledWith(path.join(PathToPublic, customPath));
    expect(StreamArray.prototype.destroy).toHaveBeenCalled();
  });
});