import fs from 'fs';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';
import path from 'node:path';
import { PathToPublic } from '../constants/path-to-public.constant';

export async function getItem<T, K extends keyof T>(
  pathToJson: string,
  key: K,
  searchValue: T[K],
): Promise<T | null> {

  if(typeof searchValue !== 'string' &&  typeof searchValue !== 'number') {
    throw new Error(`${key as string} must be string or number`);
  }

  const jsonStream = fs.createReadStream(path.join(PathToPublic, pathToJson))
    .pipe(parser())
    .pipe(streamArray());

  try {
    for await (const { value } of jsonStream) {
      if (!(key in value) || value[key] === undefined || value[key] === null) {
        continue;
      }

      if (typeof value[key] !== typeof searchValue) {
        throw new Error(
          `Search value must be the same type like ${key as string} field in json`
        );
      }

      if (
        (typeof searchValue === 'string' && value[key].includes(searchValue)) ||
        (typeof value[key] === 'number' && value[key] === searchValue)
      ) {
        jsonStream.destroy();
        return value;
      }
    }

    jsonStream.destroy();
    return null;
  }
  catch ( err: unknown ) {
    jsonStream.destroy();
    throw err;
  }

}