import { describe, expect, it } from 'vitest';
import { getPaginatedItems } from '../get-paginated-items.util';
import { CountryAndLocale } from '../../../countries-and-locales/shared/models/countries-and-locales.model';
import { localeAndLanguagesFixture } from './fixtures/locale-and-languages.fixture';
import fs from 'fs';
import path from 'node:path';
import { PathToPublic } from '../../constants/path-to-public.constant';
import StreamArray from 'stream-json/streamers/StreamArray';

import './mocks/fs.mock';
import './mocks/stream-array.mock';

describe('getPaginatedItems', () => {
  it('should get items from 1 to 10', async () => {
    const result = await getPaginatedItems<CountryAndLocale>('TEST.json', 1, 10, []);

    expect(result).toMatchObject(localeAndLanguagesFixture.slice(0, 9));
    expect(fs.createReadStream).toHaveBeenCalledWith(path.join(PathToPublic, 'TEST.json'));
    expect(StreamArray.prototype.destroy).toHaveBeenCalled();
  });

  it('should get items from 1 to 10 with filters', async () => {
    const result = await getPaginatedItems<CountryAndLocale>('TEST.json', 1, 10, [ (value) => value.id >= 10 ]);

    expect(result).toMatchObject(localeAndLanguagesFixture.slice(9, 18));
    expect(fs.createReadStream).toHaveBeenCalledWith(path.join(PathToPublic, 'TEST.json'));
    expect(StreamArray.prototype.destroy).toHaveBeenCalled();
  });

  it('should handle pagination with offset correctly', async () => {
    const result = await getPaginatedItems<CountryAndLocale>('TEST.json', 5, 15, []);

    expect(result).toMatchObject(localeAndLanguagesFixture.slice(4, 14));
    expect(fs.createReadStream).toHaveBeenCalledWith(path.join(PathToPublic, 'TEST.json'));
    expect(StreamArray.prototype.destroy).toHaveBeenCalled();
  });

  it('should handle pagination with small range correctly', async () => {
    const result = await getPaginatedItems<CountryAndLocale>('TEST.json', 2, 3, []);

    expect(result).toMatchObject(localeAndLanguagesFixture.slice(1, 2));

    expect(result.length).toBe(1);
    expect(fs.createReadStream).toHaveBeenCalledWith(path.join(PathToPublic, 'TEST.json'));
    expect(StreamArray.prototype.destroy).toHaveBeenCalled();
  });

});