import { describe, expect, it } from 'vitest';
import fs from 'fs';
import StreamArray from 'stream-json/streamers/StreamArray';
import { getItem } from '../get-item.util';
import path from 'node:path';
import { PathToPublic } from '../../constants/path-to-public.constant';
import { CountryAndLocale } from '../../../countries-and-locales/shared/models/countries-and-locales.model';

import './mocks/fs.mock';
import './mocks/stream-array.mock';

describe('getItem', () => {
  it('should find a locale and language with id = 5', async () => {
    const result = await getItem<CountryAndLocale, 'id'>('TEST.json', 'id', 5);

    expect(result?.id).toBe(5);


    expect(fs.createReadStream).toHaveBeenCalledWith(path.join(PathToPublic, 'TEST.json'));
    expect(StreamArray.prototype.destroy).toHaveBeenCalled();
  });

  it('shouldn\'t find a locale and language', async () => {
    const result = await getItem<CountryAndLocale, 'id'>('TEST.json', 'id', 99);

    expect(result).toBe(null);

    expect(fs.createReadStream).toHaveBeenCalledWith(path.join(PathToPublic, 'TEST.json'));
    expect(StreamArray.prototype.destroy).toHaveBeenCalled();
  });

  it('should throw an error due to difference between value type in json and given value type', async () => {
    try {
      await getItem<CountryAndLocale, 'id'>('TEST.json', 'id', '99' as never);
    } catch ( err ) {

      expect(fs.createReadStream).toHaveBeenCalledWith(path.join(PathToPublic, 'TEST.json'));
      expect(StreamArray.prototype.destroy).toHaveBeenCalled();
      expect((err as Error).message).toBe('Search value must be the same type like id field in json');
    }
  });

  it('should throw an error due to incorrect value type(not string and not number)', async () => {
    try {
      await getItem<CountryAndLocale, 'id'>('TEST.json', 'id', {} as never);

    } catch ( err ) {
      expect((err as Error).message).toBe('id must be string or number');
    }

  });
});