import fs from 'fs';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';
import path from 'node:path';
import { PathToPublic } from '../constants/path-to-public.constant';

export async function getItem<T>(
  pathToJson: string,
  key: string,
  searchValue: unknown,
): Promise<T | null> {

  if(typeof searchValue !== 'string' &&  typeof searchValue !== 'number') {
    throw new Error(`${key} must be string or number`);
  }

  const jsonStream = fs.createReadStream(path.join(PathToPublic, pathToJson))
    .pipe(parser())
    .pipe(streamArray());

  for await (const { value } of jsonStream) {

    if(!(key in value) || value[key] === undefined || value[key] === null) {
      continue;
    }

    if(typeof value[key] !== typeof searchValue) {
      throw new Error(`Search value must be the same type like ${key} field in json which is located in ${path}`);
    }

    if(typeof searchValue === 'string' && value[key].includes(searchValue) || typeof value[key] === 'number' && value[key] === searchValue) {
      jsonStream.destroy();

      return value;
    }

  }

  return null;
}