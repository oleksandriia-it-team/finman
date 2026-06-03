import fs from 'node:fs';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';
import path from 'node:path';
import { PathToPublic } from '@common/path-to-public.constant';
import { formatKeyMustBeStringOrNumber, formatSearchValueTypeMismatch } from '@common/constants/error-texts.constant';

export async function getItem<T, K extends keyof T>(pathToJson: string, key: K, searchValue: T[K]): Promise<T | null> {
  if (typeof searchValue !== 'string' && typeof searchValue !== 'number') {
    throw new Error(formatKeyMustBeStringOrNumber(key as string));
  }

  const jsonStream = fs.createReadStream(path.join(PathToPublic, pathToJson)).pipe(parser()).pipe(streamArray());

  for await (const { value } of jsonStream) {
    if (!(key in value) || value[key] === undefined || value[key] === null) {
      continue;
    }

    if (typeof value[key] !== typeof searchValue) {
      throw new Error(formatSearchValueTypeMismatch(key as string));
    }

    if (
      (typeof searchValue === 'string' && value[key].includes(searchValue)) ||
      (typeof value[key] === 'number' && value[key] === searchValue)
    ) {
      return value;
    }
  }

  return null;
}
